'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Training from '@/interfaces/Training';

export default function Page() {
  const [trainings, setTrainings] = useState<Training[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get<{ data: Training[] }>(
          '/api/training'
        );
        setTrainings(
          response.data.data.map((training) => ({
            ...training,
            deadline: new Date(training.deadline).toLocaleDateString(),
          }))
        );
      } catch (error) {
        console.error('Error fetching Trainings:', error);
      }
    }

    fetchData();
  }, []);

  async function deleteTraining(trainingId: string) {
    try {
      console.log(trainingId);
      
      const response = await fetch(`/api/training`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({training: trainingId} ),
      });

      if (response.ok) {
        toast.success('training deleted successfully');
        setTrainings((prevTrainings) =>
          prevTrainings.filter(
            (training) => training._id !== trainingId
          )
        );
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to delete training');
      }
    } catch (error) {
      console.error('Error deleting training:', error);
      toast.error('Failed to delete training');
    }
  }

  return (
    <div className='page bg-gradient-to-b from-black via-red-950/60 to-black'>
      <Toaster />
      <div>
        <h1 className='text-6xl font-semibold'>
          Trainings
          <span className='animate-pulse font-extrabold'>_</span>
        </h1>
        <p className='text-xl text-[#999999] mt-12'>
          Everyday a new Hit Target Agent_
        </p>
        <div className='flex items-start justify-start mt-12'>
          <a
            href='/training/new'
            className='py-2 px-6 bg-red-700 hover:bg-red-800 border border-red-600 rounded-lg font-semibold'
          >
            New Training
          </a>
        </div>

        {trainings.length > 0 ? (
          trainings.map((training, index) => (
            <div
              key={index}
              className='w-full mt-12 p-4 border border-red-500/30 rounded-xl flex flex-row items-center justify-between'
            >
              <h1 className='text-3xl mb-2'>{training.title}</h1>
              <h2 className='text-2xl text-white/50 mb-2'>
                Objectives: {training.description}
              </h2>
              <h3 className='text-xl'>Deadline: {training.deadline}</h3>
              <div>
                <button
                  onClick={() => deleteTraining(training._id)}
                  className='py-2 px-6 bg-red-700 border border-red-600 rounded-lg font-semibold'
                >
                  Abort
                </button>
              </div>
            </div>
          ))
        ) : (
          <h1 className='mt-12 flex flex-col items-center justify-center italic'>
            You can relax Agent, no trainings for now_
          </h1>
        )}
      </div>
    </div>
  );
}
