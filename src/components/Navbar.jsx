import React, { useEffect, useMemo, useRef, useState } from 'react'
import logo from '../assets/logo.svg'
import { LogOut, Search } from "lucide-react"
import '../styles/navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from "../context/AuthContext";
import { useCharacter } from '../context/CharacterContext'
import SearchForm from './SearcForm'

import jinwooIcon from '../assets/jinwooIcon2.png'
import chaIcon from '../assets/chaIcon2.png'
import jinIcon from '../assets/jinIcon.webp'
import goIcon from '../assets/GoIcon2.png'
import leeIcon from '../assets/leeIcon2.png'
import songIcon from '../assets/songIcon2.png'


const Navbar = () => {

    const { allCharacters, current } = useCharacter()
    const [open, isOpen] = useState(false)
    const [ham, setHam] = useState(false)
    const [hamVisible, setHamVisible] = useState(false);

    console.log(allCharacters);
    useEffect(() => {
        if (ham) setHamVisible(true);
    }, [ham]);
    const handleAnimEnd = () => {
        if (!ham) setHamVisible(false);
    };
    const navigate = useNavigate();

    const systemConfirm = (e, action) => {
        const el = e.currentTarget;

        const old = el.querySelector(".sys-ripple");
        if (old) old.remove();

        const r = document.createElement("span");
        r.className = "sys-ripple";

        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        r.style.left = `${x}px`;
        r.style.top = `${y}px`;

        el.appendChild(r);

        el.classList.remove("sys-confirm");
        void el.offsetWidth;
        el.classList.add("sys-confirm");

        window.setTimeout(() => action?.(), 180);
    };

    const formRef = useRef(null);

    const inputRef = useRef(null);

    const { character } = useCharacter();


    const { user, authLoading, signOut } = useAuth();
    console.log("AUTH DEBUG:", { authLoading, user });
    const [idFlash, setIdFlash] = useState(false);

    useEffect(() => {
        if (!user?.username) return;
        setIdFlash(true);
        const t = setTimeout(() => setIdFlash(false), 1400);
        return () => clearTimeout(t);
    }, [user?.username]);


    useEffect(() => {
        if (open) {
            requestAnimationFrame(() => inputRef.current?.focus());
        }
    }, [open]);

    useEffect(() => {
        function handleClickOutside(e) {
            if (formRef.current && !formRef.current.contains(e.target)) {
                isOpen(false);
            }
        }

        if (open) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    const charactersList = useMemo(() => {
        return Object.entries(allCharacters || {}).map(([key, val]) => {
            let icon = jinwooIcon;
            switch (key) {
                case "chaehaein": icon = chaIcon; break;
                case "yoojinho": icon = jinIcon; break;
                case "goonghee": icon = goIcon; break;
                case "leejoohee": icon = leeIcon; break;
                case "songchiyul": icon = songIcon; break;
                default: icon = jinwooIcon;
            }
            return {
                id: key,
                ...val,
                image: icon
            };
        })
    }, [allCharacters])

    return (
        <nav className=" flex justify-between items-center text-md xl:text-2xl pr-5 lg:p-0 relative">
            <ul className="flex items-center gap-10">
                <img src={logo} className=" h-15 mt-3" alt="" />
                <div className=" hidden xl:flex gap-10">
                    <Link to={`/${current}`}>Home</Link>
                    <Link to={'./characters'}>Characters</Link>
                    <Link to={'/help'}>Help</Link>
                </div>
            </ul>


            <ul className="flex items-center gap-5 xl:gap-10">

                <SearchForm formRef={formRef} isOpen={isOpen} character={character} characters={charactersList} onSelect={(c) => navigate(`/${c.id}`)} />
                <button
                    className="ham-menu md:right-2.5 xl:hidden"
                    onClick={() => setHam(v => !v)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </ul>

            {hamVisible && (
                <div
                    onAnimationEnd={handleAnimEnd}
                    className={`ham-panel relative ${ham ? "ham-in" : "ham-out"} ${ham ? "list-open" : "list-close"}`}
                    style={{
                        backgroundColor: character?.accentColor,
                        "--accent": character?.accentColor,
                        "--glow": character?.color,
                    }}
                >
                    <div className="rim" />

                    <h2 className="ham-title">SYSTEM MENU</h2>

                    <ul className="ham-list">
                        <li>
                            <Link
                                className="ham-item"
                                to={`/${current}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    systemConfirm(e, () => {
                                        setHam(false);
                                        navigate(`/${current}`);
                                    });
                                }}
                            >
                                Home
                            </Link>
                        </li>

                        <li>
                            <Link
                                className="ham-item"
                                to="/characters"
                                onClick={(e) => {
                                    e.preventDefault();
                                    systemConfirm(e, () => {
                                        setHam(false);
                                        navigate("/characters");
                                    });
                                }}
                            >
                                Characters
                            </Link>
                        </li>

                        <li>
                            <Link
                                to={'/help'}
                                type="button"
                                className="ham-item"
                                onClick={(e) =>
                                    systemConfirm(e, () => {
                                        e.preventDefault();
                                        setHam(false);
                                        navigate("/help");
                                    })
                                }
                            >
                                Help
                            </Link>
                        </li>
                    </ul>

                    {authLoading ? (
                        <span className=" xl:block text-white/60 tracking-[0.14em] uppercase text-sm text-center">
                            Syncing...
                        </span>
                    ) : user ? (
                        <div className='ham-list absolute bottom-0'>
                            <div className={`  ham-item ${idFlash ? "sys-id--flash" : ""}`}>
                                <span className="sys-id__text">
                                    Hi, Player <span className="sys-id__name">{user.username}</span>
                                </span>
                                <span className="sys-id__scan" />
                            </div>
                            <div className={`  ham-item ${idFlash ? "sys-id--flash" : ""}`}>
                                <button
                                    className="sys-id__text"
                                    type="button"
                                    onClick={() => signOut()}
                                >

                                    <span className='uppercase'>Logout</span>

                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className='ham-list absolute bottom-0 w-full'>
                            <Link to={"/register"} className="ham-item">
                                Sign Up
                            </Link>
                        </div>
                    )}

                </div>
            )}
        </nav>
    )
}

export default Navbar