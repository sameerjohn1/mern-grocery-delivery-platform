import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Minus,
  Plus,
  RefreshCw,
  SearchX,
  ShoppingCart,
} from "lucide-react";
import { useCart } from "../../CartContext";
import { getHookahs, getProducts } from "../../api/api";
import { searchResultsStyles as s } from "../../assets/dummyStyles";
import { ProductGridSkeleton } from "../Skeletons/SkeletonBlocks";
import productFallback from "../../assets/P2.png";
import { resolveCatalogImageUrl } from "../../utils/imageUrls";

const normalize = (value) =>
  String(value || "")
    .trim()
    .toLowerCase();

const toProductSearchItem = (item) => ({
  id: item._id,
  cartId: `product-${item._id}`,
  source: "Product",
  productModel: "Product",
  category: item.category || "Grocery",
  image: resolveCatalogImageUrl(item.image),
  name: item.name || "",
  company: item.company || "",
  price: item.sellingPrice || 0,
  oldPrice: item.oldPrice || 0,
  size: item.size || "",
});

const toHookahSearchItem = (item) => ({
  id: item._id,
  cartId: `hookah-${item._id}`,
  source: "Hookah",
  productModel: "Hookah",
  category: "Hookah Products",
  image: resolveCatalogImageUrl(item.image),
  name: item.name || "",
  company: item.company || "",
  price: item.sellingPrice || 0,
  oldPrice: item.oldPrice || 0,
  size: item.size || "",
});

const matchQuery = (item, query) =>
  [item.name, item.company, item.category, item.size, item.source]
    .map(normalize)
    .join(" ")
    .includes(normalize(query));

const SearchResults = ({ query }) => {
  const { addItem, decreaseItem, getQuantity } = useCart();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const trimedQuery = query.trim();

  useEffect(() => {
    let isCurrent = true;

    const fetchSearchItems = async () => {
      setLoading(true);
      setLoadError(false);
      try {
        const [productResponse, hookahs] = await Promise.all([
          getProducts(),
          getHookahs(),
        ]);

        if (isCurrent) {
          setItems([
            ...(productResponse.data.products || []).map(toProductSearchItem),
            ...(hookahs.data.hookahs || []).map(toHookahSearchItem),
          ]);
        }
      } catch (error) {
        console.log(error);
        if (isCurrent) {
          setItems([]);
          setLoadError(true);
        }
      } finally {
        if (isCurrent) setLoading(false);
      }
    };

    fetchSearchItems();
    return () => {
      isCurrent = false;
    };
  }, [loadAttempt]);

  const result = useMemo(
    () => items.filter((item) => matchQuery(item, trimedQuery)),
    [items, trimedQuery],
  );

  if (!trimedQuery) return null;

  return (
    <section className={s.section}>
      <div className={s.container}>
        <div className={s.headerWrapper}>
          <div>
            <p className={s.eyebrow}>Search results</p>
            <h2 className={s.heading}>
              Results for{" "}
              <span className={s.queryHighlight}>&quot;{trimedQuery}&quot;</span>
            </h2>
          </div>
          {!loading && !loadError ? (
            <span className={s.countBadge}>
              {result.length} {result.length === 1 ? "item" : "items"}
            </span>
          ) : null}
        </div>

        {loading ? (
          <ProductGridSkeleton count={8} gridClass={s.resultsGrid} />
        ) : loadError ? (
          <div className={s.emptyContainer} role="alert">
            <SearchX className={s.emptyIcon} />
            <h3 className={s.emptyTitle}>Search results could not be loaded</h3>
            <p className={s.emptySubtext}>
              Please check your connection and try again.
            </p>
            <button
              type="button"
              onClick={() => setLoadAttempt((attempt) => attempt + 1)}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#A7E8C1] px-5 py-2.5 text-sm font-bold text-[#0B2B21] transition hover:bg-[#DDF4E5]"
            >
              <RefreshCw className="h-4 w-4" />
              Try again
            </button>
          </div>
        ) : result.length === 0 ? (
          <div className={s.emptyContainer}>
            <SearchX className={s.emptyIcon} />
            <h3 className={s.emptyTitle}>No matching item found</h3>
            <p className={s.emptySubtext}>
              Try searching product names, companies, categories, or hookah
              items.
            </p>
          </div>
        ) : (
          <div className={s.resultsGrid}>
            {result.map((item) => {
              const cartItem = {
                cartId: item.cartId,
                source: item.source,
                category: item.category,
                id: item.id,
                productModel: item.productModel,
                image: item.image,
                name: item.name,
                company: item.company,
                price: item.price,
                oldPrice: item.oldPrice,
                size: item.size,
              };
              const quantity = getQuantity(cartItem.cartId);

              return (
                <div key={item.id} className={s.productCard}>
                  <div className={s.cardOverlay1} />
                  <div className={s.cardOverlay2} />
                  <div className={s.cardOverlay3} />

                  <div className={s.cardContent}>
                    <div className={s.imageWrapper}>
                      <img
                        src={item.image || productFallback}
                        alt={item.name}
                        className={s.productImage}
                        loading="lazy"
                        onError={(event) => {
                          if (event.currentTarget.dataset.fallbackApplied)
                            return;
                          event.currentTarget.dataset.fallbackApplied = "true";
                          event.currentTarget.src = productFallback;
                        }}
                      />
                    </div>

                    <div className={s.productInfo}>
                      <h3 className={s.productName}>{item.name}</h3>
                      <p className={s.productCompany}>{item.company}</p>
                      <div className={s.sizeBadge}>{item.size}</div>

                      <div className={s.priceContainer}>
                        <div className={s.priceRow}>
                          <span className={s.priceCurrent}>
                            Rs {item.price}
                          </span>
                          <span className={s.priceOld}>Rs {item.oldPrice}</span>
                        </div>
                      </div>

                      <div className={s.actionWrapper}>
                        {quantity > 0 ? (
                          <div className={s.quantityControls}>
                            <button
                              type="button"
                              onClick={() => decreaseItem(cartItem.cartId)}
                              className={s.qtyButton}
                              aria-label={`Decrease ${item.name} quantity`}
                            >
                              <Minus size={16} />
                            </button>
                            <span className={s.qtyValue}>{quantity}</span>
                            <button
                              type="button"
                              onClick={() => addItem(cartItem)}
                              className={s.qtyButton}
                              aria-label={`Increase ${item.name} quantity`}
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => addItem(cartItem)}
                            className={s.addButton}
                          >
                            <ShoppingCart size={16} />
                            Add
                            <ArrowRight size={16} />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className={s.cardBottomBar} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchResults;
