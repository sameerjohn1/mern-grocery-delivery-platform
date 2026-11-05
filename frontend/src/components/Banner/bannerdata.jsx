export const bannerData = {
  badge: "Freshness Delivered Daily",

  heading: {
    line1: "Fresh groceries,",
    line2: "delivered in minutes.",
  },

  description:
    "Farm-fresh vegetables, juicy fruits, and everyday essentials picked at peak quality and dropped at your doorstep — fresh, fast, and fuss-free.",

  buttons: [
    { label: "Shop Now", type: "primary", to: "/greencart-products" },
    { label: "View Fresh Picks", type: "secondary", to: "/greencart-products" },
  ],

  cards: [
    {
      icon: "Leaf",
      title: "100% Organic",
      text: "Clean and fresh produce",
    },
    {
      icon: "BadgePercent",
      title: "Best Offers",
      text: "Save more every week",
    },
    {
      icon: "Truck",
      title: "Fast Delivery",
      text: "Doorstep delivery service",
    },
  ],

  stats: [
    { value: "12k+", label: "Happy customers" },
    { value: "4.9/5", label: "Average rating" },
    { value: "60 min", label: "Express delivery" },
  ],

  trust: "Trusted by 12,000+ happy customers",

  highlights: [
    { icon: "Truck", text: "Free delivery over $30" },
    { icon: "ShieldCheck", text: "Freshness guarantee" },
    { icon: "Clock", text: "Same-day dispatch" },
  ],

  floatingBadges: {
    top: { icon: "Leaf", title: "Farm Fresh", text: "Picked today" },
    bottom: { icon: "Truck", title: "Free Delivery", text: "On orders $30+" },
  },
};
