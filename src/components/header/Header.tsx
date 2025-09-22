import Container from "../container/Container";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <Container>
        <div className="header__wrap">
          <h1 className="header__title">Калькулятор</h1>
          <p className="header__description">
            Расчет металла для производства и построение модели
          </p>
        </div>
      </Container>
    </header>
  );
}

export default Header;
