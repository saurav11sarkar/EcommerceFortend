import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductCarts from "../shop/ProductCarts";
import { useFetchAllProductsQuery } from "../../redux/features/products/productApi";

const CategoryPage = () => {
  const { categoryName } = useParams();
  console.log(categoryName);
  const [filterProducts, setFilterProducts] = useState([]);
  const { data, isLoading, error } = useFetchAllProductsQuery({
    category: categoryName,
  });
  const products = data?.data?.products || [];
  useEffect(() => {
    const filtered = products.filter(
      (product) => product.category === categoryName.toLowerCase()
    );
    setFilterProducts(filtered);
  }, [categoryName, data]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>something to worng</div>;
  return (
    <>
      <section className="section__container bg-[#f4e5ec] ">
        <h2 className="section__header capitalize">{categoryName}</h2>
        <p className="section__subheader">
          Browse a diverse range of categories, from chic dress to versitile
          asscories Elevate your style today
        </p>
      </section>
      {/* products card */}

      <div className="section__container">
        <ProductCarts products={filterProducts} />
      </div>
    </>
  );
};

export default CategoryPage;
