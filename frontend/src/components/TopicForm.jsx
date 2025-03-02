import React from "react";

const TopicForm = ({
  topic,
  setTopic,
  category,
  categories,
  setCategory,
  submitHandle,
  deleteHandle,
  title,
}) => {
  return (
    <div>
      <form className="font-roboto" onSubmit={submitHandle}>
        <input
          type="text"
          placeholder="chủ đề..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="focus:outline-none block text-primary-dark border border-gray-300 bg-white px-4 py-2 rounded-md "
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="focus:outline-none mt-2 text-primary-dark border border-gray-300 bg-white px-4 py-2 rounded-md "
        >
          <option value="">Chọn Danh Mục</option>
          {categories?.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="rounded-sm text-sm text-primary-bluebold font-bold bg-primary-greenpale px-4 py-2 block mt-2"
          >
            {title}
          </button>
          {deleteHandle && (
            <button
              className="rounded-sm text-sm text-primary-bluebold bg-primary-greenpale font-bold px-4 py-2 block mt-2"
              type="button"
              onClick={deleteHandle}
            >
              Xóa
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TopicForm;
