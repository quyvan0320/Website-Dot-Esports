import React, { useState } from "react";
import {
  useCreateTopicMutation,
  useDeleteTopicMutation,
  useGetAllTopicsQuery,
  useUpdateTopicMutation,
} from "../../redux/api/topicApiSlice";
import { useGetAllCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import TopicForm from "../../components/TopicForm";
import Modal from "../../components/Modal";

const Topic = () => {
  const [topic, setTopic] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [category, setCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [updatingTopic, setUpdatingTopic] = useState("");
  const [visibleModal, setVisibleModal] = useState(false);

  const [createTopic] = useCreateTopicMutation();
  const { data: topics, refetch } = useGetAllTopicsQuery();
  const { data: categories } = useGetAllCategoriesQuery();
  const [updateTopic] = useUpdateTopicMutation();
  const [deleteTopic] = useDeleteTopicMutation();
  const createHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await createTopic({ name: topic, category });
      toast.success(`${topic} đã được thêm`);
      setTopic("");
      setCategory("");
      refetch();
    } catch (error) {
      console.log(error.message);
      toast.error(error?.data?.error);
    }
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await updateTopic({
        topicId: selectedTopic._id,
        updatedTopic: { name: updatingTopic, category: selectedCategory },
      }).unwrap();
      toast.success(`${selectedTopic.name} đã được cập nhật`);
      setSelectedCategory(null);
      setSelectedTopic(null);
      setVisibleModal(false);
      refetch();
    } catch (error) {
      console.log(error.message);
      toast.error(error?.data?.error);
    }
  };

  const deleteHandler = async (e) => {
    try {
      const res = await deleteTopic(selectedTopic._id).unwrap();
      toast.success(`${selectedTopic.name} đã được xóa`);
      setSelectedTopic(null);
      setSelectedCategory(null);
      setVisibleModal(false);
      refetch();
    } catch (error) {
      console.log(error.message);
      toast.error(error?.data?.error);
    }
  };

  return (
    <div className="container  px-4 lg:px-0 max-w-screen-xl h-screen mx-auto bg-primary-light font-roboto">
      <div className="py-6">
        <h1 className="text-primary-bluebold text-2xl font-bold mb-6">
          Chủ Đề
        </h1>
        <TopicForm
          topic={topic}
          setTopic={setTopic}
          category={category}
          setCategory={setCategory}
          categories={categories}
          title="Thêm Chủ Đề"
          submitHandle={createHandler}
        />
        <div className="flex items-center gap-4 mt-8 flex-wrap">
          {topics?.map((topic) => (
            <button
              key={topic._id}
              className=" text-primary-bluebold px-2 py-2 border-2 border-primary-greenpale"
              onClick={() => {
                setVisibleModal(true);
                setUpdatingTopic(topic.name);
                setSelectedTopic(topic);
                setSelectedCategory(topic.category);
              }}
            >
              {topic.name}
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
        <TopicForm
          topic={updatingTopic}
          setTopic={setUpdatingTopic}
          category={selectedCategory}
          setCategory={setSelectedCategory}
          categories={categories}
          title="Cập Nhật"
          submitHandle={updateHandler}
          deleteHandle={deleteHandler}
        />
      </Modal>
    </div>
  );
};

export default Topic;
