import { useLocation, useNavigate } from "react-router-dom";
import { Container, LogoImage, NavButton, NavButtons, NavTitle } from "./styles";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <Container>
            <LogoImage src="../../src/assets/AAS-Publishing-2-black.jpg" alt="Logo" />
            <NavTitle>
                Predicción de términos claves - Unified Astronomy Thesaurus
            </NavTitle>

            <NavButtons>
                <NavButton onClick={() => navigate('/')} $active={isActive('/')}>
                    Predicciones
                </NavButton>
                <NavButton onClick={() => navigate('/recomendaciones')} $active={isActive('/recomendaciones')}>
                    Recomendaciones
                </NavButton>
            </NavButtons>
        </Container>
    )
}

export default Header;
