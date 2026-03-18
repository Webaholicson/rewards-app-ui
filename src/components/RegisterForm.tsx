import { useState } from 'react';
import { default as api } from '../utils/api';
import { Link, useNavigate } from '@tanstack/react-router';
import { AxiosError, type AxiosResponse } from 'axios';
import { setSessionId } from '#/utils/auth';

export type RegisterError = AxiosError & {
  response: {
    data: {
      message: string;
    };
  };
}

export type RegisterResponse = AxiosResponse & {
  data: {
    sessionToken: string;
  };
}

export default function RegisterForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerError, setRegisterError] = useState('');

  const navigate = useNavigate();

  const handleRegister = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setRegisterError('Passwords do not match');
      return;
    }

    api.post('/account/signup', {
      firstName,
      lastName,
      email,
      password,
    }).then((response: RegisterResponse) => {
      if (response.status === 200) {
        setSessionId(response.data.sessionToken);
        navigate({ to: '/dashboard' });
      }
    }).catch((error: RegisterError) => {
      setRegisterError(error.response.data.message);
    });
  }

  return (
    <>
      <div>
        <form onSubmit={handleRegister} className="flex flex-col p-6 gap-4 island-shell rounded-2xl">
          <input 
            type="text" 
            required
            placeholder="First Name" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            minLength={3}
            maxLength={50}
            className="border rounded-md p-2"
          />
          <input 
            type="text" 
            required
            placeholder="Last Name" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
            minLength={3}
            maxLength={50}
            className="border rounded-md p-2"
          />
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
          <input 
            type="password" 
            required
            placeholder="Confirm Password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            minLength={8}
            maxLength={20}
            className="border rounded-md p-2"
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white rounded-md p-2"
          >
            Register
          </button>
          <div className="flex flex-row gap-2 justify-center">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></div>
          {registerError && <p className="text-red-500 text-center p-2">{registerError}</p>}
        </form>
      </div>
    </>
  )
}