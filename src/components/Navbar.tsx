'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const link = usePathname();

  return (
    <div>
      <div className='bg-transparent px-24 backdrop-blur-md bg-opacity-20 flex justify-between py-12 text-lg'>
        <h1 className='flex justify-between items-center'>
          Global Center
        </h1>
        <div className='space-x-8 flex justify-between items-center'>
          <Link href={'/'} className=''>
            Home
          </Link>
          <Link href={'/missions'} className='py-2 px-6 rounded-lg bg-teal-900 border border-teal-400 text-white'>
            Missions
          </Link>
          <Link href={'/'} className='py-2 px-6 rounded-lg bg-red-900 border border-red-400 text-white'>
            DeadZone
          </Link>
        </div>
      </div>
    </div>
  );
}
