import { createContext, useContext, useEffect, useMemo, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import characters from "../data/characters.json";

const CharacterContext = createContext(null);

export const CharacterProvider = ({ children }) => {
    const { characterId } = useParams();
    const navigate = useNavigate();

    const STORAGE_KEY = "sl:lastCharacter";

    const [current, setCurrent] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved && characters[saved] ? saved : "jinwoo";
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, current);
    }, [current]);

    useEffect(() => {
        if (characterId && characters[characterId]) {
            setCurrent(characterId);
        }
    }, [characterId]);

    const character = characters[current];

    const setCharacter = useCallback(
        (id) => {
            const target = String(id || "").trim();
            if (!target || !characters[target]) return;

            setCurrent(target);
            navigate(`/${target}`);
        },
        [navigate]
    );

    const value = useMemo(
        () => ({
            current,
            character,
            setCharacter,
            allCharacters: characters,
        }),
        [current, character, setCharacter]
    );

    return <CharacterContext.Provider value={value}>{children}</CharacterContext.Provider>;
};

export const useCharacter = () => useContext(CharacterContext);