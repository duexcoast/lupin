import { Outlet } from 'react-router-dom';
import Header from '../features/ui/header';

export const Dashboard = () => <h2>Dashboard</h2>;
export const SurveyNew = () => <h2>SurveyNew</h2>;
export const Landing = () => <h2>Landing</h2>;

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
