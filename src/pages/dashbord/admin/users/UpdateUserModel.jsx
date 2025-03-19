import { useState } from "react";
import { useUpdateUserRoleMutation } from "../../../../redux/features/auth/authApi";

const UpdateUserModel = ({ user, onClose, onRoleUpdate }) => {
  const [role, setRole] = useState(user.role);
  const [updateUserRole] = useUpdateUserRoleMutation();
  const handleUpdateRole = async () => {
    try {
      await updateUserRole({ userId: user?._id, role }).unwrap();
      alert("Role updeted successfully!");
      onRoleUpdate();
      onClose();
    } catch (error) {
      console.error("Failed to update user role", error);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80">
      <div
        style={{ padding: "16px" }}
        className="bg-white rounded shadow-lg w-1/3"
      >
        <h2 style={{ marginBottom: "16px" }} className="text-xl">
          Edit User Role
        </h2>
        <div
          style={{
            marginBottom: "16px",
            marginBlockStart: "16px",
            marginBlockEnd: "16px",
          }}
          className=""
        >
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            style={{ marginTop: "4px", padding: "8px 20px" }}
            type="email"
            value={user?.email}
            readOnly
            className="bg-gray-100 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:outline-none"
          />
        </div>
        <div
          style={{
            marginBottom: "16px",
            marginBlockStart: "16px",
            marginBlockEnd: "16px",
          }}
        >
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            style={{ marginTop: "4px", padding: "8px 20px" }}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="block w-full shadow-sm sm:text-sm bg-gray-100 border-gray-300 rounded-md focus:outline-none"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div style={{ paddingTop: "20px" }} className="flex justify-end">
          <button
            onClick={onClose}
            style={{ padding: "8px 16px", marginRight: "8px" }}
            className="bg-primary text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateRole}
            style={{ padding: "8px 16px", marginRight: "8px" }}
            className="bg-indigo-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserModel;
