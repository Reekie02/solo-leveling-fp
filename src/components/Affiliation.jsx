import { useParams } from 'react-router-dom';
import { useCharacter } from '../context/CharacterContext';
import '../styles/affiliation.css'

const Affiliation = () => {
    const { characterId } = useParams();

    const { character } = useCharacter();

    if (!character) return null;

    const { affiliation } = character;

    return (
        <div className="flex flex-col gap-8 text-white">


            <div>
                <p className="uppercase text-xs tracking-[0.35em] text-white/60">
                    System Record
                </p>
                <h2 className="text-4xl font-extrabold mt-2">
                    AFFILIATION
                </h2>
            </div>


            <div className="grid grid-cols-2 gap-6 max-w-xl">
                <div className="system-card">
                    <p className="label">Title</p>
                    <p className="value">{character.title}</p>
                </div>

                <div className="system-card">
                    <p className="label">Faction</p>
                    <p className="value">{affiliation.faction}</p>
                </div>

                {characterId === 'jinwoo' ?
                    <div className="system-card">
                        <p className="label">Authority</p>
                        <p className="value">Absolute</p>
                    </div>
                    :
                    <div className="hidden"></div>
                }

                {characterId !== 'jinwoo' ?
                    <div className="system-card">
                        <p className="label">Badge</p>
                        <p className="value">{affiliation.badge}</p>
                    </div>
                    :
                    <div className="hidden"></div>
                }

                <div className="system-card">
                    <p className="label">Alignment</p>
                    <p className="value">{affiliation.align}</p>
                </div>
            </div>


            <div className="mt-4 border-l-2 border-white pl-6 max-w-xl">
                <h3 className="text-xl font-bold mb-2">
                    {affiliation.faction}
                </h3>
                <p className="text-sm leading-relaxed text-white/80">
                    {affiliation.notes}
                </p>
            </div>

        </div>
    )
}

export default Affiliation