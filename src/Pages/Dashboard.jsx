import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useAxiosInstance from '../utils/useAxiosInstance';
import TodoListItem from '../Components/TodoListItem';
import { TodosContext } from '../Context/TodosContext';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosInstance = useAxiosInstance();
  const controller = new AbortController();

  useEffect(() => {
    setIsLoading(true);
    axiosInstance
      .get('api/todos/')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
    setIsLoading(false);
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <TodosContext.Provider value={{ data, setData }}>
      <div className="container">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className="todos-list">
              {data.map((todo) => (
                <TodoListItem key={todo?.id} {...todo} />
              ))}
            </div>
            <div className="todo-detail">
              <Outlet />
            </div>
          </>
        )}
      </div>
    </TodosContext.Provider>
  );
};

export default Dashboard;
