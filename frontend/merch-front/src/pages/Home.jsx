import { Link } from "react-router-dom"
import { useState, useRef, useEffect } from "react"

const Home = () => {
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef(null)
  const [gradientStyle, setGradientStyle] = useState({ 
    backgroundImage: `linear-gradient(to right, #DC2626, #D1D5DB, #14B8A6)` 
  });
  const [hasMouseMoved, setHasMouseMoved] = useState(false);
  const positionRef = useRef({ currentX: 50, currentY: 50, targetX: 50, targetY: 50 });
  const animationFrameId = useRef(null);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!hasMouseMoved) {
        setHasMouseMoved(true);
      }
      positionRef.current.targetX = (e.clientX / window.innerWidth) * 100;
      positionRef.current.targetY = (e.clientY / window.innerHeight) * 100;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      if (!hasMouseMoved) {
        animationFrameId.current = requestAnimationFrame(animate);
        return;
      }

      const { currentX, currentY, targetX, targetY } = positionRef.current;
      
      const newX = currentX + (targetX - currentX) * 0.1;
      const newY = currentY + (targetY - currentY) * 0.1;
      
      positionRef.current.currentX = newX;
      positionRef.current.currentY = newY;
      
      setGradientStyle({
        backgroundImage: `radial-gradient(circle at ${newX}% ${newY}%, #EF4444, #D1D5DB, #14B8A6)`,
      });
      
      animationFrameId.current = requestAnimationFrame(animate);
    }
    
    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [hasMouseMoved]);

  // Ensure video plays on mobile
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      // Force play on load with error handling
      const playVideo = () => {
        video.play().catch(() => {
          // If autoplay fails, that's okay - user can unmute to play
          console.log('Autoplay prevented by browser policy');
        });
      };
      
      // Try to play when video loads
      if (video.readyState >= 3) {
        playVideo();
      } else {
        video.addEventListener('canplay', playVideo, { once: true });
      }
    }
  }, []);

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    if (videoRef.current) {
      videoRef.current.muted = newMutedState;
      
      // Force play after unmute (mobile browsers sometimes pause)
      if (!newMutedState) {
        videoRef.current.play().catch(() => {
          // If play fails, revert to muted
          setIsMuted(true);
          videoRef.current.muted = true;
          videoRef.current.play();
        });
      }
    }
  }

  return (
    <div className="bg-soft-black text-off-white min-h-screen">
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
        {/* Background Video */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat overflow-hidden"
        >
          <video 
            autoPlay 
            loop 
            muted={isMuted} 
            playsInline 
            controls={false}
            className="w-full h-full object-cover" 
            ref={videoRef}
            style={{ pointerEvents: 'none' }}
          >
            <source src="https://res.cloudinary.com/deqe0oqer/video/upload/v1751905102/The_Weeknd_Tour_Intro.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Dark overlay for dimming */}
        <div className="absolute inset-0 bg-soft-black opacity-60"></div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <h1 
            className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold uppercase tracking-widest bg-clip-text text-transparent whitespace-nowrap"
            style={gradientStyle}
          >
            The Weeknd
          </h1>
        </div>

        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10 w-full text-center px-4">
          <p className="text-base sm:text-xl md:text-2xl max-w-lg mb-8 font-light mx-auto leading-relaxed">Dive into the sound. Grab exclusive merch now.</p>
          <Link
            to="/products"
            className="inline-block backdrop-blur-[1px] bg-white/10 text-off-white px-4 py-3 sm:px-8 sm:py-3 rounded-full font-semibold shadow-lg border border-white/5 hover:bg-white/20 hover:border-white/5 hover:outline-none transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-bright-red focus:ring-opacity-50 transform hover:scale-105 active:scale-95 min-h-[44px] min-w-[120px] text-sm sm:text-base md:text-lg"
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

        {/* Mute Button - positioned to avoid mobile browser UI */}
        <div className="absolute mute-btn-mobile sm:bottom-8 right-4 md:right-8 z-20">
          <button 
            onClick={toggleMute} 
            className="backdrop-blur-[1px] bg-white/10 text-off-white px-4 py-3 rounded-full font-semibold shadow-lg border border-white/5 hover:bg-white/20 hover:border-white/5 hover:outline-none transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-bright-red focus:ring-opacity-50 transform hover:scale-105 active:scale-95 min-h-[44px] min-w-[44px] text-sm sm:text-base"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <span>Unmute</span>
            ) : (
              <span>Mute</span>
            )}
          </button>
        </div>
      </section>

      {/* Bio Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-16 relative overflow-hidden">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-off-white">About The Weeknd</h2>
          <div className="w-24 h-1 bg-bright-red mx-auto mb-8"></div>
        </div>

        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <p className="text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto px-4">
            The Weeknd, born <span className="text-bright-red font-semibold">Abel Tesfaye</span>, is a Canadian singer, songwriter, and record producer known for his dark, cinematic soundscapes that blend R&B, pop, and electronic music. His music often explores themes of love, heartbreak, and hedonism, resonating with a global audience.
          </p>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed opacity-90 max-w-3xl mx-auto px-4">
            Rising to fame with his early mixtapes like '<span className="text-bright-red font-semibold">House of Balloons</span>' in 2011, The Weeknd has since become a cultural icon with chart-topping albums such as 'Beauty Behind the Madness' and '<span className="text-bright-red font-semibold">Starboy</span>'. His innovative style and captivating performances, including the Super Bowl LV Halftime Show, have solidified his place in modern music history. Explore the latest merch and join the <span className="text-bright-red font-semibold">XO</span> movement.
          </p>
          
          <div className="pt-10">
            <p className="text-xl sm:text-2xl font-semibold mb-3">Listen to The Weeknd</p>
            <div className="w-20 h-1 bg-bright-red mx-auto mb-8"></div>
            <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto px-4">
              <a
                href="https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-48 md:w-52 backdrop-blur-[1px] bg-white/10 text-off-white px-6 py-4 rounded-full font-semibold shadow-lg border border-white/5 hover:bg-white/20 hover:border-green-500 hover:text-green-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center justify-center space-x-2 transform hover:scale-105 active:scale-95 min-h-[44px]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M17.9 10.9C14.7 9 9.35 8.8 6.3 9.75c-.5.15-1-.15-1.15-.6c-.15-.5.15-1 .6-1.15c3.55-1.05 9.4-.85 13.1 1.35c.45.25.6.85.35 1.3c-.25.35-.85.5-1.3.25m-.1 2.8c-.25.35-.7.5-1.05.25c-2.7-1.65-6.8-2.15-9.95-1.15c-.4.1-.85-.1-.95-.5s.1-.85.5-.95c3.65-1.1 8.15-.55 11.25 1.35c.3.15.45.65.2 1m-1.2 2.75c-.2.3-.55.4-.85.2c-2.35-1.45-5.3-1.75-8.8-.95c-.35.1-.65-.15-.75-.45c-.1-.35.15-.65.45-.75c3.8-.85 7.1-.5 9.7 1.1c.35.15.4.55.25.85M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"/></svg>
                <span>Spotify</span>
              </a>
              <a
                href="https://music.apple.com/us/artist/the-weeknd/479756766"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-48 md:w-52 backdrop-blur-[1px] bg-white/10 text-off-white px-6 py-4 rounded-full font-semibold shadow-lg border border-white/5 hover:bg-white/20 hover:border-red-400 hover:text-red-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 flex items-center justify-center space-x-2 transform hover:scale-105 active:scale-95 min-h-[44px]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M23.994 6.124a9.2 9.2 0 0 0-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5 5 0 0 0-1.877-.726a10.5 10.5 0 0 0-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986q-.227.014-.455.026c-.747.043-1.49.123-2.193.4c-1.336.53-2.3 1.452-2.865 2.78c-.192.448-.292.925-.363 1.408a11 11 0 0 0-.1 1.18c0 .032-.007.062-.01.093v12.223l.027.424c.05.815.154 1.624.497 2.373c.65 1.42 1.738 2.353 3.234 2.801c.42.127.856.187 1.293.228c.555.053 1.11.06 1.667.06h11.03a13 13 0 0 0 1.57-.1c.822-.106 1.596-.35 2.295-.81a5.05 5.05 0 0 0 1.88-2.207c.186-.42.293-.87.37-1.324c.113-.675.138-1.358.137-2.04c-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206c-.29.59-.76.962-1.388 1.14q-.524.15-1.07.173c-.95.045-1.773-.6-1.943-1.536a1.88 1.88 0 0 1 1.038-2.022c.323-.16.67-.25 1.018-.324c.378-.082.758-.153 1.134-.24c.274-.063.457-.23.51-.516a1 1 0 0 0 .02-.193q0-2.723-.002-5.443a.7.7 0 0 0-.026-.185c-.04-.15-.15-.243-.304-.234c-.16.01-.318.035-.475.066q-1.14.226-2.28.456l-2.325.47l-1.374.278l-.048.013c-.277.077-.377.203-.39.49q-.002.063 0 .13c-.002 2.602 0 5.204-.003 7.805c0 .42-.047.836-.215 1.227c-.278.64-.77 1.04-1.434 1.233q-.526.152-1.075.172c-.96.036-1.755-.6-1.92-1.544c-.14-.812.23-1.685 1.154-2.075c.357-.15.73-.232 1.108-.31c.287-.06.575-.116.86-.177q.574-.126.6-.714v-.15l.002-8.882c0-.123.013-.25.042-.37c.07-.285.273-.448.546-.518c.255-.066.515-.112.774-.165q1.1-.224 2.2-.444l2.27-.46l2.01-.403c.22-.043.442-.088.663-.106c.31-.025.523.17.554.482q.012.11.012.223q.003 2.866 0 5.732z"/></svg>
                <span>Apple Music</span>
              </a>
              
              <a
                href="https://music.youtube.com/channel/UC0WP5P-ufpRfjbNrmOWwLBQ"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-48 md:w-52 backdrop-blur-[1px] bg-white/10 text-off-white px-6 py-4 rounded-full font-semibold shadow-lg border border-white/5 hover:bg-white/20 hover:border-red-500 hover:text-red-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center justify-center space-x-2 transform hover:scale-105 active:scale-95 min-h-[44px]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12s12-5.376 12-12S18.624 0 12 0m0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104s-3.18 7.104-7.104 7.104m0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772M9.684 15.54V8.46L15.816 12z"/></svg>
                <span>YouTube Music</span>
              </a>
              <a
                href="https://soundcloud.com/theweeknd"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-48 md:w-52 backdrop-blur-[1px] bg-white/10 text-off-white px-6 py-4 rounded-full font-semibold shadow-lg border border-white/5 hover:bg-white/20 hover:border-orange-500 hover:text-orange-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 flex items-center justify-center space-x-2 transform hover:scale-105 active:scale-95 min-h-[44px]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M23.999 14.165c-.052 1.796-1.612 3.169-3.4 3.169h-8.18a.68.68 0 0 1-.675-.683V7.862a.75.75 0 0 1 .452-.724s.75-.513 2.333-.513a5.36 5.36 0 0 1 2.763.755a5.43 5.43 0 0 1 2.57 3.54c.282-.08.574-.121.868-.12c.884 0 1.73.358 2.347.992s.948 1.49.922 2.373M10.721 8.421c.247 2.98.427 5.697 0 8.672a.264.264 0 0 1-.53 0c-.395-2.946-.22-5.718 0-8.672a.264.264 0 0 1 .53 0M9.072 9.448c.285 2.659.37 4.986-.006 7.655a.277.277 0 0 1-.55 0c-.331-2.63-.256-5.02 0-7.655a.277.277 0 0 1 .556 0m-1.663-.257c.27 2.726.39 5.171 0 7.904a.266.266 0 0 1-.532 0c-.38-2.69-.257-5.21 0-7.904a.266.266 0 0 1 .532 0m-1.647.77a26 26 0 0 1-.008 7.147a.272.272 0 0 1-.542 0a28 28 0 0 1 0-7.147a.275.275 0 0 1 .55 0m-1.67 1.769c.421 1.865.228 3.5-.029 5.388a.257.257 0 0 1-.514 0c-.21-1.858-.398-3.549 0-5.389a.272.272 0 0 1 .543 0Zm-1.655-.273c.388 1.897.26 3.508-.01 5.412c-.026.28-.514.283-.54 0c-.244-1.878-.347-3.54-.01-5.412a.283.283 0 0 1 .56 0m-1.668.911c.4 1.268.257 2.292-.026 3.572a.257.257 0 0 1-.514 0c-.241-1.262-.354-2.312-.023-3.572a.283.283 0 0 1 .563 0"/></svg>
                <span>SoundCloud</span>
              </a>
              <a
                href="https://tidal.com/artist/4761957"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-48 md:w-52 backdrop-blur-[1px] bg-white/10 text-off-white px-6 py-4 rounded-full font-semibold shadow-lg border border-white/5 hover:bg-white/20 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50 flex items-center justify-center space-x-2 transform hover:scale-105 active:scale-95 min-h-[44px]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12.012 3.992L8.008 7.996L4.004 3.992L0 7.996L4.004 12l4.004-4.004L12.012 12l-4.004 4.004l4.004 4.004l4.004-4.004L12.012 12l4.004-4.004zm4.03 4.004l3.979-3.979L24 7.996l-3.979 3.979z"/></svg>
                <span>Tidal</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home