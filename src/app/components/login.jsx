import React, { useState, useEffect } from "react";
import TextField from "./textField";
import { validator } from "../utils/validator";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });

  const [errors, setErrors] = useState({}); // тут пришлось добавить еррор, потому что без него не работает if (Object.keys(errors).length !== 0) return; в 39-ой строке.

  const handleChange = ({ target }) => {
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
    }
  }; // это объект с объектами, содержащими требования к полям

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    // console.log(Object.keys(errors).length);
    // return Object.keys(errors).lenght === 0 || false; так не работает, всегда validate() выдает false.
  };

  const isValid2 = Object.keys(errors).lenght === 0; // почему то не работает

  const handleSubmit = (e) => {
    e.preventDefault();
    // const isValid = validate();
    // console.log({ isValid });
    // console.log(!isValid);
    validate();
    if (Object.keys(errors).length !== 0) return;
    console.log(data);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h3 className="mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
            <TextField
              label="электронная почта"
              name="email"
              value={data.email}
              onChange={handleChange}
              error={errors.email}
            />
            <TextField
              label="пароль"
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              error={errors.password}
            />
            <button type="submit" disabled={!isValid2} className={"btn btn-primary w-100 m-x auto"}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
