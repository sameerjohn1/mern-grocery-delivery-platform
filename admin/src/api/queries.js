import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCatalogProduct,
  createCategory,
  createProducts,
  deleteCatalogProduct,
  deleteCategory,
  deleteProduct,
  getAllOrders,
  getCatalogProducts,
  getCategories,
  getDashboard,
  getProducts,
  getSingleOrder,
  updateCatalogProduct,
  updateCategory,
  updateOrderStatus,
  updateProduct,
} from "./adminApi";

const CATALOG_STALE_TIME = 5 * 60 * 1000;
const DASHBOARD_STALE_TIME = 30 * 1000;

export const queryKeys = {
  admin: ["admin"],
  dashboard: ["admin", "dashboard"],
  orders: (params = {}) => ["admin", "orders", params],
  order: (orderId) => ["admin", "order", orderId],
  categories: ["categories"],
  products: (params = {}) => ["products", params],
  catalogProducts: ["catalog-products"],
};

export const useDashboardQuery = (options = {}) =>
  useQuery({
    queryKey: queryKeys.dashboard,
    queryFn: async () => {
      const { data } = await getDashboard();
      if (!data?.success || !data.dashboard) {
        throw new Error(data?.message || "Dashboard data is unavailable.");
      }
      return data.dashboard;
    },
    staleTime: DASHBOARD_STALE_TIME,
    ...options,
  });

export const useAdminOrdersQuery = (params, options = {}) =>
  useQuery({
    queryKey: queryKeys.orders(params),
    queryFn: async () => {
      const { data } = await getAllOrders(params);
      if (!data?.success || !Array.isArray(data.orders)) {
        throw new Error(data?.message || "Orders could not be loaded.");
      }
      return {
        orders: data.orders,
        totalPages: Math.max(data.totalPages || 1, 1),
      };
    },
    staleTime: DASHBOARD_STALE_TIME,
    ...options,
  });

export const getAdminOrderQueryOptions = (orderId) => ({
  queryKey: queryKeys.order(orderId),
  queryFn: async () => {
    const { data } = await getSingleOrder(orderId);
    if (!data?.success || !data.order) {
      throw new Error(data?.message || "Order details are unavailable.");
    }
    return data.order;
  },
});

export const useAdminOrderQuery = (orderId, options = {}) =>
  useQuery({
    ...getAdminOrderQueryOptions(orderId),
    enabled: Boolean(orderId),
    ...options,
  });

export const useCategoriesQuery = (options = {}) =>
  useQuery({
    queryKey: queryKeys.categories,
    queryFn: async () => {
      const { data } = await getCategories();
      return data?.categories || [];
    },
    staleTime: CATALOG_STALE_TIME,
    ...options,
  });

export const useProductsQuery = (params, options = {}) =>
  useQuery({
    queryKey: queryKeys.products(params),
    queryFn: async () => {
      const { data } = await getProducts(params);
      return data?.products || [];
    },
    staleTime: CATALOG_STALE_TIME,
    ...options,
  });

export const useCatalogProductsQuery = (options = {}) =>
  useQuery({
    queryKey: queryKeys.catalogProducts,
    queryFn: async () => {
      const { data } = await getCatalogProducts();
      return data?.hookahs || [];
    },
    staleTime: CATALOG_STALE_TIME,
    ...options,
  });

export const useUpdateOrderStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, status }) => updateOrderStatus(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin });
    },
  });
};

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createProducts(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useCreateCatalogProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createCatalogProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.catalogProducts });
    },
  });
};

export const useUpdateCatalogProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateCatalogProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.catalogProducts });
    },
  });
};

export const useDeleteCatalogProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteCatalogProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.catalogProducts });
    },
  });
};
