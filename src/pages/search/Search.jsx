import { useState } from "react";
import productsData from "../../data/products.json";
import ProductCarts from "../shop/ProductCarts";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();

    const filtered = productsData.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );

    setFilteredProducts(filtered);
  };

  return (
    <>
      <section className="section__container bg-[#f4e5ec]">
        <h2 className="section__header text-3xl font-bold capitalize mb-4">
          Search Products
        </h2>
        <p className="section__subheader text-lg text-gray-600">
          Browse a diverse range of categories, from chic dresses to versatile
          accessories. Elevate your style today!
        </p>
      </section>

      <section className="section__container ">
        <div className="w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            type="text"
            placeholder="Search for products..."
            className="search__bar w-full  md:w-3/4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#ed3849]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="search__bar w-full md:w-auto py-3 px-8 bg-[#ed3849] text-white rounded hover:bg-[#d63242] transition-colors duration-200"
            type="submit"
          >
            Search
          </button>
        </div>
        {/* some error div section__container self */}
        <div className="section__margin"> 
          <ProductCarts products={filteredProducts} />
        </div>
      </section>
    </>
  );
};

export default Search;
