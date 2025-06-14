import './App.scss';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Layout from '../components/Layout/Layout';
import MovieDetail from '../components/MovieDetail/MovieDetail';
import MovieList from '../components/MovieList/MovieList';
import Sidebar from '../components/Sidebar/Sidebar';

const MovieListWithSidebar = () => (
  <>
    <Sidebar />
    <MovieList />
  </>
);

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MovieListWithSidebar />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
