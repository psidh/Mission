'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function page() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const verifyEmail = async () => {
    try {
      toast.loading('Hashing...');
      const token = searchParams.get('token')
      console.log(token);
      
      const response = await axios({
        method: 'post',
        url: '/api/users/verifyEmail',
        data: {token}
      });
      console.log(verifyEmail);

      if (response) {
        toast.success('Verified');
        router.push('/');
      }
    } catch (error: any) {
      toast.error('Not Verified');
      console.log(error);
    }
  };
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black via-emerald-950 to-black'>
      <Toaster />
      <button
        onClick={verifyEmail}
        className='bg-teal-950 text-white hover:bg-black border border-teal-900 hover:border-[#616161] text-center py-4 px-20 transition-all duration-200 rounded-lg my-4 font-bold'
      >
        Verify Your Identity
      </button>
    </div>
  );
}
