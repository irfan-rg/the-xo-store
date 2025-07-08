import { Link } from "react-router-dom"
import { useState, useRef } from "react"

const Home = () => {
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef(null)

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
    }
  }

  return (
    <div className="bg-soft-black text-off-white min-h-screen">
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat overflow-hidden"
          style={{
            backgroundImage: `url(https://cdn.pixabay.com/video/2021/04/01/69645-531604963_large.mp4)`,
          }}
        >
          <video autoPlay loop muted={isMuted} className="w-full h-full object-cover" ref={videoRef}>
            <source src="https://res.cloudinary.com/deqe0oqer/video/upload/v1751905102/The_Weeknd_Tour_Intro_ozxn1u.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Dark overlay for dimming */}
        <div className="absolute inset-0 bg-soft-black opacity-60"></div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <h1 className="text-6xl sm:text-9xl md:text-[10rem] font-bold uppercase tracking-widest bg-gradient-to-r from-red-600 via-gray-300 to-teal-500 bg-clip-text text-transparent whitespace-nowrap">
            The Weeknd
          </h1>
        </div>

        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10 w-full text-center px-4">
          <p className="text-xl sm:text-2xl max-w-lg mb-8 font-light mx-auto">Dive into the sound. Grab exclusive merch now.</p>
          <Link
            to="/products"
            className="backdrop-blur-[1px] bg-white/10 text-off-white px-5 py-2 rounded-full font-semibold shadow-lg border border-white/5 hover:bg-white/20 hover:border-white/5 hover:outline-none transition focus:outline-none focus:ring-2 focus:ring-bright-red focus:ring-opacity-50"
          >
            Shop Here
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <svg
            className="w-8 h-8 text-bright-red"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>

        {/* Mute Button */}
        <div className="absolute bottom-8 right-8 z-20">
          <button 
            onClick={toggleMute} 
            className="backdrop-blur-[1px] bg-white/10 text-off-white p-2 rounded-full font-semibold shadow-lg border border-white/5 hover:bg-white/20 hover:border-white/5 hover:outline-none transition focus:outline-none focus:ring-2 focus:ring-bright-red focus:ring-opacity-50"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <span className="px-2">Unmute</span>
            ) : (
              <span className="px-2">Mute</span>
            )}
          </button>
        </div>
      </section>

      {/* Bio Section */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-off-white">About Paul</h2>
          <div className="w-24 h-1 bg-bright-red mx-auto mb-8"></div>
        </div>

        <div className="text-center space-y-6">
          <p className="text-lg leading-relaxed max-w-2xl mx-auto">
            Artist Name is a genre-defying musician whose dark, cinematic soundscapes push boundaries. With a unique
            blend of electronic and ambient sounds, their music resonates with fans worldwide.
          </p>
          <p className="text-lg leading-relaxed opacity-90 max-w-2xl mx-auto">
            From underground venues to international stages, the journey has been one of constant evolution. Explore the
            latest merch and join the movement that's redefining modern music.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Home