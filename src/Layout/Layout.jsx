import React, { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import LeafEffect from '../components/LeafEffect'
import Navbar from '../components/Navbar'
import { useCharacter } from '../context/CharacterContext'
import bg from '../assets/bg.png'
import chaBg from '../assets/chaehaeinBg2.avif'
import jinHoImg from '../assets/yoojinhoBg.avif'
import goBg from '../assets/goBg.webp'
import leeBg from '../assets/leeBg.avif'
import songBg from '../assets/songBg.avif'
import minBg from '../assets/minBg.avif'
import baekyoonhoBg from '../assets/baekBg.jpeg'
import kangBg from '../assets/kangBg.webp'
import beruBg from '../assets/beruBg.webp'

const Layout = () => {

    const { character } = useCharacter();
    useEffect(() => {
        const backgrounds = {
            jinwoo: `linear-gradient(147deg, transparent, rgba(52, 52, 175, 0.8)), url(${bg})`,
            chaehaein: `linear-gradient(145deg, rgba(180, 145, 60, 0.75), rgba(60, 45, 10, 0.95)), url(${chaBg})`,
            yoojinho: `linear-gradient(145deg, rgba(90, 70, 50, 0.85), rgba(35, 25, 18, 0.95)), url(${jinHoImg})`,
            goonghee: `linear-gradient(145deg, rgba(20, 20, 25, 0.7),rgba(5, 5, 8, 0.8)), url(${goBg})`,
            leejoohee: `linear-gradient(145deg, rgba(36, 74, 90, 0.85), rgba(10, 20, 28, 0.95)), url(${leeBg})`,
            songchiyul: `linear-gradient(145deg, rgba(90, 31, 31, 0.88), rgba(20, 6, 6, 0.98)), url(${songBg})`,
            minbyunggyu: `linear-gradient(145deg, rgba(49, 112, 51, 0.8), rgba(46, 125, 50, 0.9)), url(${minBg})`,
            baekyoonho: `linear-gradient(145deg, rgba(255, 165, 0, 0.8), rgba(255, 136, 0, 0.9)), url(${baekyoonhoBg})`,
            kangtaeshik: `linear-gradient(145deg, rgba(75, 44, 111, 0.8), rgba(75, 44, 111, 0.9)), url(${kangBg})`,
            beru: `linear-gradient(145deg,rgba(18, 36, 64, 0.88),rgba(6, 12, 24, 0.96)),url(${beruBg})`
        };
        if (!character?.backgroundKey) return;

        document.body.style.background = backgrounds[character.backgroundKey];
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundAttachment = "fixed";
    }, [character]);

    return (
        <>



            <div
                className={`border border-white/40 m-auto xl:px-10 shadow-2xl shadow-black w-[95%] xl:w-[80%] h-[90%] xl:h-[calc(100vh-15rem)] relative rounded-2xl flex flex-col overflow-y-auto xl:overflow-y-visible`}
                style={{ backgroundColor: character.color, opacity: 0.9 }}
            >
                <LeafEffect count={window.innerWidth > 1200 ? 32 : 20} />

                <Navbar />
                <Outlet />

            </div>


        </>
    )
}

export default Layout