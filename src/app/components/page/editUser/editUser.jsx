import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SelectField from "../../common/form/selectField";
import TextField from "../../common/form/textField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { validator } from "../../../utils/validator";
import { useHistory } from "react-router-dom";
import BackHistoryButton from "../../common/backButton";
import { useSelector } from "react-redux";
import { useAuth } from "../../../hooks/useAuth";
import {
  getQualities,
  getQualitiesLoadingStatus
} from "../../../store/qualities";
import {
  getProfessions,
  getProfessionsLoadingStatus
} from "../../../store/professions";

const EditUser = ({ userId }) => {
  const history = useHistory();
  const { currentUser, updateUserData } = useAuth();
  // const { qualities, isLoading: qualitiesLoading } = useQuality(); till Redux done like this
  const qualities = useSelector(getQualities());
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
  const professions = useSelector(getProfessions());
  const professionsLoading = useSelector(getProfessionsLoadingStatus());
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [errors, setErrors] = useState({});

  const professionList = professions.map((prof) => ({
    label: prof.name,
    value: prof._id
  }));

  const qualityList = qualities.map((qual) => ({
    label: qual.name,
    value: qual._id
  }));

  // console.log(data);
  // console.log(professions, professionsLoading);
  // console.log(qualities, qualitiesLoading);

  const getQualitiesById = (qualitIds) => {
    const resultArray = [];
    for (const ids of qualitIds) {
      for (const quality of qualities) {
        if (ids === quality._id) {
          resultArray.push(quality);
          break;
        }
      }
    }
    return resultArray;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    await updateUserData({
      ...data,
      qualities: data.qualities.map((qual) => qual.value)
    });
    history.push(`/users/${userId}`);
  };

  const transformData = (data) =>
    getQualitiesById(data).map((qual) => ({
      label: qual.name,
      value: qual._id
    }));

  useEffect(() => {
    if (!professionsLoading && !qualitiesLoading && currentUser && !data) {
      setData({
        ...currentUser,
        qualities: transformData(currentUser.qualities)
      });
    }
    console.log(qualities, qualitiesLoading);
  }, [professionsLoading, qualitiesLoading, currentUser, data]);

  useEffect(() => {
    if (data && isLoading) setIsLoading(false);
  }, [data]);

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
    name: {
      isRequired: {
        message: "Имя обязателено для заполнения"
      },
      isCapitalSymbol: {
        message: "Имя должено содержать хотя бы одну заглавную букву"
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

  return (
    <>
      {
        <div className="container mt-5">
          <BackHistoryButton />
          <div className="row mt-2">
            <div className="col-md-6 offset-md-3 shadow p-4">
              {!isLoading && Object.keys(professions).length > 0 ? (
                <form onSubmit={handleSubmit}>
                  <h3 className="mb-4">Изменение данных о пользователе</h3>
                  <TextField
                    label="Имя"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    error={errors.name}
                  />
                  <TextField
                    label="Электронная почта"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    error={errors.email}
                  />
                  <SelectField
                    label="Выберите вашу профессию"
                    defaultOption="Choose"
                    name="profession"
                    onChange={handleChange}
                    value={data.profession} // первый способ указать value={user.profession._id}, но он вроде не работает
                    options={professionList}
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
                    value={data.sex}
                    onChange={handleChange}
                  />
                  <MultiSelectField
                    options={qualityList}
                    onChange={handleChange}
                    defaultValue={data.qualities}
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
                </form>
              ) : (
                "Loading 134..."
              )}
            </div>
          </div>
        </div>
      }
    </>
  );
};

EditUser.propTypes = {
  userId: PropTypes.string.isRequired
};

export default EditUser;
