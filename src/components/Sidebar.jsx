import AnchorLink from 'react-anchor-link-smooth-scroll'
import '../styles/sidebar.css'
import { CircleAlert } from 'lucide-react'

const Sidebar = ({ active, handleClick, handleClickMobile, open, closing, toggleMenu }) => {


    return (
        <>

            <button
                className="xl:hidden absolute z-1 left-[52%] translate-[-50%] top-20 m-auto w-13 h-13 rounded-full bg-white/10 border border-white/15 shadow-[0_18px_35px_rgba(0,0,0,0.45)]"
                onClick={toggleMenu}
            >
                <div className="pointer-events-none absolute top-1 left-1 w-6 h-6 rounded-full bg-white/25 blur-[2px]" />
                <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_2px_10px_rgba(255,255,255,0.18),inset_0_-10px_18px_rgba(0,0,0,0.35)]" />

                <CircleAlert
                    size={44}
                    color="#cfedf0"
                    className="absolute inset-0 m-auto drop-shadow-[0_6px_10px_rgba(0,0,0,0.45)]"
                />
            </button>

            {open ?
                <ul className={`xl:hidden flex flex-col gap-4 px-4 ${closing ? 'system-close' : ''} my-10 system-open`}>

                    {[
                        "about",
                        "affiliation",
                        "status",
                        "relationships",
                        "skills",
                        "troops",
                        "weapons",
                    ].map((item, index) => (
                        <li key={item}>
                            <button
                                onClick={() => handleClickMobile(item)}
                                className={`system-item ${active === item ? "active" : ""}`}
                            >
                                <span className="system-index">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <span className="system-label pt-[0_!important]">
                                    {item === "weapons" ? "WEAPONS & EQS." : item.toUpperCase()}
                                </span>

                                <span className="system-cursor" />
                            </button>
                        </li>
                    ))}

                </ul>
                :
                <div className='hidden'></div>
            }







            <section className='hidden xl:block'>
                <ul className="flex flex-col gap-3 text-end">

                    <AnchorLink href="#about">
                        <button
                            className={active === 'about' ? 'active' : 'not-active'}
                            onClick={() => handleClick('about')}
                        >
                            ABOUT
                        </button>
                    </AnchorLink>

                    <AnchorLink href="#affiliation">
                        <button
                            className={active === 'affiliation' ? 'active' : 'not-active'}
                            onClick={() => handleClick('affiliation')}
                        >
                            AFFILIATION
                        </button>
                    </AnchorLink>

                    <AnchorLink href="#status">
                        <button
                            className={active === 'status' ? 'active' : 'not-active'}
                            onClick={() => handleClick('status')}
                        >
                            STATUS
                        </button>
                    </AnchorLink>

                    <AnchorLink href="#relationships">
                        <button
                            className={active === 'relationships' ? 'active' : 'not-active'}
                            onClick={() => handleClick('relationships')}
                        >
                            RELATIONSHIPS
                        </button>
                    </AnchorLink>

                    <AnchorLink href="#skills">
                        <button
                            className={active === 'skills' ? 'active' : 'not-active'}
                            onClick={() => handleClick('skills')}
                        >
                            SKILLS
                        </button>
                    </AnchorLink>

                    <AnchorLink href="#troops">
                        <button
                            className={active === 'troops' ? 'active' : 'not-active'}
                            onClick={() => handleClick('troops')}
                        >
                            TROOPS
                        </button>
                    </AnchorLink>

                    <AnchorLink href="#weapons">
                        <button
                            className={active == 'weapons' ? 'active' : 'not-active'}
                            onClick={() => handleClick('weapons')}
                        >
                            WEAPONS & EQS.
                        </button>
                    </AnchorLink>

                </ul>
            </section>
        </>
    )
}

export default Sidebar