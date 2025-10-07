import "./Tabs.css";
import Trolley from "../../assets/images/Telejka.png";
import Table from "../../assets/images/Stol.png";
import Shelf from "../../assets/images/Stellaj.png";
import Sink from "../../assets/images/Moika.png";

function Tabs({ onSelect }: { onSelect: (category: string) => void }) {
  return (
    <div className="tabs">
      <h3 className="tabs__title">Выберите категорию для расчета</h3>

      <div className="tabs__grid">
        <button className="tabs__card" onClick={() => onSelect("carts")}>
          <img src={Trolley} alt="Тележки" className="tabs__image" />
          <span className="tabs__label">Тележки</span>
        </button>

        <button className="tabs__card" onClick={() => onSelect("tables")}>
          <img src={Table} alt="Столы" className="tabs__image" />
          <span className="tabs__label">Столы</span>
        </button>

        <button className="tabs__card" onClick={() => onSelect("shelves")}>
          <img src={Shelf} alt="Стеллажи" className="tabs__image" />
          <span className="tabs__label">Стеллажи</span>
        </button>

        <button className="tabs__card" onClick={() => onSelect("sinks")}>
          <img src={Sink} alt="Мойки" className="tabs__image" />
          <span className="tabs__label">Мойки</span>
        </button>
      </div>
    </div>
  );
}

export default Tabs;
