import { Link } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className='App-link' href='/auth/google'>
          <Link to='/auth/google'>Sign In With Google</Link>
        </a>
      </header>
    </div>
  );
}

export default App;
