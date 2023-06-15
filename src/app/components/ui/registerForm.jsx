import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import SelectField from "../common/form/selectField";
import TextField from "../common/form/textField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useQuality } from "../../hooks/useQuality";
import { useProfession } from "../../hooks/useProfession";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
  const history = useHistory();

  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "",
    qualities: [],
    licence: false
  });

  const { signUp } = useAuth();

  const { professions } = useProfession();

  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id
  }));

  const [errors, setErrors] = useState({});

  const { qualities } = useQuality();

  const qualitiesList = qualities.map((q) => ({ label: q.name, value: q._id }));

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Email введен некорректно"
      }
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения"
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву"
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одно число"
      },
      min: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8
      }
    },
    profession: {
      isRequired: {
        message: "Обязательно введите вашу профессию"
      }
    },
    sex: {
      isRequired: {
        message: "Требуется указать ваш пол"
      }
    },
    licence: {
      isRequired: {
        message:
          "Вы не можите использовать наш сервис без подтвреждения лицензионного соглашения"
      }
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const newData = { ...data, qualities: data.qualities.map((q) => q.value) };
    // console.log(newData);
    try {
      await signUp(newData);
      history.push("/");
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <SelectField
        label="Выберите свою профессию"
        defaultOption="Choose..."
        name="profession"
        options={professionsList}
        onChange={handleChange}
        value={data.profession}
        error={errors.profession}
      />
      <RadioField
        label="Выберите ваш пол"
        name="sex"
        options={[
          { name: "Male", value: "male" },
          { name: "Female", value: "female" },
          { name: "Other", value: "other" }
        ]}
        onChange={handleChange}
        value={data.sex}
        error={errors.sex}
      />
      <MultiSelectField
        options={qualitiesList}
        onChange={handleChange}
        defaultValue={data.qualities}
        name="qualities"
        label="Выберите ваши качества"
      />
      <CheckBoxField
        value={data.licence}
        onChange={handleChange}
        name="licence"
        error={errors.licence}
      >
        Подтвердить <a>лицензионное соглашение</a>
      </CheckBoxField>
      <button
        className="btn btn-primary w-100 mx-auto"
        type="submit"
        disabled={!isValid}
      >
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
