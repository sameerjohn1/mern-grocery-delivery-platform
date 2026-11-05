import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  LoaderCircle,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { getCategories } from "../../api/api";
import { productsPageStyles as s } from "../../assets/dummyStyles";
import categoryFallback from "../../assets/P2.png";
import { resolveCatalogImageUrl } from "../../utils/imageUrls";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
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

const ProductPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let isCurrent = true;

    const fetchCategories = async () => {
      setLoading(true);
      setLoadError(false);
      try {
        const { data } = await getCategories();
        if (isCurrent) setCategories(data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        if (isCurrent) setLoadError(true);
      } finally {
        if (isCurrent) setLoading(false);
      }
    };

    fetchCategories();
    return () => {
      isCurrent = false;
    };
  }, [loadAttempt]);

  return (
    <section id="products" className={s.section}>
      <div className={s.ambientGlow} aria-hidden="true" />
      <div className={s.ambientGlowTwo} aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        style={s.gradientBackground}
        aria-hidden="true"
      />

      <div className={s.innerContainer}>
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className={s.headerWrapper}
        >
          <motion.p variants={itemVariants} className={s.badge}>
            <Sparkles className={s.badgeIcon} />
            Browse the Collection
          </motion.p>
          <motion.h2 variants={itemVariants} className={s.heading}>
            Shop by <span className={s.highlight}>Categories</span>
          </motion.h2>
          <motion.p variants={itemVariants} className={s.subheading}>
            Explore our curated shelves and find the pieces that fit your
            ritual — thoughtfully picked, freshly stocked.
          </motion.p>
          <motion.div variants={itemVariants} className={s.divider} />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className={s.grid}
        >
          {loading ? (
            <div
              className="col-span-full flex min-h-52 flex-col items-center justify-center gap-3 rounded-3xl border border-[#A7E8C1]/15 bg-[#0D241D]/70 p-6 text-center"
              role="status"
              aria-live="polite"
            >
              <LoaderCircle className="h-7 w-7 animate-spin text-[#A7E8C1]" />
              <p className="text-sm font-bold text-[#A7C4B8]">
                Loading categories...
              </p>
            </div>
          ) : loadError ? (
            <div
              className="col-span-full flex min-h-52 flex-col items-center justify-center gap-3 rounded-3xl border border-red-400/20 bg-[#0D241D]/70 p-6 text-center"
              role="alert"
            >
              <p className="font-bold text-[#F6F3E8]">
                Categories could not be loaded.
              </p>
              <p className="text-sm text-[#A7C4B8]">
                Please check your connection and try again.
              </p>
              <button
                type="button"
                onClick={() => setLoadAttempt((attempt) => attempt + 1)}
                className="inline-flex items-center gap-2 rounded-full bg-[#A7E8C1] px-4 py-2 text-sm font-bold text-[#0B2B21] transition hover:bg-[#DDF4E5]"
              >
                <RefreshCw className="h-4 w-4" />
                Try again
              </button>
            </div>
          ) : categories.length === 0 ? (
            <div className="col-span-full flex min-h-52 flex-col items-center justify-center gap-2 rounded-3xl border border-[#A7E8C1]/15 bg-[#0D241D]/70 p-6 text-center">
              <p className="font-bold text-[#F6F3E8]">No categories found</p>
              <p className="text-sm text-[#A7C4B8]">
                Categories will appear here once they are added.
              </p>
            </div>
          ) : (
            categories.map((category) => (
              <motion.div
                key={category._id}
                variants={itemVariants}
                className={s.cardMotion}
                whileHover={prefersReducedMotion ? undefined : { y: -4 }}
              >
                <Link
                  to={`/product/${encodeURIComponent(category.categoryName)}`}
                  className={s.categoryLink}
                >
                  <div className={s.imageWrapper}>
                    <span className={s.imageGlow} aria-hidden="true" />
                    <img
                      src={
                        resolveCatalogImageUrl(category.image) ||
                        categoryFallback
                      }
                      className={s.categoryImage}
                      alt={`${category.categoryName} category`}
                      loading="lazy"
                      onError={(event) => {
                        if (event.currentTarget.dataset.fallbackApplied) return;
                        event.currentTarget.dataset.fallbackApplied = "true";
                        event.currentTarget.src = categoryFallback;
                      }}
                    />
                  </div>
                  <div className={s.categoryFooter}>
                    <h3 className={s.categoryName}>{category.categoryName}</h3>
                    <span className={s.categoryArrow}>
                      <ArrowUpRight className={s.categoryArrowIcon} />
                    </span>
                  </div>
                  <div className={s.cardBottomBar} />
                </Link>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductPage;
