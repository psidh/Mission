'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Mission from '@/interfaces/Mission';


export default function Page() {
  const [missions, setMissions] = useState<Mission[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get<{ data: Mission[] }>('/api/missions');
        setMissions(
          response.data.data.map((mission) => ({
            ...mission,
            deadline: new Date(mission.deadline).toLocaleDateString(),
          }))
        );      
      } catch (error) {
        console.error('Error fetching missions:', error);
      }
    }

    fetchData();
  }, []);

  async function deleteMission(missionId: string) {
    try {
      const response = await fetch(`/api/missions`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mission: missionId }),
      });

      if (response.ok) {
        toast.success('Mission deleted successfully');
        setMissions((prevMissions) =>
          prevMissions.filter((mission) => mission._id !== missionId)
        );
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to delete mission');
      }
    } catch (error) {
      console.error('Error deleting mission:', error);
      toast.error('Failed to delete mission');
    }
  }

  async function completeMission(missionId: string) {
    try {
      const response = await fetch(`/api/missions`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mission: missionId }),
      });

      if (response.ok) {
        toast.success('Mission Updated successfully');
        setMissions((prevMissions) =>
          prevMissions.filter((mission) => mission._id !== missionId)
        );
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to updated mission');
      }
    } catch (error) {
      console.error('Error updated mission:', error);
      toast.error('Failed to updated mission');
    }
  }

  return (
    <div className='px-24 min-h-screen bg-gradient-to-b from-black via-teal-950/60 to-black'>
      <Toaster />
      <div>
        <h1 className='text-6xl font-semibold'>
          Missions<span className='animate-pulse font-extrabold'>_</span>
        </h1>
        <p className='text-xl text-[#999999] mt-12'>
          Your commitments to being an assassin is your lifeline Agent!
        </p>
        <p className='text-xl text-[#999999] mt-2'>
          {' '}
          <span className='text-red-500'>Beware</span> to complete them, as your
          client won't be pleased with unsuccessful commitments ☠️
          <span className='animate-pulse font-extrabold text-xl'>|</span>{' '}
        </p>
        <div className='flex items-start justify-start mt-12'>
          <a
            href='/missions/new'
            className='py-2 px-6 bg-teal-700 border border-teal-600 rounded-lg font-semibold'
          >
            New Mission
          </a>
        </div>

        {missions.length > 0 ? (
          missions.map((mission, index) => (
            <div
              key={index}
              className='w-full mt-12 p-4 border border-teal-500/30 rounded-xl flex flex-col items-center justify-between'
            >
              <h1 className='text-3xl mb-2'>{mission.title}</h1>
              <h2 className='text-xl text-white/50 mb-2'>
              {mission.description}
              </h2>
              <h3 className='text-xl'>Deadline: {mission.deadline}</h3>
              <h4 className='text-xl'>Status: {mission.isDone}</h4>
              <div>
                <button
                  onClick={() => deleteMission(mission._id)}
                  className='py-2 px-6 bg-red-700 border border-red-600 rounded-lg font-semibold'
                >
                  Abort
                </button>
                <button
                  onClick={() => deleteMission(mission._id)}
                  className='py-2 px-6 mx-2 bg-green-700 border border-green-600 rounded-lg font-semibold'
                >
                  Accomplished
                </button>
              </div>
            </div>
          ))
        ) : (
          <h1 className='mt-12 flex flex-col items-center justify-center italic'>
            You can relax Agent, no missions for now_
          </h1>
        )}
      </div>
    </div>
  );
}
