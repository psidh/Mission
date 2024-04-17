'use client';
import axios from 'axios';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const logout = async () => {
    try {
      const response = await axios.get('/api/users/logout');
      console.log(response);

      toast.success('Logged out successfully');
      router.push('/auth/login');
    } catch (error) {}
  };
  return (
    <div>
      <Toaster />
      <div className='bg-transparent px-24 backdrop-blur-xl bg-opacity-20 flex justify-between py-12 text-lg'>
        <h1 className='flex justify-between items-center'>Intercept</h1>
        <div className='space-x-8 flex justify-between items-center'>
          <Link href={'/home'} className=''>
            Home
          </Link>
          <Link
            href={'/missions'}
            className='py-2 px-6 rounded-lg bg-[#212121] border border-white/20 text-white text-sm'
          >
            Missions
          </Link>
          <Link
            href={'/training'}
            className='py-2 px-6 rounded-lg bg-[#212121] border border-white/20 text-white text-sm'
          >
            Daily Challenges
          </Link>
          <Link
            href={'/streak'}
            className='py-2 px-6 rounded-lg bg-[#212121] border border-white/20 text-white text-sm'
          >
            Streak
          </Link>
          <button
            onClick={logout}
            className='py-2 px-6 rounded-lg bg-red-700 border border-white/20 text-white text-sm'
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
