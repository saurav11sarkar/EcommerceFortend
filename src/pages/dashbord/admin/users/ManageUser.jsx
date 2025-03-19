import { Link } from "react-router";
import {
  useDeletedUserMutation,
  useGetUserQuery,
} from "../../../../redux/features/auth/authApi";
import { useState } from "react";
import UpdateUserModel from "./UpdateUserModel";

const ManageUser = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: userData, isLoading, error, refetch } = useGetUserQuery();
  const users = userData?.data || [];
  const [deletedUser] = useDeletedUserMutation();
  const handleDetete = async (id) => {
    try {
      const response = await deletedUser(id).unwrap();
      alert("delete user successfully");
      await refetch();
    } catch (error) {
      console.error("Faild to delete user", error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModelOpen(true);
  };

  const handleCloseModel = () => {
    setIsModelOpen(false);
    setSelectedUser(null);
  };

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
              <h3 className="my-4 text-sm">Showing to of product</h3>
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
                      User Email
                    </th>
                    <th
                      style={{ padding: "12px 24px" }}
                      className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                    >
                      User Role
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
                  {users &&
                    users.map((user, index) => (
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
                          {user?.email || "N/A"}
                        </td>
                        <td
                          style={{ padding: "16px 24px" }}
                          className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                        >
                          <span
                            style={{ padding: "2px 12px" }}
                            className={`rounded-full ${
                              user?.role === "admin"
                                ? "bg-indigo-500 text-white"
                                : "bg-amber-300 text-white"
                            }`}
                          >
                            {user?.role || "N/A"}
                          </span>
                        </td>
                        <td
                          style={{ padding: "16px 24px" }}
                          className=" cursor-pointer border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 hover:text-primary"
                        >
                          <button
                            onClick={() => handleEdit(user)}
                            className="flex gap-1 items-center"
                          >
                            <i className="ri-edit-2-line"></i>
                            Edit
                          </button>
                        </td>
                        <td
                          style={{ padding: "16px 24px" }}
                          className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                        >
                          <button
                            onClick={() => handleDetete(user?._id)}
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

      {isModelOpen && (
        <UpdateUserModel
          user={selectedUser}
          onClose={handleCloseModel}
          onRoleUpdate={refetch}
        />
      )}
    </>
  );
};

export default ManageUser;
