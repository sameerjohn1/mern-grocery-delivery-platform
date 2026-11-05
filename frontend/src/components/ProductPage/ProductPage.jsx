import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { getCategories } from "../../api/api";
import { productsPageStyles as s } from "../../assets/dummyStyles";
import categoryFallback from "../../assets/P2.png";

const getImageUrl = (image) => {
  const url = typeof image === "string" ? image : image?.url;
  return typeof url === "string" && url.trim() ? url.trim() : null;
};

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
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await getCategories();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

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
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
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
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className={s.grid}
        >
          {categories.map((category) => (
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
                    src={getImageUrl(category.image) || categoryFallback}
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
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductPage;
