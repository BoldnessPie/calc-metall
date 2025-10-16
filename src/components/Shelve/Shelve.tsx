function Shelve({ onBack }: { onBack: () => void }) {
  return (
    <div className="form-wrapper">
      <div className="form__back">
        <button onClick={onBack}>← Назад к выбору категории</button>
      </div>
      <p>Калькулятор для категории "Стеллажи" в разработке...</p>
    </div>
  );
}

export default Shelve;
