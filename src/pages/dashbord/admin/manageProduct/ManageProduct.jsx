import React, { useState } from "react";
import {
  useDeletedProductMutation,
  useFetchAllProductsQuery,
} from "../../../../redux/features/products/productApi";
import { formetDate } from "../../../../utils/formetDate";
import { Link } from "react-router";

const ManageProduct = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12);
  const { data, error, isLoading, refetch } = useFetchAllProductsQuery({
    category: "",
    color: "",
    minPrice: "",
    maxPrice: "",
    page: currentPage,
    limit: productsPerPage,
  });

  const products = data?.data?.products || [];
  const totaPages = data?.data?.totalPages || [];
  const totalProducts = data?.data?.totalProducts || [];
  // console.log(data?.data);

  //   pagination
  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = startProduct + products.length - 1;

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totaPages) {
      setCurrentPage(pageNumber);
    }
  };
  const [deletedProduct] = useDeletedProductMutation();
  const handleDeteteProduct = async (id) => {
    try {
      const response = await deletedProduct(id).unwrap();
      alert("Products deleted successfully");
      await refetch();
    } catch (error) {
      console.error("Error deleteting product", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <section style={{ padding: "4px 0" }} className="py-1 bg-blueGray-50">
        <div
          style={{
            margin: "0 auto",
            marginBottom: "48px",
            padding: "0 16px",
          }}
          className="w-full  mb-12 xl:mb-0 px-4 mx-auto "
        >
          <div
            style={{ marginBottom: "24px" }}
            className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded "
          >
            <div
              style={{ marginBottom: "0", padding: "16px 12px" }}
              className="rounded-t mb-0 px-4 py-3 border-0 "
            >
              <div className="flex flex-wrap items-center">
                <div
                  style={{ padding: "0 16px" }}
                  className="relative w-full px-4 max-w-full flex-grow flex-1"
                >
                  <h3 className="font-semibold text-base text-blueGray-700">
                    All products
                  </h3>
                </div>
                <div
                  style={{ padding: "0 16px" }}
                  className="relative w-full px-4 max-w-full flex-grow flex-1 text-right"
                >
                  <button
                    style={{
                      padding: "4px 12px",
                      marginRight: "4px",
                      marginBottom: "4px",
                    }}
                    className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    See all
                  </button>
                </div>
              </div>
              <h3 className="my-4 text-sm">
                Showing {startProduct} to {endProduct} of {totalProducts}{" "}
                product
              </h3>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse  ">
                <thead>
                  <tr>
                    <th
                      style={{ padding: "12px 24px" }}
                      className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                    >
                      No.
                    </th>
                    <th
                      style={{ padding: "12px 24px" }}
                      className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                    >
                      Product Name
                    </th>
                    <th
                      style={{ padding: "12px 24px" }}
                      className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                    >
                      Publishing date
                    </th>
                    <th
                      style={{ padding: "12px 24px" }}
                      className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                    >
                      Edit or manage
                    </th>
                    <th
                      style={{ padding: "12px 24px" }}
                      className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {products &&
                    products.map((product, index) => (
                      <tr key={index}>
                        <th
                          style={{ padding: "16px 24px" }}
                          className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 "
                        >
                          {index + 1}
                        </th>
                        <td
                          style={{ padding: "16px 24px" }}
                          className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 "
                        >
                          {product?.name}
                        </td>
                        <td
                          style={{ padding: "16px 24px" }}
                          className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                        >
                          {formetDate(product?.createdAt)}
                        </td>
                        <td
                          style={{ padding: "16px 24px" }}
                          className=" cursor-pointer border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 hover:text-primary"
                        >
                          <Link to={`/dashboard/update-product/${product._id}`}>
                            Edit
                          </Link>
                        </td>
                        <td
                          style={{ padding: "16px 24px" }}
                          className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                        >
                          <button
                            onClick={() => handleDeteteProduct(product._id)}
                            style={{ padding: "4px 8px" }}
                            className="bg-red-600 text-white"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* pagination */}
        <div
          style={{ marginTop: "24px" }}
          className="flex justify-center items-center"
        >
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            style={{ padding: "8px 16px", marginRight: "8px" }}
            className="bg-gray-300 text-gray-700 rounded-md"
          >
            Previous
          </button>
          {[...Array(totaPages)].map((_, index) => (
            <button key={index}
              onClick={() => handlePageChange(index + 1)}
              style={{ padding: "8px 16px", margin: "0 4px" }}
              className={`${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              } rounded`}
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totaPages}
            onClick={() => handlePageChange(currentPage + 1)}
            style={{ padding: "8px 16px", marginLeft: "8px" }}
            className="bg-gray-300 text-gray-700 rounded-md"
          >
            Next
          </button>
        </div>

        <footer
          style={{
            paddingTop: "32px",
            paddingBottom: "24px",
            marginTop: "64px",
          }}
          className="relative pt-8 pb-6 mt-16"
        >
          <div
            style={{ margin: "0 auto", padding: "0 16px" }}
            className="container mx-auto px-4"
          >
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div
                style={{ padding: "0 16px", margin: "0 auto" }}
                className="w-full md:w-6/12 px-4 mx-auto text-center"
              >
                <div className="text-sm text-blueGray-500 font-semibold py-1">
                  Made with{" "}
                  <a
                    href="https://www.creative-tim.com/product/notus-js"
                    className="text-blueGray-500 hover:text-gray-800"
                    target="_blank"
                  >
                    MERN stack
                  </a>{" "}
                  by Creative{" "}
                  <a
                    style={{ color: "red" }}
                    href="https://www.creative-tim.com"
                    className="text-blueGray-500 hover:text-blueGray-800"
                    target="_blank"
                  >
                    {" "}
                    Saurav sarkar
                  </a>
                  .
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
};

export default ManageProduct;
