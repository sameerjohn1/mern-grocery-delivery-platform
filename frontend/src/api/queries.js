import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addAddress,
  cancelOrder,
  getAddresses,
  getCategories,
  getHookahs,
  getMyOrder,
  getProducts,
  updateAddress,
} from "./api";

const CATALOG_STALE_TIME = 5 * 60 * 1000;
const USER_DATA_STALE_TIME = 30 * 1000;

export const queryKeys = {
  categories: ["categories"],
  products: (params = {}) => ["products", params],
  hookahs: ["hookahs"],
  addresses: ["addresses"],
  myOrders: ["orders", "my-orders"],
};

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

export const useHookahsQuery = (options = {}) =>
  useQuery({
    queryKey: queryKeys.hookahs,
    queryFn: async () => {
      const { data } = await getHookahs();
      return data?.hookahs || [];
    },
    staleTime: CATALOG_STALE_TIME,
    ...options,
  });

export const useAddressesQuery = (options = {}) =>
  useQuery({
    queryKey: queryKeys.addresses,
    queryFn: async () => {
      const { data } = await getAddresses();
      return data?.addresses || [];
    },
    staleTime: USER_DATA_STALE_TIME,
    ...options,
  });

export const useMyOrdersQuery = (options = {}) =>
  useQuery({
    queryKey: queryKeys.myOrders,
    queryFn: async () => {
      const { data } = await getMyOrder();
      return data?.orders || [];
    },
    staleTime: USER_DATA_STALE_TIME,
    ...options,
  });

export const useAddAddressMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => addAddress(data),
    onSuccess: ({ data }) => {
      if (!data?.address) return;

      queryClient.setQueryData(queryKeys.addresses, (current = []) => [
        data.address,
        ...current,
      ]);
    },
  });
};

export const useUpdateAddressMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateAddress(id, data),
    onSuccess: ({ data }, { id }) => {
      if (!data?.address) return;

      queryClient.setQueryData(queryKeys.addresses, (current = []) =>
        current.map((item) => (item._id === id ? data.address : item)),
      );
    },
  });
};

export const useCancelOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => cancelOrder(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData(queryKeys.myOrders, (current = []) =>
        current.map((order) =>
          order._id === id ? { ...order, orderStatus: "Cancelled" } : order,
        ),
      );
    },
  });
};
