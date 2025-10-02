import "./Tabs.css";

function Tabs({ onSelect }: { onSelect: (category: string) => void }) {
  return (
    <div className="tabs">
      <h3 className="tabs__title">Выберите категорию для расчета</h3>

      <div className="tabs__grid">
        <button className="tabs__card" onClick={() => onSelect("carts")}>
          <img
            src="src/assets/images/Telejka.png"
            alt="Тележки"
            className="tabs__image"
          />
          <span className="tabs__label">Тележки</span>
        </button>

        <button className="tabs__card" onClick={() => onSelect("tables")}>
          <img
            src="src/assets/images/Stol.png"
            alt="Столы"
            className="tabs__image"
          />
          <span className="tabs__label">Столы</span>
        </button>

        <button className="tabs__card" onClick={() => onSelect("shelves")}>
          <img
            src="src/assets/images/Stellaj.png"
            alt="Стеллажи"
            className="tabs__image"
          />
          <span className="tabs__label">Стеллажи</span>
        </button>

        <button className="tabs__card" onClick={() => onSelect("sinks")}>
          <img
            src="src/assets/images/Moika.png"
            alt="Мойки"
            className="tabs__image"
          />
          <span className="tabs__label">Мойки</span>
        </button>
      </div>
    </div>
  );
}

export default Tabs;
