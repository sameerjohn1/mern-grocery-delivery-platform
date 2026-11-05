import { lazy, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import Banner from "../../components/Banner/Banner";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {
  CategoriesSectionSkeleton,
  ProductsSectionSkeleton,
  SearchSectionSkeleton,
} from "../../components/Skeletons/SkeletonBlocks";

const ProductPage = lazy(
  () => import("../../components/ProductPage/ProductPage"),
);
const GreenCartPage = lazy(
  () => import("../../components/GreenCart/GreenCartPage"),
);
const SearchResults = lazy(
  () => import("../../components/SearchResults/SearchResults"),
);

const Home = () => {
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
        <>
          <Banner />
          <Suspense fallback={<CategoriesSectionSkeleton />}>
            <ProductPage />
          </Suspense>
          <Suspense fallback={<ProductsSectionSkeleton />}>
            <GreenCartPage />
          </Suspense>
        </>
      )}

      <Footer />
    </div>
  );
};

export default Home;
