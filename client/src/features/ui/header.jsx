import { useDispatch, useSelector } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

import { useEffect } from 'react';
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
          <li key={1}>
            <CheckoutHeader />
          </li>,
          <li key={2}>
            <a href='/api/logout'>Logout</a>
          </li>,
        ];
    }
  };
  // if (authStatus === 'idle') {
  //   <a href='/auth/google' className='text'>
  //     Sign In With Google
  //   </a>;
  // } else if (authStatus === 'loading') {
  //   content = <ThreeDots height='30' width='30' />;
  // } else if (authStatus === 'succeeded') {
  //   content = user.auth.googleId;
  // } else if (authStatus === 'failed') {
  //   content = <div>{error}</div>;
  // }

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
