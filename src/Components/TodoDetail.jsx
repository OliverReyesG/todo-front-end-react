import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAxiosInstance from '../utils/useAxiosInstance';
import { TodosContext } from '../Context/TodosContext';

const TodoDetail = () => {
  const { data, setData } = useContext(TodosContext);
  const axiosInstance = useAxiosInstance();
  const navigate = useNavigate();
  let { id } = useParams();
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .patch(`api/todos/${id}/`, {
        name: name,
        text: text,
      })
      .then((response) => {
        console.log(response);
        const tempData = data.map((todo) => {
          if (todo.id == id) {
            todo.name = response.data.name;
            todo.text = response.data.text;
            return todo;
          } else {
            return todo;
          }
        });
        console.log('TempData: ', tempData);
        setData(tempData);
      });
  };

  const handleDelete = (e) => {
    axiosInstance.delete(`api/todos/${id}/`).then((response) => {
      console.log(response);
      const tempData = data.filter((todo) => todo.id != id);
      console.log('Deleted Object', tempData);
      setData(tempData);
    });
    navigate(`/todos/`);
  };

  useEffect(() => {
    setName(data.find((todo) => todo.id == id)?.name);
    setText(data.find((todo) => todo.id == id)?.text);
  }, [data, id]);

  return (
    <>
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          name="todo-name"
          id="todo-name"
          onChange={handleNameChange}
          value={name || ''}
        />
        <textarea
          name="todo-text"
          id="todo-text"
          cols="30"
          rows="10"
          onChange={handleTextChange}
          value={text || ''}
        />
        <button type="submit">Save</button>
        <div className="button danger" onClick={handleDelete}>
          Delete
        </div>
      </form>
    </>
  );
};

export default TodoDetail;
