import Link from 'next/link';

export default function Home() {
  return (
    <div className='bg-black text-[#b7b7b7] flex flex-col justify-center items-center'>
      <div className='mt-12 mx-8 w-[80%]'>
        <h1 className='text-6xl font-bold mb-8 text-teal-400'>
          Welcome, Agent
        </h1>
        <div>
          <p className='text-xl mb-4'>
            This is a secret mission tracking platform. You can manage your
            missions,{' '}
            <span className='bg-[#650000] rounded-lg px-1'>abort</span> them if
            necessary, and mark them as{' '}
            <span className='bg-teal-900 rounded-lg px-1'>accomplished</span>{' '}
            once you've successfully executed them.
          </p>
          <p className='text-xl mb-8'>
            Our platform is designed to assist you in your{' '}
            <span className='bg-[#353535] rounded-lg px-1'>
              covert operations
            </span>{' '}
            , ensuring that you stay organized and ahead of the game at all
            times.
          </p>
          <p className='text-xl mb-4'>
            Whether you're on a mission to save the world or eliminate a
            high-profile target, our platform will provide you with the tools
            and support you need to accomplish your objectives with precision
            and efficiency.
          </p>
          <p className='text-xl mb-8 italic'>
            Remember, discretion is paramount. Use this platform wisely, and may
            your missions be successful.
          </p>
          <div className='flex justify-center'>
            <Link href='/missions'>
              <p className='py-3 px-8 hover:bg-teal-700 bg-black border hover:border-black border-teal-800 text-white font-semibold rounded-lg shadow-md transition duration-300'>
                View Missions
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
