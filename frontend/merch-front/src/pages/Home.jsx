import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="bg-soft-black text-off-white min-h-screen">
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C2526] via-[#2A3A3C] to-[#1C2526] opacity-50"></div>

        <div className="relative z-10">
          <h1 className="text-6xl sm:text-8xl font-bold uppercase tracking-wider mb-6 bg-gradient-to-r from-bright-red to-off-white bg-clip-text text-transparent animate-pulse">
            Artist Name
          </h1>
          <p className="text-xl sm:text-2xl max-w-lg mb-8 font-light mx-auto">Dive into the sound. Grab exclusive merch now.</p>
          <Link
            to="/shop"
            className="bg-bright-red text-off-white px-8 py-4 rounded-full font-semibold hover:bg-off-white hover:text-soft-black transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Shop Here
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 animate-bounce">
          <div className="w-6 h-10 border-2 border-bright-red rounded-full flex justify-center">
            <div className="w-1 h-3 bg-bright-red rounded-full mt-2 animate-pulse"></div>
          </div>
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
