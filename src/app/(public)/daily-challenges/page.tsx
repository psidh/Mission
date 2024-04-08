'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import DailyChallenge from '@/interfaces/DailyChallenge';


export default function Page() {
  const [dailyChallenges, setDailyChallenges] = useState<DailyChallenge[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get<{ data: DailyChallenge[] }>('/api/daily-challenges');
        setDailyChallenges(
          response.data.data.map((dailyChallenge) => ({
            ...dailyChallenge,
            deadline: new Date(dailyChallenge.deadline).toLocaleDateString(),
          }))
        );
      } catch (error) {
        console.error('Error fetching Daily Challenges:', error);
      }
    }

    fetchData();
  }, []);

  async function deleteDailyChallenges(missionId: string) {
    try {
      const response = await fetch(`/api/daily-challenges`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dailyChallenge: missionId }),
      });

      if (response.ok) {
        toast.success('dailyChallenge deleted successfully');
        setDailyChallenges((prevDailyChallenges) =>
          prevDailyChallenges.filter((dailyChallenge) => dailyChallenge._id !== missionId)
        );
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to delete dailyChallenge');
      }
    } catch (error) {
      console.error('Error deleting dailyChallenge:', error);
      toast.error('Failed to delete dailyChallenge');
    }
  }

  return (
    <div className='px-24 bg-gradient-to-b from-black via-red-950/60 to-black'>
      <Toaster />
      <div>
        <h1 className='text-6xl font-semibold'>
          Daily Challenges<span className='animate-pulse font-extrabold'>_</span>
        </h1>
        <p className='text-xl text-[#999999] mt-12'>
          Everyday a new Hit Target Agent_
        </p>
        <div className='flex items-start justify-start mt-12'>
          <a
            href='/daily-challenges/new'
            className='py-2 px-6 bg-red-700 hover:bg-red-800 border border-red-600 rounded-lg font-semibold'
          >
            New Daily Challenge
          </a>
        </div>

        {dailyChallenges.length > 0 ? (
          dailyChallenges.map((dailyChallenge, index) => (
            <div
              key={index}
              className='w-full mt-12 p-4 border border-red-500/30 rounded-xl flex flex-row items-center justify-between'
            >
              <h1 className='text-3xl mb-2'>{dailyChallenge.title}</h1>
              <h2 className='text-2xl text-white/50 mb-2'>
                Objectives: {dailyChallenge.description}
              </h2>
              <h3 className='text-xl'>Deadline: {dailyChallenge.deadline}</h3>
              <div>
                <button
                  onClick={() => deleteDailyChallenges(dailyChallenge._id)}
                  className='py-2 px-6 bg-red-700 border border-red-600 rounded-lg font-semibold'
                >
                  Abort
                </button>
              </div>
            </div>
          ))
        ) : (
          <h1 className='mt-12 flex flex-col items-center justify-center italic'>
            You can relax Agent, no dailyChallenges for now_
          </h1>
        )}
      </div>
    </div>
  );
}
