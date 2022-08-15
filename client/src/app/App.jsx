import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import HeaderTwo from '../features/ui/HeaderTwo';
import { fetchUser } from '../features/users/userSlice';

export const Dashboard = () => <h2>Dashboard</h2>;
export const SurveyNew = () => <h2>SurveyNew</h2>;

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const userInfo = await dispatch(fetchUser()).unwrap();
    })();
  }, []);

  return (
    <>
      <HeaderTwo />
      <Outlet />
    </>
  );
}

export default App;
