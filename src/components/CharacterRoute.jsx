import { useParams } from "react-router-dom";
import characters from "../data/characters.json";
import App from "../App";
import RedirectToCurrent from "./RedirectToCurrent";

// ":characterId" matcha qualsiasi segmento: senza questo guard
// "/qualsiasicosa" renderizzava App col fallback jinwoo e l'URL sbagliato.
const CharacterRoute = () => {
    const { characterId } = useParams();

    if (!characters[characterId]) return <RedirectToCurrent />;

    return <App />;
};

export default CharacterRoute;
