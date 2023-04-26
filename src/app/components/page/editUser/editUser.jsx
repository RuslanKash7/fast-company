import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SelectField from "../../common/form/selectField";
import TextField from "../../common/form/textField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import api from "../../../api";
import { validator } from "../../../utils/validator";
import { useHistory } from "react-router-dom";

const EditUser = ({ userId }) => {
  const history = useHistory();

  const [user, setUser] = useState({
    name: "",
    email: "",
    profession: "",
    sex: "",
    qualities: []
  });

  const [professions, setProfession] = useState();

  const [errors, setErrors] = useState({});

  const [qualities, setQualities] = useState([]);

  // console.log(user);
  // console.log(professions);
  // console.log(qualities);

  useEffect(() => {
    api.users.getById(userId).then((data) =>
      setUser((prevState) => ({
        ...prevState,
        ...data, // приводим полученные данные из АПИ к требуемому виду
        profession: data.profession._id,
        qualities: data.qualities.map((qual) => ({
          label: qual.name,
          value: qual._id
        }))
      }))
    ); // а если использовать fetchAll() то прийдет весь массив юзеров. и второй способ вместо value={user.profession._id}
    api.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }));
      setProfession(professionsList);
    });

    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        label: data[optionName].name,
        value: data[optionName]._id,
        color: data[optionName].color
      }));
      setQualities(qualitiesList);
    });
  }, []);

  const handleChange = (target) => {
    setUser((prevState) => ({
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
    name: {
      isRequired: {
        message: "Имя обязателено для заполнения"
      },
      isCapitalSymbol: {
        message: "Имя должено содержать хотя бы одну заглавную букву"
      }
      // isContainDigit: {
      //   message: "Имя должено содержать хотя бы одно число"
      // },
      // min: {
      //   message: "Имя должено состоять минимум из 8 символов",
      //   value: 8
      // }
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
    }
  };

  useEffect(() => {
    validate();
  }, [user]);

  const validate = () => {
    const errors = validator(user, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const { profession, qualities } = user;
    api.users
      .update(userId, {
        ...user,
        profession: getProfessionById(profession),
        qualities: getQualities(qualities)
      })
      .then(() => {
        history.push(`/users/${userId}`);
      }); // запись введенных нами в форме данных
  };

  const getProfessionById = (id) => {
    // эти функции возвращают наши данные к изначальному виду
    for (const prof of professions) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label };
      }
    }
  };

  const getQualities = (elements) => {
    // эти функции возвращают наши данные к изначальному виду
    const qualitiesArray = [];
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color
          });
        }
      }
    }
    return qualitiesArray;
  };

  if (user._id && professions && qualities) {
    return (
      <>
        {
          <form onSubmit={handleSubmit}>
            <div className="container mt-5">
              <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                  <h3 className="mb-4">Изменение данных о пользователе</h3>
                  <TextField
                    label="Имя"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    error={errors.name}
                  />
                  <TextField
                    label="Электронная почта"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    error={errors.email}
                  />
                  <SelectField
                    label="Выберите вашу профессию"
                    defaultOption={user.profession.name}
                    name="profession"
                    onChange={handleChange}
                    value={user.profession} // первый способ указать value={user.profession._id}, но он вроде не работает
                    options={professions}
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
                    value={user.sex}
                    onChange={handleChange}
                  />
                  <MultiSelectField
                    options={qualities}
                    onChange={handleChange}
                    defaultValue={user.qualities}
                    name="qualities"
                    label="Выберите ваши качества"
                  />
                  <button
                    className="btn btn-primary w-100 mx-auto"
                    type="submit"
                    disabled={!isValid}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        }
      </>
    );
  } else {
    return "loading...";
  }
};

EditUser.propTypes = {
  userId: PropTypes.string.isRequired
};

export default EditUser;
