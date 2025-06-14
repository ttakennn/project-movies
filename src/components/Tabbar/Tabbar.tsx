import "./Tabbar.scss";

type MovieCategory = "now_playing" | "top_rated";

interface TabbarProps {
  onCategoryChange: (category: MovieCategory) => void;
  currentCategory: MovieCategory;
}

const Tabbar = ({ onCategoryChange, currentCategory }: TabbarProps) => {
  return (
    <div className="container">
      <div className="tabbar">
        <div className="tabbar__container">
          <button
            className={`tabbar__tab ${
              currentCategory === "now_playing" ? "tabbar__tab--active" : ""
            }`}
            onClick={() => onCategoryChange("now_playing")}
          >
            Now Playing
          </button>
          <button
            className={`tabbar__tab ${
              currentCategory === "top_rated" ? "tabbar__tab--active" : ""
            }`}
            onClick={() => onCategoryChange("top_rated")}
          >
            Top Rated
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tabbar;
