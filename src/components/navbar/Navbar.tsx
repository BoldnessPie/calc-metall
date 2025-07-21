import "./Navbar.css";
import Container from "../container/Container";

function Navbar() {
  return (
    <nav className="navbar">
      <Container>
        <div className="navbar__wrap">
          <ul>
            <li>
              <a href="#section1">Тележки</a>
            </li>
            <li>
              <a href="#section2">Столы</a>
            </li>
            <li>
              <a href="#section3">Стеллажи</a>
            </li>
            <li>
              <a href="#section4">Мойки</a>
            </li>
          </ul>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
