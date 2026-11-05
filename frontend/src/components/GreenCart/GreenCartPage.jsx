import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ShoppingCart,
  ArrowRight,
  Minus,
  Plus,
  LoaderCircle,
  PackageOpen,
  RefreshCw,
} from "lucide-react";
import { useCart } from "../../CartContext";
import { getHookahs } from "../../api/api";
import { hookahPageStyles as s } from "../../assets/dummyStyles";
import hookahFallback from "../../assets/product-images/hookah-001.png";
import hookahFallbackTwo from "../../assets/product-images/hookah-002.png";
import hookahFallbackThree from "../../assets/product-images/hookah-003.png";
import hookahFallbackFour from "../../assets/product-images/hookah-004.png";

const hookahFallbacks = [
  hookahFallback,
  hookahFallbackTwo,
  hookahFallbackThree,
  hookahFallbackFour,
];

const getImageUrl = (image) => {
  const url = typeof image === "string" ? image : image?.url;
  return typeof url === "string" && url.trim() ? url.trim() : null;
};

const isDemoPlaceholderUrl = (imageUrl) => {
  try {
    const url = new URL(imageUrl);
    return (
      url.hostname === "placehold.co" &&
      url.pathname.toLowerCase() === "/600x600/0d241d/34d399.png" &&
      url.searchParams.has("text")
    );
  } catch {
    return false;
  }
};

const getProductFallback = (index) =>
  hookahFallbacks[index % hookahFallbacks.length];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const GreenCartPage = ({ expanded = false }) => {
  const { addItem, decreaseItem, getQuantity } = useCart();
  const prefersReducedMotion = useReducedMotion();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [loadAttempt, setLoadAttempt] = useState(0);

  useEffect(() => {
    let isCurrent = true;

    const fetchGreenCart = async () => {
      setLoading(true);
      setLoadError(false);

      try {
        const { data } = await getHookahs();
        if (isCurrent) {
          setProducts(Array.isArray(data?.hookahs) ? data.hookahs : []);
        }
      } catch (error) {
        console.log("Error fetching hookahs:", error);
        if (isCurrent) {
          setLoadError(true);
        }
      } finally {
        if (isCurrent) {
          setLoading(false);
        }
      }
    };

    fetchGreenCart();

    return () => {
      isCurrent = false;
    };
  }, [loadAttempt]);

  const visibleProducts = expanded ? products : products.slice(0, 12);
  const hasMoreProducts = !expanded;
  const handleImageError = (event, fallbackImage) => {
    if (event.currentTarget.dataset.fallbackApplied) return;
    event.currentTarget.dataset.fallbackApplied = "true";
    event.currentTarget.src = fallbackImage;
  };

  const renderStatus = () => {
    if (loading) {
      return (
        <div className={s.statePanel} role="status">
          <LoaderCircle className={`${s.stateIcon} animate-spin`} />
          <p className={s.stateTitle}>Gathering the collection</p>
          <p className={s.stateText}>
            Our signature picks will be ready in just a moment.
          </p>
        </div>
      );
    }

    if (loadError) {
      return (
        <div className={s.statePanel} role="alert">
          <RefreshCw className={s.stateIcon} />
          <p className={s.stateTitle}>The collection could not load</p>
          <p className={s.stateText}>
            Please check your connection and try again.
          </p>
          <button
            type="button"
            onClick={() => setLoadAttempt((attempt) => attempt + 1)}
            className={s.stateAction}
          >
            <RefreshCw size={16} />
            Try again
          </button>
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <div className={s.statePanel}>
          <PackageOpen className={s.stateIcon} />
          <p className={s.stateTitle}>A fresh shelf is on its way</p>
          <p className={s.stateText}>
            There are no signature picks to show right now. Please check back
            soon.
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <section className={s.section}>
      <div className={s.ambientGlow} aria-hidden="true" />
      <div className={s.container}>
        <div className={s.headerWrapper}>
          <p className={s.badge}>Premium GreenCart Shelf</p>
          <h1 className={s.heading}>
            Signature <span className={s.highlight}>GreenCart Picks</span>
          </h1>

          <div className={s.divider} />
        </div>

        {renderStatus() || (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            variants={containerVariants}
            className={
              visibleProducts.length <= 2 ? s.productGridCompact : s.productGrid
            }
          >
            {visibleProducts.map((item, index) => {
              const fallbackImage = getProductFallback(index);
              const requestedImageUrl = getImageUrl(item.image);
              const imageUrl =
                requestedImageUrl && !isDemoPlaceholderUrl(requestedImageUrl)
                  ? requestedImageUrl
                  : fallbackImage;
              const cartItem = {
                cartId: `greenCart-${item._id}`,
                source: "GreenCart",
                category: "GreenCart Products",
                id: item._id,
                productModel: "Hookah",
                image: imageUrl,
                name: item.name,
                company: item.company,
                price: item.sellingPrice,
                oldPrice: item.oldPrice,
                size: item.size,
              };
              const quantity = getQuantity(cartItem.cartId);

              return (
                <motion.div
                  key={cartItem.cartId}
                  variants={itemVariants}
                  whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                  className={s.cardMotion}
                >
                  <div className={s.productCard}>
                    <div className={s.cardOverlay1} />
                    <div className={s.cardOverlay2} />
                    <div className={s.cardOverlay3} />

                    <div className={s.cardContent}>
                      <div className={s.imageWrapper}>
                        <img
                          src={imageUrl}
                          alt={item.name}
                          loading="lazy"
                          className={s.productImage}
                          onError={(event) =>
                            handleImageError(event, fallbackImage)
                          }
                        />
                      </div>

                      <div className={s.productInfo}>
                        <h3 className={s.productName}>{item.name}</h3>
                        <p className={s.productCompany}>{item.company}</p>

                        <div className={s.sizeBadge}>{item.size}</div>

                        <div className={s.priceContainer}>
                          <div className={s.priceRow}>
                            <span className={s.priceCurrent}>
                              {item.sellingPrice}
                            </span>
                            <span className={s.priceOld}>{item.oldPrice}</span>
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
                              Add to Cart
                              <ArrowRight size={16} />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className={s.cardBottomBar} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {hasMoreProducts && (
          <div className={s.viewMoreWrapper}>
            <Link to="/greencart-products" className={s.viewMoreLink}>
              View More Products
              <ArrowRight size={18} className={s.viewMoreArrow} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default GreenCartPage;
