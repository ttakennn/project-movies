import './App.scss';

import Layout from '../components/Layout/Layout';
import MovieList from '../components/MovieList/MovieList';
import Sidebar from '../components/Sidebar/Sidebar';

const App = () => {
  return (
    <Layout>
      <Sidebar />
      <MovieList />
    </Layout>
  );
};

export default App;
