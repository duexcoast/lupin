export default function Header() {
  return (
    <div className='navbar bg-primary'>
      <div className='flex-1'>
        <a className='btn btn-ghost normal-case text-xl'>Lupin</a>
      </div>
      <div className='flex-none'>
        <ul className='menu menu-horizontal p-0'>
          <li>
            <a className="text">Sign In With Google</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
