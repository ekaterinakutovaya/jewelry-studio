import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "@/utils/consts";
import { regUser, login } from "@/store/AuthSlice";
import { Button, Spinner } from "@/components";
import Logo from "@/assets/Mozaic.webp";

export const Auth = () => {
  const { loading } = useSelector(state => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const dispatch = useDispatch();
  const { register, formState: { errors }, handleSubmit } = useForm({ mode: "onBlur" });
 

  const onSubmit = async data => {
    const { username, password } = data;

    if (isLogin) {
      dispatch(login({ username, password }))
        .then(response => {
          if (response.payload === 'ERR_NETWORK') {
            toast.error("Ошибка сети", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 5000
            });
            return;
          }
          if (response.payload === 'ERR_BAD_REQUEST') {
            toast.error("Неверный логин или пароль", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 5000
            });
            return;
          }
          navigate("/orders");
        })
    } else {
      dispatch(regUser({ username, password }))
        .then(response => {
          console.log(response);
          
          if (response.payload === 'ERR_NETWORK') {
            toast.error("Ошибка сети", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 5000
            });
            return;
          }

          toast.success(`${response.payload}`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000
          });
          navigate("/login");
        })
    }
  };


  return (
    <div className='h-screen'>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src={Logo}
              alt="Yuliya Studio"
            />

            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              {isLogin ? "Войдите в аккаунт" : "Регистрация"}
            </h2>
          </div>

          <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="username" className="sr-only">
                  Логин
                </label>
                <input
                  name="username"
                  type="text"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-4 md:py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-purple-500 focus:outline-none focus:ring-purple-500 md:text-sm"
                  placeholder="логин"
                  {...register("username", {
                    required: "Логин не может быть пустым",
                    minLength: {
                      value: 5,
                      message: "Логин должен быть не менее 5 символов"
                    }
                  })}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Пароль
                </label>
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-4 md:py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-purple-500 focus:outline-none focus:ring-purple-500 md:text-sm"
                  placeholder="пароль"
                  {...register("password", {
                    required: "Пароль не может быть пустым",
                    minLength: {
                      value: 5,
                      message: "Пароль должен быть не менее 5 символов"
                    }
                  })}
                />
              </div>
            </div>

            <div className="flex justify-center w-full">
              {isLogin ? (
                <Button type="dark">
                  {loading ? (
                    <Spinner color={'text-white'} />
                  ) : ''}
                  Вход
                </Button>
              ) : (
                <Button type="dark">
                  {loading ? (
                    <Spinner color={'text-white'} />
                  ) : ''}
                  Регистрация
                </Button>
              )}

            </div>

            {/*<div className="text-sm">*/}
            {/*  {isLogin ? (*/}
            {/*    <p className="">*/}
            {/*      Нет аккаунта?&nbsp;&nbsp;{" "}*/}
            {/*      <Link className="font-medium text-purple-600 hover:text-purple-500" to={REGISTRATION_ROUTE}>Создать</Link>*/}
            {/*    </p>*/}
            {/*  ) : (*/}
            {/*    <p className="">*/}
            {/*      Уже есть аккаунт?&nbsp;&nbsp; <Link className="font-medium text-purple-600 hover:text-purple-500" to={LOGIN_ROUTE}>Войти</Link>*/}
            {/*    </p>*/}
            {/*  )}*/}
            {/*</div>*/}

            <div className="">
              <div className="mt-2 h-4 text-center text-sm text-red-600">
                {errors?.username && <p>{errors?.username?.message}</p>}
              </div>
              <div className="mt-2 h-4 text-center text-sm text-red-600">
                {errors?.password && <p>{errors?.password?.message}</p>}
              </div>
            </div>


          </form>
        </div>
      </div >

    </div >
  );
};






