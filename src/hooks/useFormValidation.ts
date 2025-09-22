import { useState } from 'react';
import type { Errors } from '../components/CalculatorForm/types';
import type { Field } from '../components/CalculatorForm/formTypes';

export const useFormValidation = (fields: Field[]) => {
  const [errors, setErrors] = useState<Errors>({});

  const validateField = (name: string, value: string | number) => {
    const field = fields.find((f) => f.name === name);
    if (field?.type === 'number' && (field.min !== undefined || field.max !== undefined)) {
      const numValue = Number(value);
      const outOfRange = (field.min !== undefined && numValue < field.min) || (field.max !== undefined && numValue > field.max);
      setErrors((prev: Errors) => ({
        ...prev,
        [name]: outOfRange && value !== '' ? `Значение должно быть от ${field.min ?? 0} до ${field.max ?? Infinity}` : '',
      }));
    } else {
      setErrors((prev: Errors) => ({ ...prev, [name]: '' }));
    }
  };

  const hasErrors = () => Object.values(errors).some((error) => error !== '');

  return { errors, setErrors, validateField, hasErrors };
};;