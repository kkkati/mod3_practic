import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Navigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { AuthFormError, Input, Button, H2 } from "../../components";
import { setUser } from "../../actions";
import { selectUserRole } from "../../selectors";
import styled from "styled-components";
import { ROLE } from "../../constans";
import { request } from "../../utils/request";

const regFormSchema = yup.object().shape({
  login: yup
    .string()
    .required("Заполните логин")
    .matches(
      /^\w+$/,
      "Неверно заполнен логин. Допускаются только буквы и цифры"
    )
    .min(3, "Неверно заполнен логин. Минимум 3 символа")
    .max(15, "Неверно заполнен логин. Максимум 15 символов"),
  password: yup
    .string()
    .required("Заполните пароль")
    .matches(
      /^[\w#%]+$/,
      "Неверно заполнен пароль. Допускаются буквы, цифры и знаки # %"
    )
    .min(6, "Неверно заполнен пароль. Минимум 6 символа")
    .max(30, "Неверно заполнен пароль. Максимум 30 символов"),
  passcheck: yup
    .string()
    .required("Заполните повтор пароль")
    .oneOf([yup.ref("password"), null], "Повтор пароля не совпадат"),
});

const RegistrationContainer = ({ className }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
      passcheck: "",
    },
    resolver: yupResolver(regFormSchema),
  });

  const [serverError, setServerError] = useState(null);

  const dispatch = useDispatch();
  const store = useStore();
  const roleId = useSelector(selectUserRole);

  useEffect(() => {
    let currentWasLogout = store.getState().app.wasLogout;

    const unsubscribe = store.subscribe(() => {
      let previousWasLogout = currentWasLogout;
      currentWasLogout = store.getState().app.wasLogout;

      if (currentWasLogout !== previousWasLogout) {
        reset();
      }
    });
    return unsubscribe;
  }, [reset, store]);

  const onSubmit = ({ login, password }) => {
    request("/register", "POST", { login, password }).then(
      ({ error, user }) => {
        console.log(user);
        if (error) {
          console.log(login, password);
          setServerError(`Ошибка запроса: ${error}`);
          return;
        }
        dispatch(setUser(user));
        sessionStorage.setItem("userData", JSON.stringify(user));
      }
    );
  };

  const formError =
    errors?.login?.message ||
    errors?.password?.message ||
    errors?.passcheck?.message;
  const errorMessage = formError || serverError;

  if (roleId !== ROLE.GUEST) {
    return <Navigate to="/"></Navigate>;
  }

  return (
    <div className={className}>
      <H2>Регистрация</H2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Логин..."
          {...register("login", { onChange: () => setServerError(null) })}
        />
        <Input
          type="password"
          placeholder="Пароль..."
          {...register("password", { onChange: () => setServerError(null) })}
        />
        <Input
          type="password"
          placeholder="Проверка пароля..."
          {...register("passcheck", { onChange: () => setServerError(null) })}
        />
        <Button type="submit" disabled={!!formError}>
          Зарегистрироваться
        </Button>
        {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
      </form>
    </div>
  );
};

export const Registration = styled(RegistrationContainer)`
  display: flex;
  align-items: center;
  flex-direction: column;
  & > form {
    display: flex;
    flex-direction: column;
    width: 260px;
  }
`;
