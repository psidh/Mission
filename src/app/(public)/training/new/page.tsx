'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


export default function Login() {
  const [training, setTraining] = useState({
    title: '',
    description: '',
    priority : ''
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

          <p className='text-2xl my-4 text-red-400 flex justify-center items-center gap-6 '><span>Priority :</span>{training.priority !== "" && <PriorityTag txt={training.priority} setTraining={setTraining} priority={training.priority} />}</p>
        
          <div className='w-full rounded-lg border border-red-800 px-20 py-4 flex justify-center items-start gap-6 flex-wrap'>
            {
              PriorityList.map((item, index) => <PriorityTag key={index} txt={item} setTraining={setTraining} priority={training.priority}/>)
            }
            
          </div>

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


interface PriorityProps {
  txt : string,
  setTraining: React.Dispatch<React.SetStateAction<{title: string; description: string; priority: string;}>>,
  priority : string
}

const PriorityTag: React.FC<PriorityProps> = ({txt, setTraining, priority}) => {
  return (
    <p onClick={() => setTraining(prev => ({...prev, priority : txt}))} className= {`w-fit rounded-lg bg-white/20 px-4 py-1 cursor-pointer hover:scale-105 hover:transition-all hover:duration-300 hover:ring-1 hover:ring-red-300 text-white text-sm ${(priority === txt) || (priority === "") ? '' : 'opacity-50'}` }><span>{txt}</span></p>
  )
}

const PriorityList = ["Important", "Urgent", "Not Urgent", "Not Important", "Mandatory"];