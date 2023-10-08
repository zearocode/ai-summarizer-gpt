import { logo } from '../assets';


const Hero = () => {
  return (
    <header className="flex justify-center items-center flex-col w-full">
        <nav className='flex justify-between items-center w-full mb-10 pt-3'>
         <img src={logo} alt="Summazrizinator" className="w-60 object-contain" />


        <button type='button' onClick={() =>
            window.open("https://github.com/zearocode", "_blank")} className='bg-white text-black px-5 py-1 items-center rounded-full hover:bg-black hover:text-white transition-all '>Github</button> 
        </nav>
       <h1 className='text-black bg-white font-mono font-bold px-5 hover:text-white hover:bg-black transition-all' ><span className='underline decoration-sky-700'>Summarize</span> your articles with ease :)</h1>
    </header>
    
    
  )
}

export default Hero