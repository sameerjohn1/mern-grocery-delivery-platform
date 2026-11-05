import {
  Boxes,
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingCart,
} from "lucide-react";

export const navGroups = [
  {
    label: "Overview",
    items: [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        description: "Revenue, orders, and delivery health at a glance.",
      },
    ],
  },
  {
    label: "Catalog",
    items: [
      {
        name: "Add Item",
        href: "/add-item",
        icon: PlusCircle,
        description: "Create a new catalog item and assign its category.",
      },
      {
        name: "Item List",
        href: "/item-list",
        icon: Package,
        description: "Review, edit, and remove catalog items.",
      },
      {
        name: "Add Product",
        href: "/add-product",
        icon: PlusCircle,
        description: "Publish a new product with pricing and images.",
      },
      {
        name: "Product List",
        href: "/product-list",
        icon: Boxes,
        description: "Manage the products currently available in the store.",
      },
    ],
  },
  {
    label: "Operations",
    items: [
      {
        name: "Orders",
        href: "/orders",
        icon: ShoppingCart,
        description: "Search orders, update status, and inspect deliveries.",
      },
    ],
  },
];

export const pageMeta = navGroups
  .flatMap((group) => group.items)
  .reduce(
    (meta, item) => ({
      ...meta,
      [item.href]: {
        title: item.name,
        description: item.description,
      },
    }),
    {},
  );

export const getPageMeta = (pathname) =>
  pageMeta[pathname] || {
    title: "Admin Workspace",
    description: "Manage the GreenCart store from one workspace.",
  };
