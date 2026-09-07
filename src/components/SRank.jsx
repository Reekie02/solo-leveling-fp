import React from 'react'
import '../styles/sRank.css'
import { useCharacter } from '../context/CharacterContext';

const SRank = () => {

    const { character } = useCharacter();

    if (!character) return null;

    const { status, about } = character;

    return (
        <>
            <section className=''>
                <article className="s-rank">
                    <span className="s-letter">{status.rank}</span>
                    <span className="rank-text ml-2">RANK</span>
                </article>
                <p className=' tracking-wide font-light'>{status.class} A.K.A.</p>
                <h1 className='text-5xl font-black mt-3 font-[Noto_Sans_Korean]'>{character.name.toUpperCase()}</h1>
                <p className='text-5xl font-medium font-[Noto_Sans_Korean] italic tracking-[-.4rem]'>{character.koreanName}</p>
                <article className="mt-20 font-light max-w-[397px]">
                    <p>{character.name} {character.koreanName}</p>
                    <p>{about.desc1}
                    </p>
                    <p className="mt-3">{about.desc2}
                    </p>
                </article>
            </section>
        </>
    )
}

export default SRank