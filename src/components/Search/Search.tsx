import './Search.scss';

const Search = () => {
  return (
    <div className="search container">
      <input 
        type="text" 
        className="search__input" 
        placeholder="Search for movies..."
      />
    </div>
  );
};

export default Search; 