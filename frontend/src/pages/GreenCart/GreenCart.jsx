import { lazy, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {
  ProductsSectionSkeleton,
  SearchSectionSkeleton,
} from "../../components/Skeletons/SkeletonBlocks";

const GreenCartPage = lazy(
  () => import("../../components/GreenCart/GreenCartPage"),
);
const SearchResults = lazy(
  () => import("../../components/SearchResults/SearchResults"),
);

const GreenCart = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const isSearching = query.trim().length > 0;
  return (
    <div>
      <Navbar />
      {isSearching ? (
        <Suspense fallback={<SearchSectionSkeleton />}>
          <SearchResults query={query} />
        </Suspense>
      ) : (
        <Suspense fallback={<ProductsSectionSkeleton />}>
          <GreenCartPage />
        </Suspense>
      )}
      <Footer />
    </div>
  );
};

export default GreenCart;
