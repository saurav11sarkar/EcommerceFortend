// import { useEffect, useState } from "react";
// import productsData from "../../data/products.json";
// import ProductCarts from "./ProductCarts";
// import ShopFiltering from "./ShopFiltering";
// import { useFetchAllProductsQuery } from "../../redux/features/products/productApi";
// import { data } from "react-router";

// const filters = {
//   categories: ["all", "accessories", "dress", "jewellery", "cosmetics"],
//   colors: ["all", "black", "red", "gold", "blue", "silver", "beige", "green"],
//   priceRanges: [
//     { label: "Under $50", min: 0, max: 50 },
//     { label: "$50 - $100", min: 50, max: 100 },
//     { label: "$100 - $200", min: 100, max: 200 },
//     { label: "$200 and above", min: 200, max: Infinity },
//   ],
// };

// const ShopPage = () => {
//   // const [products, setProducts] = useState(productsData);
//   const [filterState, setFilterState] = useState({
//     category: "all",
//     color: "all",
//     priceRange: "",
//   });

//   // redux
//   const [currentPage, setCurrentPage] = useState(1);
//   const [productsPerPage, setProductsParPage] = useState(8);
//   const { category, color, priceRange } = filterState;
//   const [minPrice, maxPrice] = priceRange.split("-").map(Number);

//   const {
//     // data: { products = [], totalProducts, totalPages } = {},
//     error,
//     isLoading,
//   } = useFetchAllProductsQuery({
//     category: category !== "all" ? category : "",
//     color: color !== "all" ? color : "",
//     minPrice: isNaN(minPrice) ? "" : minPrice,
//     maxPrice: isNaN(maxPrice) ? "" : maxPrice,
//     page: currentPage,
//     limit: productsPerPage,
//   });

//   console.log("all data", data);

//   //   filtering function
//   // const applyFilter = () => {
//   //   let filteredProdutss = productsData;

//   //   // filter by cate
//   //   if (filterState.category && filterState.category !== "all") {
//   //     filteredProdutss = filteredProdutss.filter(
//   //       (product) => product.category === filterState.category
//   //     );
//   //   }

//   //   //   filter by color
//   //   if (filterState.color && filterState.color !== "all") {
//   //     filteredProdutss = filteredProdutss.filter(
//   //       (product) => product.color === filterState.color
//   //     );
//   //   }

//   //   //   filter by priceRange
//   //   if (filterState.priceRange) {
//   //     const [minPrice, maxPrice] = filterState.priceRange
//   //       .split("-")
//   //       .map(Number);
//   //     filteredProdutss = filteredProdutss.filter(
//   //       (product) => product.price >= minPrice && product.price <= maxPrice
//   //     );
//   //   }

//   //   setProducts(filteredProdutss);
//   // };
//   // useEffect(() => {
//   //   applyFilter();
//   // }, [filterState]);

//   const clearFunction = () => {
//     setFilterState({ category: "all", color: "all", priceRange: "" });
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }
//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <>
//       <section className="section__container bg-[#f4e5ec] ">
//         <h2 className="section__header capitalize">Shop Page</h2>
//         <p className="section__subheader">
//           Discover the Hottest Picks: with our Curated Collection of Trending
//           Women's Fashion Producs.
//         </p>
//       </section>
//       <section className="section__container">
//         <div className="flex flex-col md:flex-row md:gap-12 gap-8">
//           {/* left side */}
//           <ShopFiltering
//             filters={filters}
//             filterState={filterState}
//             setFilterState={setFilterState}
//             clearFilters={clearFunction}
//           />

//           {/* right side */}
//           <div>
//             <h3 className="text-xl font-medium">
//               Products Available.{products.length}
//             </h3>
//             <div className="section__margin">
//               <ProductCarts products={products} />
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default ShopPage;

import { useState } from "react";
// import productsData from "../../data/products.json";
import ProductCarts from "./ProductCarts";
import ShopFiltering from "./ShopFiltering";
import { useFetchAllProductsQuery } from "../../redux/features/products/productApi";

const filters = {
  categories: ["all", "accessories", "dress", "jewellery", "cosmetics"],
  colors: ["all", "black", "red", "gold", "blue", "silver", "beige", "green"],
  priceRanges: [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "$200 and above", min: 200, max: Infinity },
  ],
};

const ShopPage = () => {
  const [filterState, setFilterState] = useState({
    category: "all",
    color: "all",
    priceRange: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);

  const { category, color, priceRange } = filterState;
  const [minPrice, maxPrice] = priceRange
    ? priceRange.split("-").map(Number)
    : [null, null];

  const { data, error, isLoading } = useFetchAllProductsQuery({
    category: category !== "all" ? category : "",
    color: color !== "all" ? color : "",
    minPrice: isNaN(minPrice) ? "" : minPrice,
    maxPrice: isNaN(maxPrice) ? "" : maxPrice,
    page: currentPage,
    limit: productsPerPage,
  });

  const products = data?.data?.products || [];
  const totaPages = data?.data?.totalPages || [];
  const totalProducts = data?.data?.totalProducts || [];

  const clearFunction = () => {
    setFilterState({ category: "all", color: "all", priceRange: "" });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = startProduct + products.length - 1;

  // pagination
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totaPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      <section className="section__container bg-[#f4e5ec]">
        <h2 className="section__header capitalize">Shop Page</h2>
        <p className="section__subheader">
          Discover the Hottest Picks: with our Curated Collection of Trending
          Women's Fashion Products.
        </p>
      </section>
      <section className="section__container">
        <div className="flex flex-col md:flex-row md:gap-12 gap-8">
          <ShopFiltering
            filters={filters}
            filterState={filterState}
            setFilterState={setFilterState}
            clearFilters={clearFunction}
          />
          <div>
            <h3 className="text-xl font-medium">
              Showing {startProduct} to {endProduct} of {totalProducts} products
            </h3>
            <div className="section__margin">
              <ProductCarts products={products} />

              {/* pagination control */}
              <div
                style={{ marginTop: "24px" }}
                className="flex justify-center"
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  style={{ padding: "8px 16px", marginRight: "8px" }}
                  className="bg-gray-300 text-gray-700 rounded-md"
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {[...Array(totaPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    style={{ padding: "8px 16px", margin: "0 4px" }}
                    className={`${
                      currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-gray-700"
                    } rounded-md`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  style={{ padding: "8px 16px", marginLeft: "8px" }}
                  className="bg-gray-300 text-gray-700 rounded-md"
                  disabled={currentPage === totaPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
