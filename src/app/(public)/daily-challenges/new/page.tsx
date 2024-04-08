'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [dailyChallenge, setDailyChallenge] = useState({
    title: '',
    description: '',
  });

  const router = useRouter();
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const addMission = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        '/api/daily-challenges',
        dailyChallenge
      );
      console.log(response.data);
      toast.success('Mission Added Successfully');
      router.push('/daily-challenges');
    } catch (error) {
      console.error('Failed to add dailyChallenge:', error);
      toast.error('Failed to add dailyChallenge');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { title, description } = dailyChallenge;
    if (title && description) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [dailyChallenge]);

  return (
    <div className='flex flex-col items-center justify-center py-12 bg-gradient-to-b from-black via-red-950/60 to-black'>
      <h1 className='text-4xl my-4 font-semibold'>
        {isLoading ? 'Adding Mission...' : 'New Daily Challenge'}
      </h1>
      <div className='flex flex-col items-start justify-start w-[65%]'>
        <label htmlFor='title' className='text-2xl my-4 text-red-400'>
          Title
        </label>
        <input
          id='title'
          value={dailyChallenge.title}
          onChange={(e) =>
            setDailyChallenge({ ...dailyChallenge, title: e.target.value })
          }
          type='text'
          title='Title'
          placeholder='Title'
          className='bg-transparent py-4 px-20 pl-4 border border-red-800 rounded-lg focus:outline-none w-full'
        />
        <label htmlFor='description' className='text-2xl my-4 text-red-400'>
          Description
        </label>
        <textarea
          id='description'
          value={dailyChallenge.description}
          onChange={(e) =>
            setDailyChallenge({
              ...dailyChallenge,
              description: e.target.value,
            })
          }
          rows={5}
          cols={25}
          title='Description'
          placeholder='Description'
          className='bg-transparent py-4 px-20 pl-4 border border-red-800 rounded-lg focus:outline-none w-full'
        />
      </div>

      <button
        onClick={addMission}
        disabled={isButtonDisabled}
        className={`${
          isButtonDisabled
            ? 'bg-red-950 text-red-700 cursor-not-allowed'
            : 'bg-red-950 text-white hover:bg-black border border-red-900 hover:border-[#616161]'
        } text-center py-4 px-20 transition-all duration-200 rounded-lg my-4 font-bold`}
      >
        {isLoading ? 'Adding...' : 'Add Daily Challenge'}
      </button>
    </div>
  );
}
