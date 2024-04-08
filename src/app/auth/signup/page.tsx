'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
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
      const response = await axios({
        method: 'post',
        url: '/api/users/signup',
        data: user
      });

      console.log(response.data);
      toast.success('Success | 200');
      router.push('/auth/login');
    } catch (error: any) {
      console.log('SignUp failed');
    }
  };

  useEffect(() => {
    if (user.email !== '' && user.password !== '' && user.username !== '') {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black via-emerald-950 to-black'>
      <Toaster />
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
          onChange={(e) => setUser({ ...user, username: e.target.value })}
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
          onChange={(e) => setUser({ ...user, email: e.target.value })}
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
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          type='password'
          title='password'
          placeholder='password'
          className='bg-transparent py-4 px-20 pl-4 border border-teal-800 rounded-lg focus:outline-none'
        />
      </div>

      {isButtonDisabled ? (
        <button className='bg-teal-950 text-teal-700 text-center py-4 px-20 transition-all duration-200 rounded-lg my-4 font-bold'>
          Disabled
        </button>
      ) : (
        <button
          onClick={onSignUp}
          className='bg-teal-950 text-white hover:bg-black border border-teal-900 hover:border-[#616161] text-center py-4 px-20 transition-all duration-200 rounded-lg my-4 font-bold'
        >
          Run the Server
        </button>
      )}
    </div>
  );
}
