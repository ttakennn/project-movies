import './App.scss';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Layout from '../components/Layout/Layout';
import MovieDetail from '../components/MovieDetail/MovieDetail';
import MovieList from '../components/MovieList/MovieList';
import SearchResults from '../pages/SearchResults';
import Sidebar from '../components/Sidebar/Sidebar';
import { useState } from 'react';

type MovieCategory = 'now_playing' | 'top_rated';

const MovieListWithSidebar = () => {
  const [category, setCategory] = useState<MovieCategory>('now_playing');

  return (
    <>
      <Sidebar currentCategory={category} onCategoryChange={setCategory} />
      <MovieList category={category} />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MovieListWithSidebar />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
