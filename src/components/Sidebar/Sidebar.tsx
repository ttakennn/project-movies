import './Sidebar.scss';

type MovieCategory = 'now_playing' | 'top_rated';

interface SidebarProps {
  onCategoryChange: (category: MovieCategory) => void;
  currentCategory: MovieCategory;
}

const Sidebar = ({ onCategoryChange, currentCategory }: SidebarProps) => {
  return (
    <aside className="sidebar">
      <ul className="sidebar__menu">
        <li 
          className={`sidebar__item ${currentCategory === 'now_playing' ? 'sidebar__item--active' : ''}`}
          onClick={() => onCategoryChange('now_playing')}
        >
          Now Playing
        </li>
        <li 
          className={`sidebar__item ${currentCategory === 'top_rated' ? 'sidebar__item--active' : ''}`}
          onClick={() => onCategoryChange('top_rated')}
        >
          Top Rated
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar; 