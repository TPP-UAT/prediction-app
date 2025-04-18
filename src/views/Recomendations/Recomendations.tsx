import ReactLoading from 'react-loading';
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Header from "../../components/Header/Header";
import { 
    Arrows,
    ColumnDiv, 
    LoadingDiv,
    PredictionContainer,
    SubitleText,
    TitleRow,
} from "./styles";
import FilePicker from "../../components/FilePicker/FilePicker";
import RecommendationList from '../../components/RecommendationList/RecommendationList';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface RecomendationsProps {
    recommendations: any;
    isLoading: boolean;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    fileName: string;
    fileQuantity: number;
    handlePrevious: () => void;
    handleNext: () => void;
}

const Recomendations = (props: RecomendationsProps) => {
    const { recommendations, isLoading, onSubmit, fileName, fileQuantity, handleNext, handlePrevious } = props;
    console.log('🚀 ~ recomendations:', recommendations);

    return (
        <>
            <Header />
            <ColumnDiv>
                <FilePicker onSubmit={onSubmit} />
                {isLoading && <LoadingDiv><ReactLoading type={'bubbles'} color={'#007aa0'} width={100} /></LoadingDiv>}
                {!isLoading && recommendations.length ?
                    <PredictionContainer>
                        <TitleRow>
                            {fileQuantity > 1 && 
                            <Arrows>
                                <ArrowBackIos onClick={handlePrevious} style={{ cursor: "pointer" }} />
                            </Arrows>}
                            <SubitleText isBold>Archivo: </SubitleText>
                            <SubitleText>{fileName}</SubitleText>
                            {fileQuantity > 1 && 
                            <Arrows>
                                <ArrowForwardIos onClick={handleNext} style={{ cursor: "pointer" }} />
                            </Arrows>}
                        </TitleRow>
                        <RecommendationList
                            recommendations={recommendations}
                            title={"Recomendaciones"}
                        />
                    </PredictionContainer>
                    :
                    null
                }
            </ColumnDiv>
        </>
    );
} 

export default Recomendations;
