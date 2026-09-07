import { useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import About from "./components/About";
import Affiliation from "./components/Affiliation";
import Status from "./components/Status";
import Relationships from "./components/Relationships";
import Skills from "./components/Skills";
import Troops from "./components/Troops";
import Weapons from "./components/Weapons";
import { useParams } from "react-router-dom";
import jinwoo from "./assets/jinwoo3.png";
import chaImg from './assets/chahaeinBg.png'
import jinHoBg from './assets/Yoo-Jin-Ho.png'
import goImg from './assets/goImg.png'
import leeImg from './assets/leeImg.webp'
import songImg from './assets/songImg.webp'
import NavSystem from "./auth/NavSystem";
import minImg from './assets/minAvatar.webp'
import baekImg from './assets/baekAvatar.png'
import kangImg from './assets/kangAvatar.webp'
import beruImg from './assets/beruAvatar.png'


function App() {
  const [activeSection, setActiveSection] = useState("about");
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  function toggleMenu() {
    playSystemSound()
    if (open) {
      setClosing(true);
      setTimeout(() => {
        setOpen(false);
        setClosing(false);
      }, 700);
    } else {
      setOpen(true);
    }
  }

  const audioRef = useRef(null)

  const playSystemSound = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/sounds/Notification_Sound.mp3')
      audioRef.current.volume = 0.3
    }
    audioRef.current.currentTime = 0
    audioRef.current.play().catch(() => { })
  }

  const handleClick = (section) => {
    setActiveSection(section)
    playSystemSound()
  }
  const closeMenu = () => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 700);
  };
  const handleClickMobile = (section) => {
    setActiveSection(section)
    closeMenu()
  }


  const renderContent = () => {
    switch (activeSection) {
      case "affiliation":
        return <Affiliation />;
      case "status":
        return <Status />;
      case "relationships":
        return <Relationships />;
      case "skills":
        return <Skills />;
      case "troops":
        return <Troops />;
      case "weapons":
        return <Weapons />;

      default:
        return <About />;
    }
  };

  const { characterId } = useParams();

  const characterImage = () => {
    switch (characterId) {
      case "chaehaein":
        return chaImg;
      case "yoojinho":
        return jinHoBg;
      case "goonghee":
        return goImg;
      case "leejoohee":
        return leeImg;
      case "songchiyul":
        return songImg;
      case "minbyunggyu":
        return minImg;
      case "baekyoonho":
        return baekImg;
      case "kangtaeshik":
        return kangImg;
      case "beru":
        return beruImg;
      default:
        return jinwoo
    }
  }

  return (
    <>

      <div className="xl:pl-25 xl:flex-row-reverse flex flex-col justify-between xl:mt-30 h-[calc(100%-15rem)]">
        <div className="absolute bottom-10 right-10 text-2xl">
          <NavSystem />
        </div>
        <div className={` hidden 2xl:block absolute bottom-0 
          ${characterId === "jinwoo" ? 'w-160 h-[120%]' : ""} 
          ${characterId === "chaehaein" ? 'w-130 h-[120%]' : ''} 
          ${characterId === "yoojinho" ? ' w-130 h-[110%]' : ''} 
          ${characterId === "goonghee" ? ' w-160 h-[115%] right-[180px]' : ''} 
          ${characterId === "leejoohee" ? ' w-160 h-[110%] right-[180px] ' : ''} 
          ${characterId === "songchiyul" ? ' w-160 h-[110%] right-[80px] ' : ''} 
          ${characterId === "minbyunggyu" ? ' w-170 h-[110%] right-[160px] ' : ''} 
          ${characterId === "baekyoonho" ? ' w-160 h-[110%] right-[80px] ' : ''}
          ${characterId === "kangtaeshik" ? ' w-180 h-[110%] right-[80px] ' : ''}
          ${characterId === "beru" ? ' w-180 h-[110%] right-[80px] ' : ''}
           right-60 object-cover pointer-events-none`}>
          <img
            src={characterImage()}
            alt=""
            className=" h-full"
          />
        </div>
        <Sidebar active={activeSection} setActive={setActiveSection} handleClick={handleClick} handleClickMobile={handleClickMobile} open={open} setOpen={setOpen} closing={closing} setClosing={setClosing} toggleMenu={toggleMenu} />
        <div className="flex-1 flex flex-col gap-8 xl:pr-20">

          <div
            key={activeSection}
            className={` h-full system-content w-full sm:flex flex-col justify-center items-center xl:block ${open ? 'mt-0' : 'mt-32 xl:mt-0'} mx-auto xl:mx-0 xl:max-w-120 pb-10 px-5 xl:p-0`}
          >
            {renderContent()}
          </div>
        </div>

      </div>
    </>
  );
}

export default App;