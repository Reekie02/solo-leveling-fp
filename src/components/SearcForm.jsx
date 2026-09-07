import React, { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";

const SearchForm = ({ formRef, character, characters = [], onSelect }) => {
    const wrapperRef = useRef(null);
    const inputRef = useRef(null);

    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(-1);


    // Filtraggio case-insensitive
    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return [];

        return characters
            .filter((c) => {
                const name = (c.name || "").toLowerCase();
                const nickname = (c.nickname || "").toLowerCase();
                const id = (c.id || "").toLowerCase();

                // match su più campi (personalizza come vuoi)
                return (
                    name.includes(q) ||
                    nickname.includes(q) ||
                    id.includes(q)
                );
            })
            .slice(0, 6); // limita a 6 risultati
    }, [query, characters]);

    const [expanded, setExpanded] = useState(false);
    const dropdownOpen = expanded && query.trim() && results.length > 0;

    // Apri/chiudi dropdown in base a query+results
    useEffect(() => {
        if (query.trim() && results.length > 0) setOpen(true);
        else setOpen(false);
        setActiveIndex(-1);
    }, [query, results.length]);

    // Click fuori → chiudi
    useEffect(() => {
        const onDocMouseDown = (e) => {
            if (!wrapperRef.current) return;
            if (!wrapperRef.current.contains(e.target)) {
                setExpanded(false)
                setOpen(false);
                setQuery("")
            }
        };

        const onKeyDown = (e) => {
            if (!open) return;

            if (e.key === "Escape") {
                setOpen(false);
                inputRef.current?.blur();
            }

            if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveIndex((i) => Math.min(i + 1, results.length - 1));
            }

            if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveIndex((i) => Math.max(i - 1, 0));
            }

            if (e.key === "Enter" && activeIndex >= 0) {
                e.preventDefault();
                handleSelect(results[activeIndex]);
            }
        };

        document.addEventListener("mousedown", onDocMouseDown);
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("mousedown", onDocMouseDown);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [open, results, activeIndex]);

    const handleSelect = (c) => {
        setQuery("");
        setExpanded(false);
        setOpen(false);

        if (onSelect) onSelect(c);
    };

    return (
        <div ref={wrapperRef} className="relative">
            <form
                ref={formRef}
                className={`flex items-center rounded-full md:rounded-4xl py-1 form-custom ${expanded ? "gap-2 search-open px-3 system-glow" : "gap-0 search-closed px-2.5 justify-center"
                    }`}
                style={{ backgroundColor: character?.accentColor || "#0f1338" }}
                onSubmit={(e) => e.preventDefault()}
            >

                <button
                    className="h-8 flex items-center justify-center"
                    type="button"
                    onClick={() => {
                        if (expanded) {
                            setExpanded(false);
                            setOpen(false);
                            setQuery("");
                        } else {
                            setExpanded(true);
                            requestAnimationFrame(() => inputRef.current?.focus());
                        }
                    }}
                >
                    <Search size={open ? 22 : 24} className="cursor-pointer" />
                </button>

                <input
                    ref={inputRef}
                    type="text"
                    name="search"
                    id="search"
                    value={query}
                    placeholder="Search Hero..."
                    className={`focus:outline-0 text-lg md:block bg-transparent transition-all duration-500 ease-in-out ${expanded ? "w-30 opacity-100" : "w-0 opacity-0"}`}
                    onChange={(e) => {
                        const v = e.target.value;
                        setQuery(v);
                        if (v.trim()) {
                            setExpanded(true);
                            setOpen(true);
                        }
                    }}
                    onFocus={() => {
                        setExpanded(true);
                        if (query.trim() && results.length > 0) setOpen(true);
                    }}
                />
            </form>

            {/* Dropdown */}
            {dropdownOpen && (
                <div
                    className="absolute left-0 right-0 mt-2 rounded-xl top-full z-50 overflow-hidden border border-white/10 backdrop-blur-md"
                    style={{ backgroundColor: "rgba(10,18,36,0.92)" }}
                >
                    {results.map((c, idx) => (
                        <button
                            key={c.id || c.name || idx}
                            type="button"
                            onClick={() => handleSelect(c)}
                            onMouseEnter={() => setActiveIndex(idx)}
                            className={`w-full text-left px-3 py-2 flex items-center gap-3 hover:bg-white/10 ${idx === activeIndex ? "bg-white/10" : ""
                                }`}
                        >
                            {/* Avatar opzionale */}
                            {c.image && (
                                <img
                                    src={c.image}
                                    alt={c.name}
                                    className="h-8 w-8 rounded-full object-cover"
                                />
                            )}

                            <div className="flex flex-col">
                                <span className="text-white text-sm font-semibold">
                                    {c.name}
                                </span>
                                {(c.rank || c.role) && (
                                    <span className="text-white/60 text-xs">
                                        {c.rank || c.role}
                                    </span>
                                )}
                            </div>
                        </button>
                    ))}

                    {results.length === 0 && (
                        <div className="px-3 py-2 text-white/60 text-sm">
                            No results
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchForm;