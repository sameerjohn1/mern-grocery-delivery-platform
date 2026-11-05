import Skeleton from "./Skeleton";
import {
  hookahPageStyles as greenCart,
  ordersPageStyles as orders,
  productsPageStyles as products,
  searchResultsStyles as search,
} from "../../assets/dummyStyles";

const range = (count) => Array.from({ length: count }, (_, index) => index);

export const ProductCardSkeleton = ({ wrapperClass = greenCart.cardMotion }) => (
  <div className={wrapperClass} aria-hidden="true">
    <div className={greenCart.productCard}>
      <div className={greenCart.cardContent}>
        <div className={greenCart.imageWrapper}>
          <Skeleton className="h-28 w-28 rounded-full bg-[#A7E8C1]/10" />
        </div>

        <div className={greenCart.productInfo}>
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="mt-2 h-3 w-2/5" />
          <Skeleton className="mt-3 h-6 w-16 rounded-full" />

          <div className={greenCart.priceContainer}>
            <Skeleton className="h-7 w-24" />
          </div>

          <div className={greenCart.actionWrapper}>
            <Skeleton className="h-11 w-full max-w-56 rounded-full bg-[#A7E8C1]/20" />
          </div>
        </div>

        <div className={greenCart.cardBottomBar} />
      </div>
    </div>
  </div>
);

export const ProductGridSkeleton = ({
  count = 8,
  gridClass = greenCart.productGrid,
}) => (
  <div
    className={gridClass}
    role="status"
    aria-live="polite"
    aria-label="Loading products"
  >
    {range(count).map((index) => (
      <ProductCardSkeleton key={index} />
    ))}
  </div>
);

export const ProductsSectionSkeleton = ({ count = 8 }) => (
  <section
    className={greenCart.section}
    role="status"
    aria-live="polite"
    aria-label="Loading GreenCart picks"
  >
    <div className={greenCart.ambientGlow} aria-hidden="true" />
    <div className={greenCart.container}>
      <div className={greenCart.headerWrapper}>
        <Skeleton className="mx-auto h-8 w-52 rounded-full" />
        <Skeleton className="mx-auto mt-5 h-12 w-3/4 max-w-xl" />
        <div className={greenCart.divider} />
      </div>

      <ProductGridSkeleton count={count} />
    </div>
  </section>
);

export const CategoryCardSkeleton = () => (
  <div className={products.cardMotion} aria-hidden="true">
    <div className={products.categoryLink}>
      <div className={products.imageWrapper}>
        <Skeleton className="h-full w-full rounded-xl bg-[#A7E8C1]/10" />
      </div>

      <div className={products.categoryFooter}>
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
      </div>

      <div className={products.cardBottomBar} />
    </div>
  </div>
);

export const CategoryGridSkeleton = ({ count = 10 }) => (
  <div
    className={products.grid}
    role="status"
    aria-live="polite"
    aria-label="Loading categories"
  >
    {range(count).map((index) => (
      <CategoryCardSkeleton key={index} />
    ))}
  </div>
);

export const CategoriesSectionSkeleton = ({ count = 10 }) => (
  <section
    className={products.section}
    role="status"
    aria-live="polite"
    aria-label="Loading categories"
  >
    <div className={products.ambientGlow} aria-hidden="true" />
    <div className={products.ambientGlowTwo} aria-hidden="true" />
    <div className={products.innerContainer}>
      <div className={products.headerWrapper}>
        <Skeleton className="mx-auto h-8 w-48 rounded-full" />
        <Skeleton className="mx-auto mt-5 h-12 w-2/3 max-w-xl" />
        <Skeleton className="mx-auto mt-4 h-4 w-1/2 max-w-lg" />
        <div className={products.divider} />
      </div>

      <CategoryGridSkeleton count={count} />
    </div>
  </section>
);

export const SearchSectionSkeleton = ({ count = 8 }) => (
  <section
    className={search.section}
    role="status"
    aria-live="polite"
    aria-label="Loading search results"
  >
    <div className={search.container}>
      <div className={search.headerWrapper}>
        <div>
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-3 h-9 w-72 max-w-full" />
        </div>
        <Skeleton className="h-9 w-24 rounded-full" />
      </div>

      <ProductGridSkeleton count={count} gridClass={search.resultsGrid} />
    </div>
  </section>
);

export const OrderCardSkeleton = () => (
  <article className={orders.orderCard} aria-hidden="true">
    <div className={orders.orderHeader}>
      <div className={orders.orderBadges}>
        <Skeleton className="h-7 w-24 rounded-full" />
        <Skeleton className="h-7 w-20 rounded-full" />
        <Skeleton className="h-7 w-24 rounded-full" />
      </div>

      <Skeleton className="mt-3 h-6 w-40" />
      <Skeleton className="mt-2 h-3 w-32" />

      <div className={orders.orderActions}>
        <Skeleton className="h-10 w-11 rounded-2xl" />
        <Skeleton className="h-10 w-full rounded-2xl" />
      </div>
    </div>
  </article>
);

export const OrdersGridSkeleton = ({ count = 6 }) => (
  <div
    className={orders.ordersGrid}
    role="status"
    aria-live="polite"
    aria-label="Loading orders"
  >
    {range(count).map((index) => (
      <OrderCardSkeleton key={index} />
    ))}
  </div>
);

export const PageSkeleton = () => (
  <div
    className="min-h-screen bg-[#071B16]"
    role="status"
    aria-live="polite"
    aria-label="Loading page"
  >
    <div className="border-b border-[#A7E8C1]/20 bg-[#0B2B21]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Skeleton className="h-11 w-11 rounded-2xl" />
        <Skeleton className="h-5 w-36" />
        <Skeleton className="ml-auto hidden h-10 w-72 rounded-full sm:block" />
        <Skeleton className="h-10 w-24 rounded-full" />
      </div>
    </div>

    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Skeleton className="h-8 w-44 rounded-full" />
      <Skeleton className="mt-5 h-12 w-full max-w-2xl" />
      <Skeleton className="mt-3 h-4 w-3/4 max-w-xl" />

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {range(8).map((index) => (
          <div
            key={index}
            className="overflow-hidden rounded-3xl border border-[#A7E8C1]/10 bg-[#0D241D] p-3"
          >
            <Skeleton className="h-40 w-full" />
            <Skeleton className="mt-4 h-4 w-2/3" />
            <Skeleton className="mt-2 h-3 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  </div>
);
