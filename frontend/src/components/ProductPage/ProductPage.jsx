import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCategories } from "../../api/api";
import { productsPageStyles as s } from "../../assets/dummyStyles";
import categoryFallback from "../../assets/P2.png";

const getImageUrl = (image) => {
  const url = typeof image === "string" ? image : image?.url;
  return typeof url === "string" && url.trim() ? url.trim() : null;
};

const ProductPage = () => {
  const [categories, setCategories] = useState([]);

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
      <div
        className="pointer-events-none absolute inset-0"
        style={s.gradientBackground}
      />

      <div className={s.innerContainer}>
        <div className={s.grid}>
          {categories.map((category, index) => (
            <Link
              key={category._id}
              to={`/product/${encodeURIComponent(category.categoryName)}`}
              className={s.categoryLink}
              style={{
                animation: `fadeUp 0.6 ease both`,
                animationDelay: `${index * 60}ms`,
              }}
            >
              <img
                src={getImageUrl(category.image) || categoryFallback}
                className={s.categoryImage}
                alt={`${category.categoryName} category`}
                onError={(event) => {
                  if (event.currentTarget.dataset.fallbackApplied) return;
                  event.currentTarget.dataset.fallbackApplied = "true";
                  event.currentTarget.src = categoryFallback;
                }}
              />
              <h3 className={s.categoryName}>{category.categoryName}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
