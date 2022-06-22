import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosInstance from '../utils/useAxiosInstance';

const TodoListItem = (props) => {
  const axiosInstance = useAxiosInstance();
  const [status, setStatus] = useState(props?.status);

  const handleStatusChange = (e) => {
    // setStatus(!status);
    axiosInstance
      .patch(`api/todos/${props?.id}/`, { status: !status })
      .then((response) => {
        setStatus(response.data.status);
      });
  };

  return (
    <Link to={`${props?.id}/`}>
      <div className="todo-list-item">
        <div
          className="todo-list-item-check-container"
          onClick={handleStatusChange}
        >
          <input
            type="checkbox"
            name="todo-status"
            id="todo-status"
            onChange={handleStatusChange}
            checked={status}
            className="todo-list-item-check"
          />
        </div>
        <div className="todo-list-item-content">
          <h3>{props?.name}</h3>
          <p>{props?.text}</p>
        </div>
      </div>
    </Link>
  );
};

export default TodoListItem;
