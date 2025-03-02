import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import {
  useDeleteUserByIdMutation,
  useFetchAllUserQuery,
  useUpdateUserRoleMutation,
} from "../redux/api/userApiSlice";
import { IoIosCheckmark } from "react-icons/io";
import { GoTrash } from "react-icons/go";
const ModalUpdateRoles = ({ isOpen, onClose }) => {
  const [selectedRoles, setSelectedRoles] = useState({});
  const [updateUserRole, { isLoading }] = useUpdateUserRoleMutation();
  const { data: users, refetch, loadingUser } = useFetchAllUserQuery();
  console.log(users);
  const handleUpdateRole = async (userId) => {
    try {
      await updateUserRole({
        id: userId,
        role: selectedRoles[userId] || "",
      }).unwrap();
      await refetch();
      alert("Cập nhật role thành công!");
    } catch (error) {
      alert("Lỗi cập nhật role: " + error.data?.error);
    }
  };

  const [deleteUserById] = useDeleteUserByIdMutation();

  const deleteHandler = async (id) => {
    try {
      if (window.confirm("Xóa này khoản này?")) {
        const res = await deleteUserById(id);
        await refetch();
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error?.data?.error);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 px-4 xl:px-0 left-0 right-0 w-screen h-screen font-roboto bg-black/20 z-50 flex items-center justify-center">
          <div className="w-full xl:w-1/3  py-10 px-4 bg-primary-light rounded-md relative">
            <button onClick={onClose} className="absolute top-2 right-2">
              <IoMdClose
                className="text-black/80 hover:text-primary-bluebold"
                size={30}
              />
            </button>
            <div className="space-y-6">
              {users?.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={user.avatar}
                      className="h-[30px] w-[30px] xl:h-[40px] xl:w-[40px] rounded-full"
                      alt={user.username}
                    />
                    <h1 className="flex-2 text-xs xl:text-sm">{user.username}</h1> -
                    <p className="text-sm xl:text-lg text-primary-bluebold font-bold flex-1">
                      {user.role === "admin" && "Admin"}
                      {user.role === "author" && "Tác Giả"}
                      {user.role === "reader" && "Đọc Giả"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      className="bg-primary-bluepale  rounded-md text-primary-light px-0 xl:px-4 p-2  text-sm focus:outline-none"
                      value={selectedRoles[user._id] || user.role}
                      onChange={(e) =>
                        setSelectedRoles({
                          ...selectedRoles,
                          [user._id]: e.target.value,
                        })
                      }
                    >
                      <option value="admin">Admin</option>
                      <option value="author">Tác Giả</option>
                      <option value="reader">Đọc Giả</option>
                    </select>
                    <button
                      onClick={() => handleUpdateRole(user._id)}
                      disabled={isLoading}
                      className="rounded-md bg-primary-greenpale"
                    >
                      <IoIosCheckmark size={24} />
                    </button>
                    <button
                      onClick={() => deleteHandler(user._id)}
                      
                      className="rounded-md bg-primary-greenpale"
                    >
                      <GoTrash size={24} className="text-red-500 font-bold bg-primary-lightbold" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalUpdateRoles;
