import { FunctionComponent, useState } from 'react';
import { FormControl } from '@mui/base/FormControl';
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { ArrowsDiv, Button, ColumnDiv, DetailsColumnDiv, DetailsRowDiv, FormContainer, PredictionContainer, RowDiv, SubitleText, SubtitleDetailsDiv, TermDetailsText, TermDetailsTitle, TermTitle, TitleContainer, TitleRowDiv } from './styles';

const Home: FunctionComponent<any> = (props: any) => {
    const { onSubmitDoc, prediction } = props;

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = () => {
        console.log("Previo")
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : Object.keys(prediction).length - 1));
    };

    const handleNext = () => {
        console.log("Post")

        setCurrentIndex((prevIndex) => (prevIndex < Object.keys(prediction).length - 1 ? prevIndex + 1 : 0));
    };

    return (
        <>
            <ColumnDiv>
                <TitleContainer> Files predictor </TitleContainer>
                <FormContainer>
                    <form onSubmit={onSubmitDoc}  >
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
                            <p>{Object.keys(prediction).length === 1 ? Object.keys(prediction)[0] : prediction[currentIndex]}</p>
                            {Object.keys(prediction).length > 1 && (
                                <ArrowsDiv>
                                    <ArrowBackIos onClick={handlePrevious} style={{ cursor: "pointer" }} />
                                </ArrowsDiv>
                            )}
                            <SubitleText>Archivo: </SubitleText>
                            <p>{Object.keys(prediction)[currentIndex]}  </p>
                            <p>{Object.keys(prediction).length === 1 ? Object.keys(prediction)[0] : prediction[currentIndex]}</p>
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
                                    const probabilities = prediction[Object.keys(prediction)[currentIndex]][id].probabilities;
                                    if (probabilities.some((prob: number) => prob >= 0.75)) {
                                        return (
                                            <DetailsRowDiv key={id}>
                                                <TermDetailsTitle>{id}.</TermDetailsTitle>
                                                <DetailsColumnDiv>
                                                    <SubtitleDetailsDiv>
                                                        <TermDetailsTitle>Probabilities:</TermDetailsTitle>
                                                        <TermDetailsText> [{probabilities.join(", ")} ]</TermDetailsText>
                                                    </SubtitleDetailsDiv>
                                                    <SubtitleDetailsDiv>
                                                        <TermDetailsTitle>Input creator:</TermDetailsTitle>
                                                        <TermDetailsText>
                                                            {prediction[Object.keys(prediction)[currentIndex]][id].multipliersNames.join(", ")}
                                                        </TermDetailsText>
                                                    </SubtitleDetailsDiv>
                                                    <SubtitleDetailsDiv>
                                                        <TermDetailsTitle>Parents:</TermDetailsTitle>
                                                        <TermDetailsText>
                                                            {prediction[Object.keys(prediction)[currentIndex]][id].parent.join(", ")}
                                                        </TermDetailsText>
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
                                    const probabilities = prediction[Object.keys(prediction)[currentIndex]][id].probabilities;
                                    if (probabilities.every((prob: number) => prob < 0.75)) {
                                        return (
                                            <DetailsRowDiv key={id}>
                                                <TermDetailsTitle>{id}.</TermDetailsTitle>
                                                <DetailsColumnDiv>
                                                    <SubtitleDetailsDiv>
                                                        <TermDetailsTitle>Probabilities:</TermDetailsTitle>
                                                        <TermDetailsText> [{probabilities.join(", ")} ]</TermDetailsText>
                                                    </SubtitleDetailsDiv>
                                                    <SubtitleDetailsDiv>
                                                        <TermDetailsTitle>Input creator:</TermDetailsTitle>
                                                        <TermDetailsText>
                                                            {prediction[Object.keys(prediction)[currentIndex]][id].multipliersNames.join(", ")}
                                                        </TermDetailsText>
                                                    </SubtitleDetailsDiv>
                                                    <SubtitleDetailsDiv>
                                                        <TermDetailsTitle>Parents:</TermDetailsTitle>
                                                        <TermDetailsText>
                                                            {prediction[Object.keys(prediction)[currentIndex]][id].parent.join(", ")}
                                                        </TermDetailsText>
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
