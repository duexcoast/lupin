import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Header from '../features/ui/Header';
import { fetchUser } from '../features/users/userSlice';

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
      <Header />
      <Outlet />
    </>
  );
}

export default App;
