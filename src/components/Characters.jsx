import { useCharacter } from "../context/CharacterContext";
import jinwooIcon from '../assets/jinwooIcon2.png'
import chaIcon from '../assets/chaIcon2.png'
import jinIcon from '../assets/jinIcon.webp'
import goIcon from '../assets/GoIcon2.png'
import leeIcon from '../assets/leeIcon2.png'
import songIcon from '../assets/songIcon2.png'
import minIcon from '../assets/ByungGyuIcon.png'
import baekIcon from '../assets/BaekIcon.png'
import kangIcon from '../assets/kangIcon.webp'
import beruIcon from '../assets/beruIcon.png'


export default function Characters({ onDone }) {
    const { allCharacters, current, setCharacter } = useCharacter();

    return (
        <div className="h-full overflow-y-auto flex flex-col items-center sm:block xl:mt-30 p-5 md:p-10 md:pr-2">
            <div className="mb-8 text-center sm:text-left">
                <p className="uppercase text-xs tracking-[0.35em] text-white/60">
                    System Directory
                </p>
                <h2 className="text-4xl font-extrabold mt-2">CHARACTERS</h2>
                <p className="text-white/70 mt-2 max-w-xl">
                    Select a profile to load its system data.
                </p>
            </div>

            <div className="flex gap-10 flex-wrap justify-center sm:justify-start ">
                {Object.entries(allCharacters).map(([key, c]) => {
                    const selected = key === current;
                    const characterIcon = () => {
                        switch (key) {
                            case "chaehaein":
                                return chaIcon;
                            case "yoojinho":
                                return jinIcon;
                            case "goonghee":
                                return goIcon;
                            case "leejoohee":
                                return leeIcon;
                            case "songchiyul":
                                return songIcon;
                            case "minbyunggyu":
                                return minIcon;
                            case "baekyoonho":
                                return baekIcon;
                            case "kangtaeshik":
                                return kangIcon;
                            case "beru":
                                return beruIcon;
                            default:
                                return jinwooIcon
                        }
                    }

                    return (
                        <button
                            key={key}
                            onClick={() => {
                                setCharacter(key);
                                onDone?.();
                            }}
                            className={`text-left rounded-2xl border p-5 transition w-[225px] flex flex-col items-center

                                ${selected
                                    ? "border-white/40 bg-white/10 shadow-[0_18px_35px_rgba(0,0,0,0.45)]"
                                    : "border-white/15 bg-white/6 hover:bg-white/10"
                                }`}
                        >
                            <div className="mb-5 rounded-full p-1"
                                style={{ backgroundColor: c.color }}
                            >
                                <img src={characterIcon()} className="w-20 h-20 rounded-full" alt="" />
                            </div>
                            <p className="uppercase text-xs tracking-[0.3em] text-white/60">
                                {key}
                            </p>
                            <p className="mt-2 text-xl font-semibold text-white">
                                {c.name ?? "Unknown"}
                            </p>
                            <p className="text-white/70 mt-1">
                                {c.title ?? "—"}
                            </p>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}