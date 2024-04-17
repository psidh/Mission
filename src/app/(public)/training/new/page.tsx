'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [training, setTraining] = useState({
    title: '',
    description: '',
  });

  const router = useRouter();
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const addMission = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/training', training);
      console.log(response.data);
      toast.success('Mission Added Successfully');
      router.push('/training');
    } catch (error) {
      console.error('Failed to add training:', error);
      toast.error('Failed to add training');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { title, description } = training;
    if (title && description) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [training]);

  return (
    <div className='flex flex-col items-center justify-center py-12 bg-gradient-to-b from-black via-red-950/60 to-black'>
      <h1 className='text-4xl my-4 font-semibold'>
        {isLoading ? 'Adding Mission...' : 'New Training'}
      </h1>
      <div className='flex flex-col items-start justify-start w-[80%] md:w-[65%]'>
        <label htmlFor='title' className='text-2xl my-4 text-red-400'>
          Training
        </label>
        <input
          id='title'
          value={training.title}
          onChange={(e) =>
            setTraining({ ...training, title: e.target.value })
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
          value={training.description}
          onChange={(e) =>
            setTraining({
              ...training,
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
