import "./Search.scss";

import { useEffect, useMemo, useState } from "react";

import debounce from "lodash/debounce";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useMemo(() => {
    return debounce((query: string) => {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }, 500);
  }, [navigate]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div className="search container">
      <input
        type="text"
        className="search__input"
        placeholder="Search for movies..."
        value={searchTerm}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Search;
