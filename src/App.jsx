import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom';
import './App.css';
import ProtectectedRoutes from './utils/ProtectedRoutes';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import NotFound from './Pages/NotFound';
import TodoDetail from './Components/TodoDetail';
import TodoCreate from './Components/TodoCreate';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/" className="button neutral">
          Home
        </Link>
        <Link to="todos/create/" className="button create">
          Create
        </Link>
        <Link to="logout/" className="button neutral">
          Logout
        </Link>
      </nav>
      <Routes>
        <Route element={<ProtectectedRoutes />}>
          <Route path="/" element={<Navigate to="todos/" />} />
          <Route path="todos/" element={<Dashboard />}>
            <Route path=":id" element={<TodoDetail />} />
            <Route path="create/" element={<TodoCreate />} />
          </Route>
        </Route>
        <Route path="login/" element={<Login />}></Route>
        <Route path="logout/" element={<Logout />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
