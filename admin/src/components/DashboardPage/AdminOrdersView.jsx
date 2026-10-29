import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Wallet,
  Filter,
  PackageCheck,
  Search,
  ShoppingCart,
  XCircle,
} from "lucide-react";

import "./dashboard.css";
import { formatMoney, getVisibleOrders } from "./dashboardUtils";
import CancelConfirm from "./components/CancelConfirm";
import OrderDetailsModal from "./components/OrderDetailsModal";
import OrdersTable from "./components/OrdersTable";
import StatGrid from "./components/StatGrid";
import Toast from "./components/Toast";
import {
  getAllOrders,
  getDashboard,
  getSingleOrder,
  updateOrderStatus as updateOrderStatusApi,
} from "../../api/adminApi";
import { adminOrdersViewStyles as s } from "../../assets/dummyStyles";

const statusOptions = [
  "All",
  "Processing",
  "On the way",
  "Delivered",
  "Cancelled",
];

const ordersPerPage = 10;

const getApiErrorMessage = (error, fallback) =>
  error.response?.data?.message || error.message || fallback;

const loadViewData = async ({ showSummary, search, filterStatus, page }) => {
  if (showSummary) {
    const { data } = await getDashboard();
    if (!data?.success || !data.dashboard) {
      throw new Error(data?.message || "Dashboard data is unavailable.");
    }

    return {
      dashboard: data.dashboard,
      orders: (data.dashboard.latestOrders || []).map((order) => ({
        ...order,
        orderStatus:
          order.orderStatus === "On the Way" ? "On the way" : order.orderStatus,
      })),
      totalPages: 1,
    };
  }

  const { data } = await getAllOrders({
    search,
    status: filterStatus,
    page,
    limit: ordersPerPage,
  });
  if (!data?.success || !Array.isArray(data.orders)) {
    throw new Error(data?.message || "Orders could not be loaded.");
  }

  return {
    dashboard: null,
    orders: data.orders,
    totalPages: Math.max(data.totalPages || 1, 1),
  };
};

const getPaymentStatusForOrderStatus = (order, orderStatus) => {
  if (order.paymentMethod === "COD") {
    return orderStatus === "Delivered" ? "Paid" : "Pending";
  }
  return "Paid";
};

