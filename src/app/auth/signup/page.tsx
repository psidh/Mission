'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
export default function SignPage() {
  const [user, setUser] = useState<any>({
    email: '',
    password: '',
    username: '',
  });

  const router = useRouter();
  const [isButtonDisabled, setButtonDisabled] = useState<Boolean>(true);
  const [isLoading, setLoading] = useState<Boolean>(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      toast.loading('Server running remotely...');
      const response = await axios.post('/api/users/signup');

      console.log(response.data);
      toast.success('Success | 200');
      router.push('/login');
    } catch (error: any) {
      console.log('SignUp failed');
    }
  };

  useEffect(() => {
    if (user.email > 0 && user.password > 0 && user.username > 0) {
      setButtonDisabled(false);
    }
  }, [user]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black via-emerald-950 to-black'>
      <h1 className='text-4xl my-4 font-semibold'>
        {isLoading ? 'Encoding to Server...' : 'Become Top 1%'}
      </h1>
      <div className='flex flex-col items-start justify-start'>
        <label htmlFor='username' className='text-2xl my-4 text-teal-400'>
          Username
        </label>
        <input
          id='username'
          value={user.username}
          onChange={(e) => ({ ...user, username: e.target.value })}
          type='text'
          title='username'
          placeholder='username'
          className='bg-transparent py-4 px-20 pl-4 border border-teal-800 rounded-lg focus:outline-none font-bold'
        />
        <label htmlFor='Email' className='text-2xl my-4 text-teal-400'>
          Email
        </label>
        <input
          id='email'
          value={user.email}
          onChange={(e) => ({ ...user, email: e.target.value })}
          type='text'
          title='Email'
          placeholder='Email'
          className='bg-transparent py-4 px-20 pl-4 border border-teal-800 rounded-lg focus:outline-none'
        />
        <label htmlFor='password' className='text-2xl my-4 text-teal-400'>
          Password
        </label>
        <input
          id='password'
          value={user.password}
          onChange={(e) => ({ ...user, password: e.target.value })}
          type='text'
          title='password'
          placeholder='password'
          className='bg-transparent py-4 px-20 pl-4 border border-teal-800 rounded-lg focus:outline-none'
        />
      </div>
      
      {isButtonDisabled ? (
        <button className='bg-teal-950 text-teal-700 text-center py-4 px-20 pl-4transition-all duration-200 rounded-lg my-4 font-bold'>
          Disabled
        </button>
      ) : (
        <button className='bg-teal-950 text-white text-center py-4 px-20 pl-4 hover:bg-teal-600 transition-all duration-200 rounded-lg my-4 font-bold'>
          Run the Server
        </button>
      )}
    </div>
  );
}
