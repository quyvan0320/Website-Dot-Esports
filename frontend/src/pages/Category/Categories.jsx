import React, { useState } from "react";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../redux/api/categoryApiSlice";
import CategoryForm from "../../components/CategoryForm";
import { toast } from "react-toastify";
import Modal from "../../components/Modal";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [name, setName] = useState("");
  const [updatingName, setUpdatingName] = useState("");
  const [visibleModal, setVisibleModal] = useState(false);

  const {
    data: categories,
    refetch,
    isLoading,
    error,
  } = useGetAllCategoriesQuery();

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const createHandle = async (e) => {
    e.preventDefault();
    try {
      const res = await createCategory({ name }).unwrap();
      toast.success(`${name} đã được thêm`);
      setName("");
      refetch();
    } catch (error) {
      console.log(error.message);
      toast.error(error?.data?.error);
    }
  };

  const updateHandle = async (e) => {
    e.preventDefault();
    try {
      const res = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: { name: updatingName },
      }).unwrap();
      toast.success(`${selectedCategory.name} đã được cập nhật`);
      setSelectedCategory(null);
      setVisibleModal(false);
      refetch();
    } catch (error) {
      console.log(error.message);
      toast.error(error?.data?.error);
    }
  };

  const deleteHandle = async () => {
    try {
      const res = await deleteCategory(selectedCategory._id).unwrap();
      toast.success(`${selectedCategory.name} đã được xóa`);
      setSelectedCategory(null);
      setVisibleModal(false);
      refetch();
    } catch (error) {
      console.log(error.message);
      toast.error(error?.data?.error);
    }
  };

  return (
    <div className="container px-4 lg:px-0 max-w-screen-xl h-screen mx-auto bg-primary-light font-roboto">
      <div className="py-6">
        <h1 className="text-primary-bluebold text-2xl font-bold mb-6">
          Danh Mục
        </h1>
        <CategoryForm
          value={name}
          setValue={setName}
          title="Thêm Danh Mục"
          submitHandle={createHandle}
        />
        <div className="flex items-center gap-4 mt-8 flex-wrap">
          {categories?.map((category) => (
            <button
              className=" text-primary-bluebold px-2 py-2 border-2 border-primary-greenpale"
              key={category._id}
              onClick={() => {
                setVisibleModal(true);
                setUpdatingName(category.name);
                setSelectedCategory(category);
              }}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      <Modal
        isOpen={visibleModal}
        onClose={() => {
          setVisibleModal(false);
        }}
      >
        <CategoryForm
          value={updatingName}
          setValue={setUpdatingName}
          title="Cập Nhật"
          deleteHandle={deleteHandle}
          submitHandle={updateHandle}
        />
      </Modal>
    </div>
  );
};

export default Categories;
