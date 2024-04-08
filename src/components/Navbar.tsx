'use client'
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
      router.push('/auth/login')
    } catch (error) {}
  };
  return (
    <div>
      <Toaster />
      <div className='bg-transparent px-24 backdrop-blur-md bg-opacity-20 flex justify-between py-12 text-lg'>
        <h1 className='flex justify-between items-center'>Global Center</h1>
        <div className='space-x-8 flex justify-between items-center'>
          <Link href={'/'} className=''>
            Home
          </Link>
          <Link
            href={'/missions'}
            className='py-2 px-6 rounded-lg bg-teal-900 border border-teal-400 text-white'
          >
            Missions
          </Link>
          <button
            onClick={logout}
            className='py-2 px-6 rounded-lg bg-red-900 border border-red-400 text-white'
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
