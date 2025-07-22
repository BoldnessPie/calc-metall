import "./CalculatorForm.css";
import { useState } from "react";
import { formConfigs } from "./formTypes";
import Button from "../ui/button/Button";
import Input from "../ui/input/Input";
import Radio from "../ui/radio/Radio";
import Select from "../ui/select/Select";

function CalculatorForm({
  category,
  onBack,
}: {
  category: string;
  onBack: () => void;
}) {
  const fields = formConfigs[category];
  const [formData, setFormData] = useState<Record<string, any>>({});

  // Поля, которые лучше отобразить как radio кнопки (мало вариантов)
  const radioFields = ["loadingSide", "material"];

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Данные для расчета:", formData);
    alert("Расчет выполнен! Смотри консоль.");
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="calculator-form">
        <div className="form__back">
          <Button
            className="button_alternate"
            value="← Назад к выбору категории"
            onClick={onBack}
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
                  onChange={(e) =>
                    handleInputChange(field.name, e.target.value)
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
                          defaultChecked={formData[field.name] === option}
                          onChange={() => handleRadioChange(field.name, option)}
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
                    value={formData[field.name]}
                    onChange={(e) =>
                      handleInputChange(field.name, e.target.value)
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
