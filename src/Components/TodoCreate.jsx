import { useContext, useState } from 'react';
import { TodosContext } from '../Context/TodosContext';
import useAxiosInstance from '../utils/useAxiosInstance';
const TodoCreate = () => {
  const axiosInstance = useAxiosInstance();
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const { data, setData } = useContext(TodosContext);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post('api/todos/', { name: name, text: text, status: false })
      .then((response) => {
        setData([...data, response.data]);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          name="todo-name"
          id="todo-name"
          onChange={handleNameChange}
          value={name}
        />
        <textarea
          name="todo-text"
          id="todo-text"
          cols="30"
          rows="10"
          onChange={handleTextChange}
          value={text}
        />
        <button type="submit" className="create">
          Create
        </button>
      </form>
    </>
  );
};

export default TodoCreate;
