import { Link } from "react-router-dom";

const Header = () => {
    return (
      <header>
        <div class="wrap header--flex">
          <h1 class="header--logo">
            {/* <a href="index.html">Courses</a> Replace this with a Link to Courses component */}
            <Link to="/">Courses</Link>
          </h1>
        </div>
      </header>
    );
};

export default Header;