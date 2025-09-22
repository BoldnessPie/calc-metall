import "./Tabs.css";

function Tabs({ onSelect }: { onSelect: (category: string) => void }) {
  return (
    <div className="tabs">
      <h3 className="tabs__title">Выберите категорию для расчета</h3>

      <ul className="tabs__list">
        <li className="tabs__item">
          <button className="tabs__link" onClick={() => onSelect("carts")}>
            Тележки
          </button>
        </li>

        <li className="tabs__item">
          <button className="tabs__link" onClick={() => onSelect("tables")}>
            Столы
          </button>
        </li>

        <li className="tabs__item">
          <button className="tabs__link" onClick={() => onSelect("shelves")}>
            Стеллажи
          </button>
        </li>

        <li className="tabs__item">
          <button className="tabs__link" onClick={() => onSelect("sinks")}>
            Мойки
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Tabs;
