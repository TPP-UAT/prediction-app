import { FunctionComponent, useState } from 'react';
import getFileTermsPath from '../../helpers/file_terms_path_finder'
import { FormControl } from '@mui/base/FormControl';
import CheckIcon from '@mui/icons-material/Check';
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import {
    ArrowsDiv,
    Button,
    ColumnDiv,
    DetailsColumnDiv,
    DetailsRowDiv,
    FormContainer,
    HeaderDiv,
    KeywordsDetails,
    LoadingDiv,
    LogoImage,
    PredictionContainer,
    ProbabilityText,
    RowDiv,
    SubitleText,
    SubtitleDetailsDiv,
    TermDetailsTitle,
    TermTitle,
    TitleActualKeywords,
    TitleContainer,
    TitleRowDiv
} from './styles';
import ReactLoading from 'react-loading';

const Home: FunctionComponent<any> = (props: any) => {
    const { onSubmitDoc, prediction, keywords, isLoading } = props;
    const [currentIndex, setCurrentIndex] = useState(0);
    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : Object.keys(prediction).length - 1));
    };

    const isKeywordCorrect = (keywordId: string): boolean => {
        const currentKeywords = keywords[Object.keys(prediction)[currentIndex]];
        return currentKeywords?.some((keyword: string) => keyword.includes(`(${keywordId})`));
    };

    const isInPath = async (keywordId: string): Promise<boolean> => {
        const elevenChildren = [
            "104", "1145", "1476", "1529", "1583", "343", "486", "563", "739", "804", "847"
        ];

        for (const key of Object.keys(keywords)) {
            const currentKeywords = keywords[key];
            console.log("currentKeywords",currentKeywords)
            
            for(const keyword of currentKeywords) {
                console.log("keyword en for", keyword)
                const originalKeywordId = keyword.match(/\((\d+)\)/);
                console.log("Keyword predicted:", keywordId, "| Original keyword:", originalKeywordId[1]);


                if (originalKeywordId) {
                    const originalId = originalKeywordId[1];
                    const termsPath = await getFileTermsPath(elevenChildren, [originalId]);
                    console.log("termsPath", termsPath);
                    //return true
                }
            }
        }

        return false;
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
                {isLoading && <LoadingDiv><ReactLoading type={'bubbles'} color={'#007aa0'} width={100} /></LoadingDiv>}
                {!isLoading && prediction &&
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
                                                <TermDetailsTitle>
                                                    {isKeywordCorrect(id) && <CheckIcon style={{ color: "green", marginRight: "5px" }} />}
                                                    {prediction[Object.keys(prediction)[currentIndex]][id].name} ({id})
                                                    {isInPath(id) && <CheckIcon style={{ color: "orange", marginRight: "5px" }} />}
                                                </TermDetailsTitle>
                                                <DetailsColumnDiv>
                                                    <SubtitleDetailsDiv>
                                                        <TermDetailsTitle>Probabilidad:</TermDetailsTitle>
                                                        <ProbabilityText probability={prob * 100} style={{ color: isKeywordCorrect(id) ? "green" : "black" }} >
                                                            {(prob * 100).toFixed(2)}%
                                                        </ProbabilityText>
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
                                                <TermDetailsTitle>
                                                    {isKeywordCorrect(id) && <CheckIcon style={{ color: "green", marginRight: "5px" }} />}
                                                    {prediction[Object.keys(prediction)[currentIndex]][id].name} ({id})</TermDetailsTitle>
                                                <DetailsColumnDiv>
                                                    <SubtitleDetailsDiv>
                                                        <TermDetailsTitle>Probabilidad:</TermDetailsTitle>
                                                        <ProbabilityText probability={prob * 100} style={{ color: isKeywordCorrect(id) ? "orange" : "black" }}>
                                                            {(prob * 100).toFixed(2)}%
                                                        </ProbabilityText>
                                                    </SubtitleDetailsDiv>
                                                </DetailsColumnDiv>
                                            </DetailsRowDiv>
                                        );
                                    }
                                    return null;
                                })}

                            </ColumnDiv>
                        </RowDiv>
                        {keywords && (
                            <ColumnDiv>
                                <TitleActualKeywords>Palabras claves actuales:</TitleActualKeywords>
                                <DetailsColumnDiv>
                                    <div>
                                        {keywords[Object.keys(prediction)[currentIndex]]?.map((keyword: any, index: any) => (
                                            <KeywordsDetails key={index}>{keyword}</KeywordsDetails>
                                        ))}
                                    </div>
                                </DetailsColumnDiv>
                            </ColumnDiv>)}
                    </PredictionContainer>

                }

            </ColumnDiv>
        </>
    );
}

export default Home;
