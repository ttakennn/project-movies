import './App.scss';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Layout from '../components/Layout/Layout';
import MovieDetail from '../components/MovieDetail/MovieDetail';
import MovieList from '../components/MovieList/MovieList';
import SearchResults from '../pages/SearchResults';
import Tabbar from '../components/Tabbar/Tabbar';
import { useState } from 'react';

type MovieCategory = 'now_playing' | 'top_rated';

const MovieListWithTabbar = () => {
  const [category, setCategory] = useState<MovieCategory>('now_playing');

  return (
    <>
      <Tabbar currentCategory={category} onCategoryChange={setCategory} />
      <MovieList category={category} />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MovieListWithTabbar />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