function AdminOrdersView({
  limit,
  showAllButton = false,
  title = "Admin Dashboard",
  subtitle = "Track orders, revenue, customer details, and delivery progress in one clean workspace.",
  eyebrow = "Store Control",
  showSummary = true,
}) {
  const [orders, setOrders] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadError, setLoadError] = useState("");
  const [toast, setToast] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancelConfirmOrder, setCancelConfirmOrder] = useState(null);
  const [cancellingOrderId, setCancellingOrderId] = useState(null);

  const loadData = useCallback(
    () =>
      loadViewData({
        showSummary,
        search: debouncedSearch,
        filterStatus,
        page,
      }),
    [debouncedSearch, filterStatus, page, showSummary],
  );

  useEffect(() => {
    let isCurrent = true;

    loadData()
      .then((result) => {
        if (!isCurrent) return;
        setDashboard(result.dashboard);
        setOrders(result.orders);
        setTotalPages(result.totalPages);
        setLoadError("");
      })
      .catch((error) => {
        if (isCurrent) {
          setLoadError(getApiErrorMessage(error, "Failed to load dashboard."));
        }
      })
      .finally(() => {
        if (isCurrent) setLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [loadData]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleViewOrder = async (order) => {
    try {
      const { data } = await getSingleOrder(order.orderId);
      if (!data?.success || !data.order) {
        throw new Error(data?.message || "Order details are unavailable.");
      }
      setSelectedOrder(data.order);
    } catch (error) {
      setToast({
        type: "warning",
        message: getApiErrorMessage(error, "Failed to load order details."),
      });
    }
  };

  const refreshData = async () => {
    try {
      const result = await loadData();
      setDashboard(result.dashboard);
      setOrders(result.orders);
      setTotalPages(result.totalPages);
      setLoadError("");
      return true;
    } catch (error) {
      setLoadError(getApiErrorMessage(error, "Failed to refresh dashboard."));
      return false;
    }
  };

  const retryData = async () => {
    setLoading(true);
    await refreshData();
    setLoading(false);
  };

  const requestOrderStatusChange = async (orderId, status) => {
    if (status === "Cancelled") {
      const order =
        orders.find((item) => item.orderId === orderId) ||
        (selectedOrder?.orderId === orderId ? selectedOrder : null);
      if (order) {
        setCancelConfirmOrder(order);
        return;
      }
    }

    try {
      const { data } = await updateOrderStatusApi(orderId, status);
      if (!data?.success) {
        throw new Error(data?.message || "Order status update failed.");
      }

      setOrders((prev) =>
        prev.map((order) =>
          order.orderId === orderId
            ? {
                ...order,
                orderStatus: status,
                paymentStatus: getPaymentStatusForOrderStatus(order, status),
              }
            : order,
        ),
      );
      setSelectedOrder((prev) =>
        prev?.orderId === orderId
          ? {
              ...prev,
              orderStatus: status,
              paymentStatus: getPaymentStatusForOrderStatus(prev, status),
            }
          : prev,
      );
      await refreshData();
      setToast({
        type: status === "Cancelled" ? "warning" : "success",
        message: `Order ${status.toLowerCase()} successfully.`,
      });
    } catch (err) {
      setToast({
        type: "warning",
        message: getApiErrorMessage(err, "Failed to update order status."),
      });
    }
  };

  const visibleOrders = useMemo(() => {
    return getVisibleOrders({
      orders,
      search: showSummary ? search : "",
      status: showSummary ? filterStatus : "All",
      limit,
    });
  }, [orders, search, filterStatus, limit, showSummary]);

  const statCards = [
    {
      title: "Total Revenue",
      value: formatMoney(dashboard?.totalRevenue || 0),
      sub: "Successful Payments",
      icon: Wallet,
    },
    {
      title: "Active Orders",
      value: dashboard?.totalActive || 0,
      sub: "In Progress",
      icon: ShoppingCart,
    },
    {
      title: "Cancelled",
      value: dashboard?.totalCancelled || 0,
      sub: "Needs Attention",
      icon: XCircle,
    },
    {
      title: "Delivered",
      value: dashboard?.totalDelivered || 0,
      sub: "Completed Orders",
      icon: PackageCheck,
    },
  ];

  const confirmCancel = async () => {
    if (!cancelConfirmOrder) return;

    try {
      setCancellingOrderId(cancelConfirmOrder.orderId);
      const { data } = await updateOrderStatusApi(
        cancelConfirmOrder.orderId,
        "Cancelled",
      );
      if (!data?.success) {
        throw new Error(data?.message || "Order cancellation failed.");
      }

      setOrders((prev) =>
        prev.map((order) =>
          order.orderId === cancelConfirmOrder.orderId
            ? {
                ...order,
                orderStatus: "Cancelled",
                paymentStatus: getPaymentStatusForOrderStatus(
                  order,
                  "Cancelled",
                ),
              }
            : order,
        ),
      );
      setSelectedOrder((prev) =>
        prev?.orderId === cancelConfirmOrder.orderId
          ? {
              ...prev,
              orderStatus: "Cancelled",
              paymentStatus: getPaymentStatusForOrderStatus(prev, "Cancelled"),
            }
          : prev,
      );
      await refreshData();
      setCancelConfirmOrder(null);
      setToast({
        type: "warning",
        message: "Order cancelled successfully.",
      });
    } catch (err) {
      setToast({
        type: "warning",
        message: getApiErrorMessage(err, "Failed to cancel order."),
      });
    } finally {
      setCancellingOrderId(null);
    }
  };

  if (loading) {
    return (
      <div className={s.loadingState}>
        Loading {showSummary ? "Dashboard" : "Orders"}...
      </div>
    );
  }

  if (loadError && !orders.length && !dashboard) {
    return (
      <div className={`${s.loadingState} flex-col gap-4 px-4 text-center`}>
        <p role="alert">{loadError}</p>
        <button
          type="button"
          onClick={retryData}
          className="rounded-xl bg-emerald-400 px-5 py-2 font-bold text-emerald-950 transition hover:bg-emerald-300"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <main className={s.main}>
      <section className={s.section}>
        {showSummary && (
          <div className={s.summaryCard}>
            <div className={s.summaryHeader}>
              <div>
                <p className={s.eyebrow}>{eyebrow}</p>
                <h1 className={s.title}>{title}</h1>
                <p className={s.subtitle}>{subtitle}</p>
              </div>
            </div>
            <div className={s.statsWrapper}>
              <StatGrid cards={statCards} />
            </div>
          </div>
        )}

        <div
          className={`${s.ordersCard} ${showSummary ? s.ordersCardWithSummary : ""}`}
        >
          <div className={s.ordersHeader}>
            <div>
              <h2 className={s.ordersTitle}>
                {limit ? `Latest ${limit} Orders` : "All Orders"}
              </h2>
              <p className={s.ordersSubtext}>
                Search, filter, inspect items, and update order status.
              </p>
            </div>

            <div className={s.ordersFilters}>
              <label className={s.searchLabel}>
                <Search className={s.searchIcon} />
                <input
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    if (!showSummary) setPage(1);
                  }}
                  placeholder="Search customer, mobile, or order id"
                  className={s.searchInput}
                />
              </label>
              <label className={s.filterLabel}>
                <Filter className={s.filterIcon} />
                <select
                  value={filterStatus}
                  onChange={(event) => {
                    setFilterStatus(event.target.value);
                    if (!showSummary) setPage(1);
                  }}
                  className={s.filterSelect}
                >
                  {statusOptions.map((status) => (
                    <option
                      key={status}
                      value={status}
                      className={s.filterOption}
                    >
                      {status}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <OrdersTable
            orders={showSummary ? visibleOrders : orders}
            onSelectOrder={handleViewOrder}
            onStatusChange={requestOrderStatusChange}
          />

          {!showSummary && (
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <button
                type="button"
                onClick={() => setPage((currentPage) => currentPage - 1)}
                disabled={page <= 1}
                className="rounded-xl border border-emerald-400/30 px-4 py-2 text-sm font-bold text-emerald-100 transition hover:bg-emerald-400 hover:text-emerald-950 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-sm text-emerald-100/70">
                Page {page} of {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage((currentPage) => currentPage + 1)}
                disabled={page >= totalPages}
                className="rounded-xl border border-emerald-400/30 px-4 py-2 text-sm font-bold text-emerald-100 transition hover:bg-emerald-400 hover:text-emerald-950 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}

          {loadError && (
            <div className="flex items-center justify-between gap-4 px-5 pb-4">
              <p role="alert" className="text-sm text-red-300">
                {loadError}
              </p>
              <button
                type="button"
                onClick={retryData}
                className="rounded-lg border border-red-300/30 px-3 py-1.5 text-sm font-bold text-red-200 transition hover:bg-red-300/10"
              >
                Retry
              </button>
            </div>
          )}

          {showAllButton && (
            <div className={s.showAllWrapper}>
              <Link to="/orders" className={s.showAllLink}>
                Show All Orders
              </Link>
            </div>
          )}
        </div>
      </section>

      <Toast toast={toast} />
      <CancelConfirm
        order={cancelConfirmOrder}
        onClose={() => setCancelConfirmOrder(null)}
        onConfirm={confirmCancel}
        isLoading={cancellingOrderId === cancelConfirmOrder?.orderId}
      />
      <OrderDetailsModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onCancelOrder={setCancelConfirmOrder}
        onStatusChange={requestOrderStatusChange}
      />
    </main>
  );
}

export default AdminOrdersView;
