import React from 'react'
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";


const NavSystem = ({ idFlash }) => {

    const { user, authLoading, signOut } = useAuth();

    if (authLoading) {
        return (
            <span className="hidden xl:block text-white/60 tracking-[0.14em] uppercase text-sm">
                Syncing...
            </span>
        );
    }

    if (!user) {
        return (
            <Link to="/register" className="hidden xl:block sys-id">
                Sign Up
            </Link>
        );
    }

    return (
        <div className="flex items-center gap-5 xl:gap-10 relative">

            {
                authLoading ? (
                    <span className="hidden xl:block text-white/60 tracking-[0.14em] uppercase text-sm" >
                        Syncing...
                    </span >
                ) : user ? (
                    <div className={`hidden xl:flex items-center gap-1 sys-id ${idFlash ? "sys-id--flash" : ""}`}>
                        <span className="sys-id__text">
                            Hi, Player{" "} <br />
                            <span className="sys-id__name">{user.username}</span>
                        </span>
                        <span className="sys-id__scan" />
                        <button
                            className="system-link ml-2"
                            type="button"
                            onClick={() => signOut()}
                        >
                            <LogOut />
                        </button>
                    </div>
                ) : (
                    <Link to={"/register"} className="hidden xl:block sys-id">
                        Sign Up
                    </Link>
                )}

        </div>

    )
}

export default NavSystem