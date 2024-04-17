'use client';
import axios from 'axios';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';

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

  const [isOpen, setOpen] = useState(false);

  const openNav = () => {
    setOpen(!isOpen);
  };
  return (
    <div>
      <Toaster />
      <div className=' w-full flex justify-between items-center px-12 py-12 md:py-12 md:px-24 text-lg'>
        <h1 className=''>Mission</h1>
        <div className='justify-center space-x-8  hidden lg:flex items-center'>
          <Link href={'/home'} className='linker'>
            Home
          </Link>
          <Link href={'/missions'} className='linker'>
            Missions
          </Link>
          <Link href={'/training'} className='linker'>
            Training
          </Link>
          <Link href={'/bullets'} className='linker'>
            Bullets
          </Link>
          <button
            onClick={logout}
            className='py-2 px-6 rounded-lg bg-red-700 border border-white/20 text-white text-sm'
          >
            Logout
          </button>
        </div>
        <FiMenu className='flex lg:hidden' onClick={openNav} />
      </div>
      {isOpen && (
        <div className='flex flex-col lg:hidden justify-between items-start space-y-8 px-8'>
          <Link href={'/home'} className=''>
            Home
          </Link>
          <Link href={'/missions'} className='linker'>
            Missions
          </Link>
          <Link href={'/training'} className='linker'>
            Training
          </Link>
          <Link href={'/bullets'} className='linker'>
            Bullets
          </Link>
          <button
            onClick={logout}
            className='py-2 px-6 rounded-lg bg-red-700 border border-white/20 text-white text-sm'
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
