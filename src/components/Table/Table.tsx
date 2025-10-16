import "../CalculatorForm/CalculatorForm.css";

import { useState } from "react";
import { table } from "../../types/Table/tableTypes";
import type { CalcResult } from "../../types/Table/calculatorTypes";
import { calculateResult as calcResultUtil } from "../../utils/Table/calculateResult";
import { useFormValidation } from "../../hooks/useFormValidation";

import Button from "../ui/button/Button";
import Input from "../ui/input/Input";
import Select from "../ui/select/Select";
import Checkbox from "../ui/checkbox/Checkbox";
import Result from "../Result/TableResult/Result";

function Table({ onBack }: { onBack: () => void }) {
  const fields = table; // Получаем конфигурацию полей для столов
  const [formData, setFormData] = useState<
    Record<string, string | number | boolean>
  >({});

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<CalcResult | null>(null);
  const { errors, validateField, hasErrors } = useFormValidation(fields);

  const handleInputChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, value: boolean) => {
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };

      // Если снимаем checkbox "shelf", очищаем поле shelfLevels, stepLength, heightFromFloor
      if (name === "shelf" && !value) {
        delete newData.shelfLevels;
        delete newData.stepLength;
        delete newData.heightFromFloor;
      }

      return newData;
    });
  };

  // Обработчик потери фокуса для валидации
  const handleBlur = (name: string) => {
    validateField(name, formData[name]);
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
            // Скрываем поля, если checkbox shelf не отмечен
            if (
              ["shelfLevels", "stepLength", "heightFromFloor"].includes(
                field.name
              ) &&
              !formData["shelf"]
            ) {
              return null;
            }

            return (
              <div key={field.name} className="form-field">
                {field.type === "number" && (
                  <Input
                    legend={field.label}
                    anchor={field.name}
                    placeholder="Введите значение"
                    value={String(formData[field.name])}
                    type="number"
                    min={field.min} // Передача min
                    max={field.max} // Передача max
                    isError={!!errors[field.name]} // Передача флага ошибки для класса input_error
                    onChange={(e) =>
                      handleInputChange(field.name, e.target.value)
                    }
                    onBlur={() => handleBlur(field.name)}
                  />
                )}

                {field.type === "select" && field.options && (
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

export default Table;
