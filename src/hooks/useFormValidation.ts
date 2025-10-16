import { useState } from "react";
import type { Errors, Field } from "../types/generalTypes";

export const useFormValidation = (fields: Field[]) => {
  const [errors, setErrors] = useState<Errors>({});

  const validateField = (name: string, value: string | number | boolean) => {
    const field = fields.find((f) => f.name === name);

    // Не валидируем boolean поля
    if (field?.type === "boolean") {
      return;
    }

    if (
      field?.type === "number" &&
      (field.min !== undefined || field.max !== undefined)
    ) {
      const numValue = Number(value);
      const outOfRange =
        (field.min !== undefined && numValue < field.min) ||
        (field.max !== undefined && numValue > field.max);
      setErrors((prev: Errors) => ({
        ...prev,
        [name]:
          outOfRange && value !== ""
            ? `Значение должно быть от ${field.min ?? 0} до ${
                field.max ?? Infinity
              }`
            : "",
      }));
    } else {
      setErrors((prev: Errors) => ({ ...prev, [name]: "" }));
    }
  };

  const hasErrors = () => Object.values(errors).some((error) => error !== "");

  return { errors, setErrors, validateField, hasErrors };
};
