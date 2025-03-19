import { useState } from "react";
import ProductCarts from "./ProductCarts";
import { useFetchAllProductsQuery } from "../../redux/features/products/productApi";

const TrendingProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(8);
  const { data, isLoading, error } = useFetchAllProductsQuery({
    limit: visibleProducts,
  });
  const products = data?.data?.products || [];
  const totalProducts = data?.data?.totalProducts || 0;

  const loadmorProducts = () => {
    setVisibleProducts((prevCart) => prevCart + 4);
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Somthing want worng</div>;
  return (
    <section className="section__container product__container">
      <h2 className="section__header">Trending Products</h2>
      <p className=" section__subheader">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo commodi
        laborum vero ut rem velit, incidunt esse nam quo!
      </p>

      {/* product carts */}
      <div className="section__margin">
        <ProductCarts products={products.slice(0, visibleProducts)} />
      </div>

      {/* loard more products */}
      <div className="product__btn">
        {visibleProducts < totalProducts && (
          <button className="btn" onClick={loadmorProducts}>
            Load More
          </button>
        )}
      </div>
    </section>
  );
};

export default TrendingProducts;
