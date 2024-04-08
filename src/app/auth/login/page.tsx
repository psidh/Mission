'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
export default function Login() {
  const [user, setUser] = useState<any>({
    email: '',
    password: '',
  });

  const router = useRouter();
  const [isButtonDisabled, setButtonDisabled] = useState<Boolean>(true);
  const [isLoading, setLoading] = useState<Boolean>(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      toast.loading('Retriving Data...');
      const response = await axios({
        method: 'post',
        url: '/api/users/login',
        data: user,
      });

      console.log(response.data);
      toast.success('Verified Successfully');
      router.push('/home')
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
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black via-blue-950/60 to-black'>
      <h1 className='text-4xl my-4 font-semibold'>
        {isLoading ? 'Decrypting credentials...' : 'Welcome back Agent'}
      </h1>
      <div className='flex flex-col items-start justify-start'>
        <label htmlFor='Email' className='text-2xl my-4 text-blue-400'>
          Email
        </label>
        <input
          id='email'
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          type='text'
          title='Email'
          placeholder='Email'
          className='bg-transparent py-4 px-20 pl-4 border border-blue-800 rounded-lg focus:outline-none'
        />
        <label htmlFor='password' className='text-2xl my-4 text-blue-400'>
          Password
        </label>
        <input
          id='password'
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          type='text'
          title='password'
          placeholder='password'
          className='bg-transparent py-4 px-20 pl-4 border border-blue-800 rounded-lg focus:outline-none'
        />
      </div>

      <a
        href='/auth/signup'
        className='text-blue-400 mt-4 mb-2'
      >
        New Member? SignUp Here
      </a>

      {isButtonDisabled ? (
        <button className='bg-blue-950 text-blue-700 text-center py-4 px-20 transition-all duration-200 rounded-lg my-4 font-bold'>
          Disabled
        </button>
      ) : (
        <button
          onClick={onLogin}
          className='bg-blue-950 text-white hover:bg-black border border-blue-900 hover:border-[#616161] text-center py-4 px-20 transition-all duration-200 rounded-lg my-4 font-bold'
        >
          Run the Server
        </button>
      )}
    </div>
  );
}
