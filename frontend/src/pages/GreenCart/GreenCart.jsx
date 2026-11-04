import { useSearchParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import GreenCartPage from "../../components/GreenCart/GreenCartPage";
import Footer from "../../components/Footer/Footer";
import SearchResults from "../../components/SearchResults/SearchResults";

const GreenCart = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const isSearching = query.trim().length > 0;
  return (
    <div>
      <Navbar />
      {isSearching ? <SearchResults query={query} /> : <GreenCartPage />}
      <Footer />
    </div>
  );
};

export default GreenCart;
