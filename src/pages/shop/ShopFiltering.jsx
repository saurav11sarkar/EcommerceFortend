const ShopFiltering = ({
  filters,
  filterState,
  setFilterState,
  clearFilters,
}) => {
  return (
    <div className="space-y-5 flex-shrink-0 ">
      <h3>Filters</h3>
      
      {/* categorys */}
      <div className="flex flex-col gap-2">
        <h4 className="font-medium text-lg ">Category</h4>
        <hr className="text-gray-300" />
        {filters.categories.map((category) => (
          <label key={category} className="capitalize cursor-pointer">
            <input
              type="radio"
              name="category"
              id="category"
              value={category}
              checked={filterState.category === category}
              onChange={(e) =>
                setFilterState({ ...filterState, category: e.target.value })
              }
            />
            <span className="ml-1">{category}</span>
          </label>
        ))}
      </div>

      {/* color */}
      <div className="section__margin">
        <div className="flex flex-col gap-2">
          <h4 className="font-medium text-lg ">Color</h4>
          <hr className="text-gray-300" />
          {filters.colors.map((color) => (
            <label key={color} className="capitalize cursor-pointer">
              <input
                type="radio"
                name="color"
                id="color"
                value={color}
                checked={filterState.color === color}
                onChange={(e) =>
                  setFilterState({ ...filterState, color: e.target.value })
                }
              />
              <span className="ml-1">{color}</span>
            </label>
          ))}
        </div>
      </div>

      {/* price range */}
      <div className="section__margin">
        <div className="flex flex-col gap-2">
          <h4 className="font-medium text-lg ">Price Range</h4>
          <hr className="text-gray-300" />
          {filters.priceRanges.map((range) => (
            <label key={range.label} className="capitalize cursor-pointer">
              <input
                type="radio"
                name="priceRange"
                id="priceRange"
                value={`${range.min}-${range.max}`}
                checked={filterState.priceRange === `${range.min}-${range.max}`}
                onChange={(e) =>
                  setFilterState({ ...filterState, priceRange: e.target.value })
                }
              />
              <span className="ml-1">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* clear filters */}
      <button
        onClick={clearFilters}
        className="section__margin search__filterbtn bg-[#ed3849] text-white rounded"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default ShopFiltering;
