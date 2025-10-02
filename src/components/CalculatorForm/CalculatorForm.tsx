import "./CalculatorForm.css";
import { useState } from "react";
import { formConfigs } from "./formTypes";
import type { CalculatorFormProps, CalcResult } from "../../types/types";
import { useFormValidation } from "../../hooks/useFormValidation";
import { calculateResult as calcResultUtil } from "../../utils/calculateResult";

import Button from "../ui/button/Button";
import Input from "../ui/input/Input";
import Radio from "../ui/radio/Radio";
import Select from "../ui/select/Select";
import Result from "../result/Result";
import Checkbox from "../ui/checkbox/Checkbox";

function CalculatorForm({ category, onBack }: CalculatorFormProps) {
  const fields = formConfigs[category] ?? [];
  const [formData, setFormData] = useState<
    Record<string, string | number | boolean>
  >({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<CalcResult | null>(null);
  const { errors, validateField, hasErrors } = useFormValidation(fields);

  // Поля, которые лучше отобразить как radio кнопки (мало вариантов)
  const radioFields = ["loadingSide", "material"];

  // Обработчик изменения значения в текстовых и числовых полях
  const handleInputChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleCheckboxChange = (name: string, value: boolean) => {
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };

      // Если снимаем checkbox "rails", очищаем поле customRailsWidth
      if (name === "rails" && !value) {
        delete newData.customRailsWidth;
      }

      return newData;
    });
  };

  // Обработчик потери фокуса для валидации
  const handleBlur = (name: string) => {
    validateField(name, formData[name]);
  };

  // Обработчик изменения значения в radio кнопках
  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Функция для выполнения расчета на основе введенных данных
  const calculateResult = () => {
    return calcResultUtil(formData);
  };

  // Обработчик отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы

    if (hasErrors()) {
      alert("Исправьте ошибки в форме перед отправкой.");
      return;
    }

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
          {fields.map((field) => {
            // Скрываем поле customRailsWidth, если checkbox rails не отмечен
            if (field.name === "customRailsWidth" && !formData["rails"]) {
              return null;
            }

            return (
              <div key={field.name} className="form-field">
                {field.type === "number" && (
                  <Input
                    legend={field.label}
                    anchor={field.name}
                    placeholder="Введите значение"
                    value={String(formData[field.name]) || ""}
                    type="number"
                    min={field.min ?? undefined} // Передача min
                    max={field.max ?? undefined} // Передача max
                    isError={!!errors[field.name]} // Передача флага ошибки для класса input_error
                    onChange={(e) =>
                      handleInputChange(field.name, e.target.value)
                    }
                    onBlur={() => handleBlur(field.name)}
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
                      value={String(formData[field.name]) || ""} // Значение из состояния
                      onChange={
                        (e) => handleInputChange(field.name, e.target.value) // Обновление состояния
                      }
                    />
                  )}

                {field.type === "boolean" && (
                  <Checkbox
                    legend={field.label}
                    defaultChecked={Boolean(formData[field.name])}
                    onChange={() =>
                      handleCheckboxChange(field.name, !formData[field.name])
                    }
                  />
                )}
              </div>
            );
          })}
        </div>

        <Button className="button_primary" value="Рассчитать" type="submit" />
      </form>
    </div>
  );
}

export default CalculatorForm;
