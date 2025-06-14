import './Sidebar.scss';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul className="sidebar__menu">
        <li className="sidebar__item sidebar__item--active">Now Playing</li>
        <li className="sidebar__item">Top Rated</li>
      </ul>
    </aside>
  );
};

export default Sidebar; 