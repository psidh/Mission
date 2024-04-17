export default function Page() {
  return (
    <div className='px-24 bg-gradient-to-b from-black via-yellow-900/60 to-black'>
      <div>
        <h1 className='text-6xl font-semibold'>
          Bulletstreak<span className='animate-pulse font-extrabold'>_</span>
        </h1>
        <p className='text-xl text-[#999999] mt-12'>
          Your commitments to being an assassin is your lifeline Agent!
        </p>
        <p className='text-xl text-[#999999] mt-2'>
          {' '}
          <span className='text-amber-500'>Beware</span> to complete them, as your
          client won't be pleased with unsuccessful commitments ☠️
          <span className='animate-pulse font-extrabold text-xl'>|</span>{' '}
        </p>
        <div className='flex items-start justify-start mt-12'>
          <a
            href='/missions/new'
            className='py-2 px-6 bg-amber-700 border border-amber-600 rounded-lg font-semibold'
          >
            New Mission
          </a>
        </div>
      </div>
    </div>
  );
}
