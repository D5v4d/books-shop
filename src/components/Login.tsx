import { useDispatch, useSelector } from 'react-redux';
import '../styles/login.css';
import React, { useState } from 'react';
import { AppDispatch, RootState } from '../redux/store';
import { addToken, tokensActive, upActiveLogin } from '../redux/slice/authorizationSlice';
import { upToken } from '../redux/slice/basketSlice';

async function fetchLogin(email: string, password: string) {
  const url = `/api/auth`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch books: ${response.status}`);
    }

    const data = await response.json();
    return {
      token: data.token,
      email: data.email,
      password: data.password,
      expiresAt: data.expiresAt,
    };
  } catch (error) {
    console.error("Error fetching books:", error);
    return null;
  }
}

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const authorizationActive = useSelector((state: RootState) => (state.authorization.tokens));

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(emailRegex.test(value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setIsPasswordValid(value.length >= 6);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const clearing = () => {
      setEmail("");
      setPassword("");
      dispatch(upActiveLogin())
    }

    // Проверка пароля пользователя
    const userPasswordVerification = authorizationActive.find(
      (token) => token.email === email && token.password !== password
    );

    // Проверяем сушествует ли пользователь
    const userVerification = authorizationActive.find(
      (token) => token.email === email && token.password == password
    );

    if (userPasswordVerification) {
      setIsPasswordValid(false);
      return;
    }
    if (userVerification) {
      dispatch(tokensActive(userVerification.token));
      dispatch(upToken(userVerification.token))

      clearing()
      return;
    }
    // Если всё ок — продолжаем логин
    const result = await fetchLogin(email, password);

    if (result) {
      dispatch(addToken(result)); // Сохраняем или обновляем токен
      dispatch(upToken(result.token))
      clearing()
    }
  };

  return (
    <form onSubmit={handleSubmit}
      className="flex flex-col pt-[17px] pl-[26px] pb-[36px] pr-[39px] custom-shadow absolute w-[241px] h-[312px] bg-white z-1 mt-[29px] ml-[-116px]">
      <h1 className="text-center text-[#1C2A39] font-bold">Log in</h1>

      <label htmlFor="email" className="block mb-[9px] font-bold text-[12px]">
        Email
      </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="example@email.com"
        className={`h-[35px] p-2.5 border focus:outline-none text-[#4C3DB2] font-bold text-[12px]
          ${isEmailValid ? 'border-[#4C3DB2]' : 'border-[#FF353A] text-[#FF353A]'}
        `}
        required
      />
      {!isEmailValid && (
        <p className="text-[#FF353A] font-bold mt-[4px] text-[8px]">
          Please enter a valid email address
        </p>
      )}

      <label htmlFor="password" className="block mb-[8px] mt-[15px] font-bold text-[12px]">
        Password
      </label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="********"
        className={`h-[35px] p-2.5 border focus:outline-none ${isPasswordValid ? 'border-[#4C3DB2] text-[#4C3DB2]' : 'border-[#FF353A] text-[#FF353A]'
          }`}
        required
      />

      {!isPasswordValid && (
        <p className="text-[#FF353A] font-bold mt-[9px] text-[8px]">
          Your password must be at least 6 characters long
        </p>
      )}

      <button
        type="submit"
        className={`absolute cursor-pointer mt-[228px] px-[62px] pt-[2px] text-white font-bold text-[14px] h-[32px] ${isPasswordValid && isEmailValid && email.trim() && password.length
          ? 'bg-purple-500 hover:bg-purple-600'
          : 'bg-[#9E98DC]'
          }`}
        disabled={!isPasswordValid || !isEmailValid || !email.trim()}
      >
        LOG IN
      </button>
    </form>
  );
};

export default LoginForm;