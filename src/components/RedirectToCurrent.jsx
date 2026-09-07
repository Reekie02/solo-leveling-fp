import { Navigate } from "react-router-dom";
import { useCharacter } from "../context/CharacterContext";

// Fallback di rotta: manda all'ultimo personaggio selezionato
// (persistito in localStorage dal CharacterContext).
const RedirectToCurrent = () => {
    const { current } = useCharacter();

    return <Navigate to={`/${current}`} replace />;
};

export default RedirectToCurrent;
