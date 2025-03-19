import { useDispatch, useSelector } from "react-redux";
import { useEditProfileMutation } from "../../../redux/features/auth/authApi";
import { useEffect, useState } from "react";
import avatorImg from "../../../assets/avatar.png";
import { setUser } from "../../../redux/features/auth/authSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { data: user } = useSelector((state) => state.auth);

  const [editProfile, { isLoading, isError, error, isSuccess }] =
    useEditProfileMutation();

  const [formData, setFormData] = useState({
    username: "",
    profileImage: "",
    bio: "",
    profession: "",
    userId: "",
  });
  const [isModelOpen, setIsModelOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user?.username || "",
        profileImage: user?.profileImage || "",
        bio: user?.bio || "",
        profession: user?.profession || "",
        userId: user?._id || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await editProfile(formData).unwrap();
      //   console.log(response);
      dispatch(setUser(response.data));
      localStorage.setItem("data", JSON.stringify(response.data));
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile. Please try again.");
    }
    setIsModelOpen(false);
  };

  return (
    <div style={{ margin: "0 auto", padding: "24px" }} className="container">
      <div
        style={{ padding: "24px" }}
        className="bg-white shadow-md rounded-lg"
      >
        <div
          style={{ marginBottom: "16px" }}
          className="flex gap-3 items-center justify-between"
        >
          <div className="flex gap-3 items-center">
            <img
              style={{ width: "128px", height: "128px" }}
              src={formData?.profileImage || avatorImg}
              alt=""
              className="w-32 h-32 object-cover rounded-full"
            />
            <div style={{ marginLeft: "24px" }} className="">
              <h3 className="text-2xl font-semibold">
                Username: {formData?.username || "N/A"}
              </h3>
              <p className="text-gray-700">User Bio: {formData.bio || "N/A"}</p>
              <p className="text-gray-700">
                Profession: {formData.profession || "N/A"}
              </p>
            </div>
          </div>

          <div>
            <button
              onClick={() => setIsModelOpen(true)}
              style={{ marginLeft: "auto" }}
              className="text-blue-500 hover:text-blue-700"
            >
              <i className="ri-timeline-view text-2xl"></i>
            </button>
          </div>
        </div>
      </div>

      {/* show model */}
      {isModelOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div
            style={{ padding: "24px", margin: "0 auto" }}
            className="bg-white rounded-lg md:w-96 max-w-lg relative"
          >
            <button
              onClick={() => setIsModelOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <i
                style={{ padding: "1px" }}
                className="ri-close-line size-8 text-2xl bg-black rounded-full"
              ></i>
            </button>
            <h2 style={{ marginBottom: "16px" }} className="tex-2xl font-bold">
              Edit Profile
            </h2>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "16px" }}>
                <label
                  htmlFor="username"
                  className="block text-sm text-gray-700"
                >
                  User Name
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="user name"
                  value={formData?.username}
                  onChange={handleChange}
                  style={{ marginTop: "4px", padding: "8px" }}
                  className="w-full border border-gray-300 rounded-md shadow-sm"
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label
                  htmlFor="profileImage"
                  className="block text-sm text-gray-700"
                >
                  Profile Image url
                </label>
                <input
                  type="url"
                  name="profileImage"
                  placeholder="Profile Image"
                  value={formData?.profileImage}
                  onChange={handleChange}
                  style={{ marginTop: "4px", padding: "8px" }}
                  className="w-full border border-gray-300 rounded-md shadow-sm"
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label htmlFor="bio" className="block text-sm text-gray-700">
                  Write your bio
                </label>
                <textarea
                  type="text"
                  name="bio"
                  placeholder="Bio"
                  value={formData?.bio}
                  onChange={handleChange}
                  style={{ marginTop: "4px", padding: "8px" }}
                  className="w-full border border-gray-300 rounded-md shadow-sm"
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label
                  htmlFor="profession"
                  className="block text-sm text-gray-700"
                >
                  Profession
                </label>
                <input
                  type="text"
                  name="profession"
                  placeholder="profession"
                  value={formData?.profession}
                  onChange={handleChange}
                  style={{ marginTop: "4px", padding: "8px" }}
                  className="w-full border border-gray-300 rounded-md shadow-sm"
                />
              </div>

              <button
                disabled={isLoading}
                style={{ marginTop: "16px", padding: "8px 8px" }}
                className="w-full bg-blue-500 text-white rounded-md"
                type="submit"
              >
                {isLoading ? "saving..." : "save change"}
              </button>
              {isError && (
                <p style={{ marginTop: "8px" }} className="text-red-600">
                  Faild to update profile. Please try again
                </p>
              )}
              {isSuccess && (
                <p style={{ marginTop: "8px" }} className="text-green-600">
                  Profile updeted successfully!
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
