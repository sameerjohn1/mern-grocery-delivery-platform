import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import { useCart } from "../../CartContext";
import { getProducts } from "../../api/api";
import { productItemsPageStyles as s } from "../../assets/dummyStyles";
import productFallback from "../../assets/P2.png";
import { resolveCatalogImageUrl } from "../../utils/imageUrls";

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

const ProductItemsPage = () => {
  const { id } = useParams();
  const categoryName = decodeURIComponent(id);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem, decreaseItem, getQuantity } = useCart();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let isCurrent = true;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await getProducts({
          category: categoryName,
        });

        if (isCurrent) setProducts(data.products || []);
      } catch (error) {
        console.error(error);
      } finally {
        if (isCurrent) setLoading(false);
      }
    };

    fetchProducts();
    return () => {
      isCurrent = false;
    };
  }, [categoryName]);

  if (!loading && products.length === 0) {
    return (
      <section className={s.emptySection}>
        <h1 className={s.emptyHeading}>No Products Found</h1>
        <Link to="/" className={s.emptyLink}>
          <ArrowLeft size={17} />
          Back to Home
        </Link>
      </section>
    );
  }

  return (
    <section className={s.section}>
      <div className={s.container}>
        <Link to="/" className={s.backLink}>
          <ArrowLeft size={17} />
          Back to store
        </Link>

        <div className={s.contentWrapper}>
          <div className={s.headerWrapper}>
            <div>
              <p className={s.categoryLabel}>{categoryName}</p>
              <h2 className={s.categoryTitle}>Explore the Collection</h2>
            </div>
            <span className={s.countBadge}>
              <ShoppingBag size={14} className="mr-2" />
              {products.length} {products.length === 1 ? "Product" : "Products"}
            </span>
          </div>

          <motion.div
            className={s.productGrid}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            variants={containerVariants}
          >
            {products.map((item) => {
              const imageUrl =
                resolveCatalogImageUrl(item.image) || productFallback;
              const cartItem = {
                cartId: item._id,
                source: "Product",
                category: categoryName,
                id: item._id,
                productModel: "Product",
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
                  key={item._id}
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
                          onError={(event) => {
                            if (event.currentTarget.dataset.fallbackApplied)
                              return;
                            event.currentTarget.dataset.fallbackApplied =
                              "true";
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
        </div>
      </div>
    </section>
  );
};

export default ProductItemsPage;
