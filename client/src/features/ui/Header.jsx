import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutHeader from '../payments/CheckoutHeader';

export default function Header() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const authStatus = useSelector((state) => state.user.auth);
  const error = useSelector((state) => state.user.error);

  // initializing content variable for state dependent user-status content
  let content;
  const renderContent = () => {
    switch (authStatus) {
      case null:
        return 'still deciding';
      case false:
        return <a href='/auth/google'>Login With Google</a>;
      default:
        return [
          <li key='1'>
            <CheckoutHeader />
          </li>,
          <li key='2'>
            <p>Credits: {user.auth.credits}</p>
          </li>,
          <li key='3'>
            <a href='/api/logout'>Logout</a>
          </li>,
        ];
    }
  };

  return (
    <div className='navbar bg-primary'>
      <div className='flex-1'>
        <Link
          to={authStatus ? '/surveys' : '/'}
          className='btn btn-ghost normal-case text-xl'
        >
          Lupin
        </Link>
      </div>
      <div className='flex-none'>
        <ul className='menu menu-horizontal p-0'>{renderContent()}</ul>
      </div>
    </div>
  );
}
