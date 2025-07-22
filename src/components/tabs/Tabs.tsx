import "./Tabs.css";
import Container from "../container/Container";

function Tabs() {
  return (
    <div className="tabs">
      <Container>
        <ul className="tabs__list">
          <li className="tabs__item">
            <a className="tabs__link" href="#section1">
              Тележки
            </a>
          </li>
          <li className="tabs__item">
            <a className="tabs__link" href="#section2">
              Столы
            </a>
          </li>
          <li className="tabs__item">
            <a className="tabs__link" href="#section3">
              Стеллажи
            </a>
          </li>
          <li className="tabs__item">
            <a className="tabs__link" href="#section4">
              Мойки
            </a>
          </li>
        </ul>
      </Container>
    </div>
  );
}

export default Tabs;
