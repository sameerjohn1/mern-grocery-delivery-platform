import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCategories } from "../../api/api";
import { productsPageStyles as s } from "../../assets/dummyStyles";

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
                src={category.image?.url}
                className={s.categoryImage}
                alt=""
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
