'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function Page() {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/missions');

        console.log('API Response:', response.data);
        setMissions(response.data.data);
      } catch (error) {
        console.error('Error fetching missions:', error);
      }
    }

    fetchData();
  }, []);

  const [mission, setMission] = useState();

  async function deleteMission(missionId: any) {
    try {
      const response = await fetch(`/api/missions`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mission: missionId }), // Change to mission
      });
      console.log(response);
      
      if (response.ok) {
        toast.success('Mission deleted successfully');
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to delete mission');
      }
    } catch (error) {
      console.error('Error deleting mission:', error);
      toast.error('Failed to delete mission');
    }
  }
  
  
  return (
    <div className='px-24 min-h-screen bg-gradient-to-b from-black via-teal-950 to-black'>
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
          <button className='py-2 px-6 mx-4 bg-yellow-600 border border-yellow-600 rounded-lg font-semibold'>
            Alter Mission
          </button>
        </div>

        {missions.map((mission: any, index: number) => (
          <div
            key={index}
            className='w-full mt-12  p-4 border border-teal-500/30 rounded-xl '
          >
            <h1 className='text-3xl mb-2'>{mission.title}</h1>
            <h2 className='text-2xl text-white/50 mb-2'>
              Objectives: {mission.description}
            </h2>
            <h3 className='text-xl'>Deadline: {mission.deadline}</h3>
            <button
              onClick={() => {
                setMission(mission._id);
                deleteMission(mission._id);
              }}
              className='py-2 px-6 mx-4 bg-red-700 border border-red-600 rounded-lg font-semibold'
            >
              Abort Mission
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
