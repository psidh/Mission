export default function Page() {
  return (
    <div className='px-24 min-h-screen bg-gradient-to-b from-black via-teal-950 to-black'>
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
			<a href='/missions/new' className='py-2 px-6 bg-teal-700 border border-teal-600 rounded-lg font-semibold'>New Mission</a>
			<button className='py-2 px-6 mx-4 bg-red-700 border border-red-600 rounded-lg font-semibold'>Abort Mission</button>
			<button className='py-2 px-6 mx-4 bg-yellow-600 border border-yellow-600 rounded-lg font-semibold'>Alter Mission</button>
		</div>
      </div>
    </div>
  );
}
