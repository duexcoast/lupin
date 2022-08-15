import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
// import Header from '../features/ui/Header';
import CheckoutHeader from '../features/payments/CheckoutHeader';
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
      <CheckoutHeader />
      <Outlet />
    </>
  );
}

export default App;
