'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [mission, setMission] = useState({
    title: '',
    description: '',
    deadline: '',
    category: '', // Added category field for the dropdown
  });

  const router = useRouter();
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const addMission = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/missions', mission);

      console.log(response.data);
      toast.success('Mission Added Successfully');
      router.push('/missions');
    } catch (error) {
      console.error('Failed to add mission:', error);
      toast.error('Failed to add mission');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { title, description, deadline, category } = mission;
    if (title && description && deadline && category) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [mission]);

  return (
    <div className='flex flex-col items-center justify-center py-12 bg-gradient-to-b from-black via-teal-950/60 to-black'>
      <h1 className='text-4xl my-4 font-semibold'>
        {isLoading ? 'Adding Mission...' : 'New Mission'}
      </h1>
      <div className='flex flex-col items-start justify-start w-[65%]'>
        <label htmlFor='title' className='text-2xl my-4 text-teal-400'>
          Title
        </label>
        <input
          id='title'
          value={mission.title}
          onChange={(e) => setMission({ ...mission, title: e.target.value })}
          type='text'
          title='Title'
          placeholder='Title'
          className='bg-transparent py-4 px-20 pl-4 border border-teal-800 rounded-lg focus:outline-none w-full'
        />
        <label htmlFor='description' className='text-2xl my-4 text-teal-400'>
          Description
        </label>
        <textarea
          id='description'
          value={mission.description}
          onChange={(e) =>
            setMission({ ...mission, description: e.target.value })
          }
          rows={5}
          cols={25}
          title='Description'
          placeholder='Description'
          className='bg-transparent py-4 px-20 pl-4 border border-teal-800 rounded-lg focus:outline-none w-full'
        />
        <label htmlFor='deadline' className='text-2xl my-4 text-teal-400'>
          Deadline
        </label>
        <input
          id='deadline'
          value={mission.deadline}
          onChange={(e) => setMission({ ...mission, deadline: e.target.value })}
          type='date'
          title='Deadline'
          placeholder='Deadline'
          className='bg-transparent py-4 px-20 border border-teal-800 rounded-lg focus:outline-none w-full'
        />
        <label htmlFor='category' className='text-2xl my-4 text-teal-400'>
          Category
        </label>
        <select
          id='category'
          value={mission.category}
          onChange={(e) => setMission({ ...mission, category: e.target.value })}
          className='bg-transparent py-4 px-20 border border-teal-800 rounded-lg focus:outline-none w-full'
        >
          <option value=''>Select Category</option>
          <option value='Web'>Web</option>
          <option value='Cloud'>Cloud</option>
          <option value='DevOps'>DevOps</option>
          <option value='ML'>ML</option>
          <option value='App'>App</option>
          <option value='IT'>IT</option>
          <option value='Security'>Security</option>
        </select>
      </div>

      <button
        onClick={addMission}
        disabled={isButtonDisabled}
        className={`${
          isButtonDisabled
            ? 'bg-teal-950 text-teal-700 cursor-not-allowed'
            : 'bg-teal-950 text-white hover:bg-black border border-teal-900 hover:border-[#616161]'
        } text-center py-4 px-20 transition-all duration-200 rounded-lg my-4 font-bold`}
      >
        {isLoading ? 'Adding...' : 'Add Mission'}
      </button>
    </div>
  );
}
