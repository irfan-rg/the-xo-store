import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="bg-soft-black text-off-white min-h-screen">
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(https://scontent.fblr11-1.fna.fbcdn.net/v/t39.30808-6/478835190_1185266172969782_5835065933376042284_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=86c6b0&_nc_ohc=ItO_dP3VcI0Q7kNvwE5Gvsk&_nc_oc=Adl1tN6zt_DEsur2cGrbNuSwNMnQ__7Smi3OCcmv2cDrYm8o5zniA85LeBUVdAMLKfw&_nc_zt=23&_nc_ht=scontent.fblr11-1.fna&_nc_gid=zwYKTdDIaemw_Faw_H32Qg&oh=00_AfORz2GSYEAZQpJor4qOLHlGmv50TEwo8r58ogR9Am6oQg&oe=686B2C08)`,
          }}
        ></div>
        
        {/* Dark overlay for dimming */}
        <div className="absolute inset-0 bg-soft-black opacity-60"></div>

        <div className="relative z-10">
          <h1 className="text-6xl sm:text-9xl md:text-[10rem] font-bold uppercase tracking-widest mb-6 bg-gradient-to-r from-red-600 via-gray-300 to-teal-500 bg-clip-text text-transparent">
            The Weeknd
          </h1>
          <p className="text-xl sm:text-2xl max-w-lg mt-24 mb-8 font-light mx-auto">Dive into the sound. Grab exclusive merch now.</p>
          <Link
            to="/products"
            className="backdrop-blur-[1px] bg-white/5 text-off-white px-5 py-2 rounded-full font-semibold shadow-lg border border-white/5"
          >
            Shop Here
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8">
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
