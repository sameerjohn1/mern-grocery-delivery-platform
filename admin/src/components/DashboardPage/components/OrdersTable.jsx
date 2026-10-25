import { AlertTriangle, Eye, Phone } from "lucide-react";
import { formatMoney } from "../dashboardUtils";
import StatusDropdown from "./StatusDropdown";
import { formatShortOrderId } from "../../../utils/orderIds";
import { ordersTableStyles as s } from "../../../assets/dummyStyles";

const OrdersTable = ({ order = [], onSelectOrder, onStatusChange }) => (
  <div className={s.container}>
    <table className={s.table}>
      <thead>
        <tr className={s.headerRow}>
          <th className={`${s.headerCell} text-left `}>Customer</th>
          <th className={`${s.headerCell} text-left `}>Order Id</th>
          <th className={`${s.headerCell} text-left `}>Amount</th>
          <th className={`${s.headerCell} text-left `}>Payment</th>
          <th className={`${s.headerCell} text-left `}>Status</th>
          <th className={`${s.headerCell} text-right `}>Action</th>
        </tr>
      </thead>

      <tbody className={s.body}>
        {order.map((order) => (
          <tr className={s.row} key={order.orderId}>
            <td className={s.cell}>
              <div className={s.customerName}>{order.customerName}</div>
              <div className={s.customerPhone}>
                <Phone className={s.phoneIcon} />
                {order.phone}
              </div>
            </td>

            <td className={s.cellOrderId}>
              {formatShortOrderId(order.orderId)}
            </td>

            <td className={s.cell}>
              <span className={s.amountBadge}>
                {formatMoney(order.totalAmount)}
              </span>
            </td>

            <td className={s.cell}>
              <span className={s.paymentBadge}>{order.paymentMethod}</span>
            </td>

            <td className={s.cellStatus}>
              <div className={s.statusWrapper}>
                <StatusDropdown
                  order={order}
                  onStatusChange={onStatusChange}
                  hover
                />
              </div>
            </td>

            <td className={s.cellAction}>
              <button
                type="button"
                onClick={() => onSelectOrder(order)}
                className={s.viewButton}
              >
                <Eye className={s.viewButton} />
                View
              </button>
            </td>
          </tr>
        ))}

        {order.length === 0 && (
          <tr>
            <td colSpan={6} className={s.emptyCell}>
              <AlertTriangle className={s.emptyIcon} />
              <p className={s.emptyTitle}>No Orders Found</p>
              <p className={s.emptySubtext}>
                Try another search or status filter.
              </p>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default OrdersTable;
