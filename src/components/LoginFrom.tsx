import { useState } from 'react';
import { default as api } from '../utils/api';
import { Link, useNavigate } from '@tanstack/react-router';
import { AxiosError, type AxiosResponse } from 'axios';
import { setSessionId } from '#/utils/auth';

export type LoginError = AxiosError & {
  response: {
    data: {
      message: string;
    };
  };
}

export type LoginResponse = AxiosResponse & {
  data: {
    sessionToken: string;
  };
}

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    api.post('/account/login', {
      email,
      password,
    }).then((response: LoginResponse) => {
      if (response.status === 200) {
        setSessionId(response.data.sessionToken);
        navigate({ to: '/dashboard' });
      }
    }).catch((error: LoginError) => {
      setLoginError(error.response.data.message);
    });
  }

  return (
    <>
      <div>
        <form className="flex flex-col p-6 gap-4 island-shell rounded-2xl">
          <input 
            type="email" 
            required
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            minLength={3}
            maxLength={50}
            className="border rounded-md p-2"
          />
          <input 
            type="password" 
            required
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            minLength={8}
            maxLength={20}
            className="border rounded-md p-2"
          />
          <button 
            type="submit" 
            onClick={handleLogin} 
            className="bg-blue-500 text-white rounded-md p-2"
          >
            Login
          </button>
          <div className="flex flex-row gap-2 justify-center">Don't have an account? <Link to="/register" className="text-blue-500">Register</Link></div>
          {loginError && <p className="text-red-500 text-center p-2">{loginError}</p>}
        </form>
      </div>
    </>
  )
}