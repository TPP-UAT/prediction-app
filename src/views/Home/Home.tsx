import { FunctionComponent, useState } from 'react';
import { FormControl } from '@mui/base/FormControl';
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { 
    ArrowsDiv,
    Button, 
    ColumnDiv,
    DetailsColumnDiv, 
    DetailsRowDiv, 
    FormContainer, 
    HeaderDiv, 
    LogoImage,
    PredictionContainer,
    ProbabilityText, 
    RowDiv, 
    SubitleText, 
    SubtitleDetailsDiv, 
    TermDetailsTitle, 
    TermTitle, 
    TitleContainer, 
    TitleRowDiv 
} from './styles';

const Home: FunctionComponent<any> = (props: any) => {
    const { onSubmitDoc, prediction } = props;
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : Object.keys(prediction).length - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex < Object.keys(prediction).length - 1 ? prevIndex + 1 : 0));
    };

    return (
        <>
            <HeaderDiv>
                <LogoImage src="../../src/assets/AAS-Publishing-2-black.jpg" alt="Logo" />
            </HeaderDiv>

            <ColumnDiv>
                <TitleContainer> File Prediction </TitleContainer>
                <FormContainer>
                    <form onSubmit={onSubmitDoc}>
                        <FormControl defaultValue="" required>
                            <label htmlFor="file">Upload a file </label>
                            <input
                                id="file"
                                name="files"
                                type="file"
                                required
                                multiple
                                accept=".pdf"
                                style={{ marginTop: '10px' }}
                            />
                        </FormControl>

                        <Button type="submit">Submit</Button>
                    </form >
                </FormContainer>
                {prediction &&
                    <PredictionContainer>
                        <TitleRowDiv>
                            {Object.keys(prediction).length > 1 && (
                                <ArrowsDiv>
                                    <ArrowBackIos onClick={handlePrevious} style={{ cursor: "pointer" }} />
                                </ArrowsDiv>
                            )}
                            <SubitleText>Archivo: </SubitleText>
                            <p>{Object.keys(prediction)[currentIndex]}  </p>
                            {Object.keys(prediction).length > 1 && (
                                <ArrowsDiv>
                                    <ArrowForwardIos onClick={handleNext} style={{ cursor: "pointer" }} />
                                </ArrowsDiv>
                            )}
                        </TitleRowDiv>
                        <RowDiv>
                            <ColumnDiv>
                                <TermTitle> Terminos seguros</TermTitle>
                                {Object.keys(prediction[Object.keys(prediction)[currentIndex]]).map((id) => {
                                    const prob = prediction[Object.keys(prediction)[currentIndex]][id].probability;
                                    if (prob >= 0.75) {
                                        return (
                                            <DetailsRowDiv key={id}>
                                                <TermDetailsTitle>{prediction[Object.keys(prediction)[currentIndex]][id].name} ({id})</TermDetailsTitle>
                                                <DetailsColumnDiv>
                                                    <SubtitleDetailsDiv>
                                                        <TermDetailsTitle>Probabilidad:</TermDetailsTitle>
                                                        <ProbabilityText probability={prob * 100}>{(prob * 100).toFixed(2)}%</ProbabilityText>
                                                    </SubtitleDetailsDiv>
                                                </DetailsColumnDiv>
                                            </DetailsRowDiv>
                                        );
                                    }
                                    return null;
                                })}

                            </ColumnDiv>
                            <ColumnDiv>
                                <TermTitle> Terminos probables</TermTitle>
                                {Object.keys(prediction[Object.keys(prediction)[currentIndex]]).map((id) => {
                                    const prob = prediction[Object.keys(prediction)[currentIndex]][id].probability;
                                    if (prob < 0.75) {
                                        return (
                                            <DetailsRowDiv key={id}>
                                                <TermDetailsTitle>{prediction[Object.keys(prediction)[currentIndex]][id].name} ({id})</TermDetailsTitle>
                                                <DetailsColumnDiv>
                                                    <SubtitleDetailsDiv>
                                                        <TermDetailsTitle>Probabilidad:</TermDetailsTitle>
                                                        <ProbabilityText probability={prob * 100}>{(prob * 100).toFixed(2)}%</ProbabilityText>
                                                    </SubtitleDetailsDiv>
                                                </DetailsColumnDiv>
                                            </DetailsRowDiv>
                                        );
                                    }
                                    return null;
                                })}

                            </ColumnDiv>
                        </RowDiv>

                    </PredictionContainer>

                }

            </ColumnDiv>
        </>
    );
}

export default Home;
