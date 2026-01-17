import React from 'react'

const Footer = () => {
  return (
    <div>



           <footer className="bg-[#050505] pt-32 pb-10 px-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-[15vw] font-black tracking-tighter leading-none text-white/5 pointer-events-none mb-20">
          TOKENBAG
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-gray-500 text-sm">
          <div className="flex flex-col gap-4">
            <p className="text-white font-bold">PROTOCOL</p>
            <a href="#">Encryption</a>
            <a href="#">Groq Engine</a>
            <a href="#">Supabase DB</a>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-white font-bold">SOCIAL</p>
            <a href="#">Twitter/X</a>
            <a href="#">Github</a>
            <a href="#">Discord</a>
          </div>
          <div className="col-span-2 text-right">
            <p>© 2026 TOKENBAG. ALL RIGHTS RESERVED.</p>
            <p className="mt-2">MADE FOR THE NEXT GENERATION OF AI SHARING.</p>
          </div>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer