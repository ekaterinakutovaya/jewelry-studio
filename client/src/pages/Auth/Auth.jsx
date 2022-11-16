import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../../utils/consts";
import styles from "./Auth.module.scss";
import { useForm } from "react-hook-form";
import Button from "../../components/UI/Button/Button";
import { toast } from "react-toastify";
import { regUser, login, clearState } from "../../store/AuthSlice";
// import authService from "../../services/auth.service";

const Auth = () => {
  const { isError } = useSelector(state => state.auth);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    mode: "onBlur"
  });

  useEffect(() => {
    if (isError === true) {
      setErrorMessage("Неверный логин или пароль!");
    }

    return () => {
      setErrorMessage("");
    };
  }, [isError]);

  const onSubmit = async data => {
    const { username, password } = data;

    if (isLogin) {
      dispatch(login({ username, password }))
        .then(response => {
          navigate("/orders");
          // console.log(response);
        })
        .catch(() => {
          // console.log("setErrorMessage");
        });
    } else {
      dispatch(regUser({username, password}))
          .then(() => {
            navigate("/login");
          })
          .catch(() => {
            // console.log('register fail');
          })
    }
  };

  const handleInput = () => {
    if (isError === true) {
      dispatch(clearState());
    }
  };

  return (
    <div className="container">
      <div className={styles.error}>
        {errors?.username && <p>{errors?.username?.message}</p>}
      </div>
      <div className={styles.error}>
        {errors?.password && <p>{errors?.password?.message}</p>}
      </div>
      <div className={styles.loginFail}>
        <p>{errorMessage}</p>
      </div>
      <div className={styles.formWrapper}>
        <h1 style={{ textAlign: "center", fontSize: "20px" }}>
          {isLogin ? "Авторизация" : "Регистрация"}
        </h1>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            name="username"
            placeholder="логин"
            className={styles.input}
            onInput={handleInput}
            {...register("username", {
              required: "Логин не может быть пустым",
              minLength: {
                value: 5,
                message: "Логин должен быть не менее 5 символов"
              }
            })}
          />

          <input
            type="password"
            name="password"
            placeholder="пароль"
            className={styles.input}
            onInput={handleInput}
            {...register("password", {
              required: "Пароль не может быть пустым",
              minLength: {
                value: 5,
                message: "Пароль должен быть не менее 6 символов"
              }
            })}
          />
          <button className="btn btn--main btn--dark w-100" type="submit">
            {isLogin ? "Войти" : "Регистрация"}
          </button>

          {isLogin ? (
            <p className={styles.change}>
              Нет аккаунта?&nbsp;&nbsp;{" "}
              <Link to={REGISTRATION_ROUTE}>Создать</Link>
            </p>
          ) : (
            <p className={styles.change}>
              Уже есть аккаунт?&nbsp;&nbsp; <Link to={LOGIN_ROUTE}>Войти</Link>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Auth;
