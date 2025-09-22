import "./CalculatorForm.css";
import { useState } from "react";
import { formConfigs } from "./formTypes";
import Button from "../ui/button/Button";
import Input from "../ui/input/Input";
import Radio from "../ui/radio/Radio";
import Select from "../ui/select/Select";
import Result from "../result/Result";

function CalculatorForm({
  category,
  onBack,
}: {
  category: string;
  onBack: () => void;
}) {
  const fields = formConfigs[category]; // Получаем конфигурацию полей для выбранной категории
  const [formData, setFormData] = useState<Record<string, any>>({}); // Состояние для хранения данных формы
  const [isSubmitted, setIsSubmitted] = useState(false); // Флаг для отображения результата вместо формы
  const [result, setResult] = useState<{
    width: number;
    length: number;
    height: number;
  } | null>(null); // Состояние для хранения результата расчета

  // Поля, которые лучше отобразить как radio кнопки (мало вариантов)
  const radioFields = ["loadingSide", "material"];

  // Обработчик изменения значения в текстовых и числовых полях
  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Обработчик изменения значения в radio кнопках
  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Функция для выполнения расчета на основе введенных данных
  const calculateResult = () => {
    const addToWidth = 10;
    const addToLength = 20;
    const addToHeight = 30;

    const trayWidth = Number(formData.width) || 0;
    const trayLength = Number(formData.length) || 0;
    const trayPipe = parseInt(formData.pipe) || 0;
    const trayLevels = Number(formData.levels);
    const trayDistance = Number(formData.distance) || 0;
    const wheelsType = formData.wheels;
    const wheelsDiameter = Number(formData.wheelsDiameter);

    const wheelsHeight = wheelsDiameter > 80 && wheelsDiameter < 120 ? 130 : 0;

    const calculateDimensions = (isWidthLoading: boolean) => {
      const width = isWidthLoading
        ? trayWidth + addToWidth + 2 * trayPipe
        : trayLength + addToWidth + 2 * trayPipe;
      const length = isWidthLoading
        ? trayLength + addToLength
        : trayWidth + addToLength;
      const height =
        trayLevels * trayDistance + 2 * trayPipe + wheelsHeight + addToHeight;

      const calculation = [
        { name: `L - ${trayLevels * trayDistance + addToHeight}мм 4шт` },
        { name: `L - ${width}мм 4шт` },
        { name: `L - ${length}мм 4шт` },
        { name: `${wheelsType} D - ${wheelsDiameter}мм 4шт` },
        { name: `Длина направляющих: ${trayLength + 10}мм` },
      ];

      return { width, length, height, trayDistance, calculation };
    };

    switch (formData.loadingSide) {
      case "По ширине":
        return calculateDimensions(true);
      case "По длине":
        return calculateDimensions(false);
      default:
        return null;
    }
  };

  // Обработчик отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    const calcResult = calculateResult(); // Выполняем расчет
    setResult(calcResult); // Сохраняем результат в состояние
    setIsSubmitted(true); // Переключаемся на отображение результата
  };

  // Если форма отправлена, отображаем результат
  if (isSubmitted && result) {
    return (
      <Result
        result={result}
        onBack={() => setIsSubmitted(false)} // Возврат к форме
      />
    );
  }

  // Отображение формы для ввода данных
  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="calculator-form">
        <div className="form__back">
          <Button
            className="button_alternate"
            value="← Назад к выбору категории"
            onClick={onBack} // Возврат к выбору категории
          />
        </div>

        <div className="form-fields">
          {fields.map((field) => (
            <div key={field.name} className="form-field">
              {field.type === "number" && (
                <Input
                  legend={field.label}
                  anchor={field.name}
                  placeholder="Введите значение"
                  value={formData[field.name] || ""} // Значение из состояния
                  type="number"
                  onChange={
                    (e) => handleInputChange(field.name, e.target.value) // Обновление состояния
                  }
                />
              )}

              {field.type === "select" &&
                radioFields.includes(field.name) &&
                field.options && (
                  <fieldset className="radio-group">
                    <legend className="radio-group__legend">
                      {field.label}
                    </legend>
                    <div className="radio-group__options">
                      {field.options.map((option) => (
                        <Radio
                          key={option}
                          name={field.name}
                          legend={option}
                          defaultChecked={formData[field.name] === option} // Проверка выбранного значения
                          onChange={
                            () => handleRadioChange(field.name, option) // Обновление состояния
                          }
                        />
                      ))}
                    </div>
                  </fieldset>
                )}

              {field.type === "select" &&
                !radioFields.includes(field.name) &&
                field.options && (
                  <Select
                    legend={field.label}
                    anchor={field.name}
                    options={field.options}
                    value={formData[field.name]} // Значение из состояния
                    onChange={
                      (e) => handleInputChange(field.name, e.target.value) // Обновление состояния
                    }
                  />
                )}
            </div>
          ))}
        </div>

        <Button className="button_primary" value="Рассчитать" type="submit" />
      </form>
    </div>
  );
}

export default CalculatorForm;
