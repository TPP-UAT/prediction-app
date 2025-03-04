import { FunctionComponent, useState, useEffect } from 'react';
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
import { orange } from '@mui/material/colors';

const Home: FunctionComponent<any> = (props: any) => {
    const { onSubmitDoc, prediction, keywords, isLoading } = props;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [pathResults, setPathResults] = useState<Record<string, { inPath: boolean; path: string[], color: string }>>({});

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : Object.keys(prediction).length - 1));
    };

    const isKeywordCorrect = (keywordId: string): boolean => {
        const currentKeywords = keywords[Object.keys(prediction)[currentIndex]];
        return currentKeywords?.some((keyword: string) => keyword.includes(`(${keywordId})`));
    };

    const wasPredictedCorrectly = (originalKeyword: string): boolean => {
        const originalKeywordId = originalKeyword.match(/\((\d+)\)/);

        let originalId;
        if (originalKeywordId) {
            originalId = originalKeywordId[1];
        }
        const predictionKey = Object.keys(prediction)[0];
        if (!predictionKey) return false;

        return prediction[predictionKey]?.hasOwnProperty(originalId) ?? false;
    };

    const isInPath = async (predictedKeywordId: string): Promise<{ inPath: boolean; path: string[], color: string }> => {
        const elevenChildren = [
            "104", "1145", "1476", "1529", "1583", "343", "486", "563", "739", "804", "847"
        ];

        for (const key of Object.keys(keywords)) {
            const currentKeywords = keywords[key];
            for (const keyword of currentKeywords) {
                const originalKeywordId = keyword.match(/\((\d+)\)/);
                const originalId = originalKeywordId[1];
                const termsPath = await getFileTermsPath(elevenChildren, [originalId]);
                for (const termPath of termsPath) {
                    const pathWithAllElements = termPath.path

                    const path = pathWithAllElements.slice(1, -1) //Delete first and last element
                    if (path.includes(predictedKeywordId)) {
                        console.log("Keyword predicted:", predictedKeywordId, "| Original keyword:", originalId, "| Path:", pathWithAllElements);
                        return { inPath: true, path: pathWithAllElements, color: "orange" };
                    }
                }
            }
        }

        for (const key of Object.keys(keywords)) {
            const currentKeywords = keywords[key];
            for (const keyword of currentKeywords) {
                const originalKeywordId = keyword.match(/\((\d+)\)/);
                const originalId = originalKeywordId[1];
                const termsPath = await getFileTermsPath(elevenChildren, [predictedKeywordId])
                for (const termPath of termsPath) {
                    const pathWithAllElements = termPath.path
                    const path = pathWithAllElements.slice(1, -1) //Delete first and last element
                    if (path.includes(originalId)) {
                        console.log("CHILDREN - Keyword predicted:", predictedKeywordId, "| Original keyword:", originalId, "| Path:", pathWithAllElements);
                        return { inPath: true, path: pathWithAllElements, color: "red" };
                    }
                }
            }
        }





        return { inPath: false, path: [], color: "black" };
    };

    useEffect(() => {
        const checkPaths = async () => {
            const results: Record<string, { inPath: boolean; path: string[], color: string }> = {};
            for (const id of Object.keys(prediction[Object.keys(prediction)[currentIndex]])) {
                const pathData = await isInPath(id);
                results[id] = pathData;
            }
            setPathResults(results);
        };

        checkPaths();
    }, [prediction, currentIndex]);



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
                                                    {pathResults[id]?.inPath && (
                                                        <CheckIcon style={{ color: pathResults[id]?.color, marginRight: "5px" }} />
                                                    )}
                                                    {isKeywordCorrect(id) && <CheckIcon style={{ color: "green", marginRight: "5px" }} />}
                                                    {prediction[Object.keys(prediction)[currentIndex]][id].name} ({id})
                                                    {pathResults[id]?.inPath && (
                                                        <span style={{ color: "gray", fontSize: "12px" }}> Path: {pathResults[id]?.path.join(", ")}</span>
                                                    )}

                                                </TermDetailsTitle>
                                                <DetailsColumnDiv>
                                                    <SubtitleDetailsDiv>
                                                        <TermDetailsTitle>Probabilidad:</TermDetailsTitle>
                                                        <ProbabilityText probability={prob * 100}>
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
                                                    {pathResults[id]?.inPath && (
                                                        <CheckIcon style={{ color: pathResults[id]?.color, marginRight: "5px" }} />
                                                    )}
                                                    {isKeywordCorrect(id) && <CheckIcon style={{ color: "green", marginRight: "5px" }} />}
                                                    {prediction[Object.keys(prediction)[currentIndex]][id].name} ({id})
                                                    {pathResults[id]?.inPath && (
                                                        <>
                                                            <span style={{ color: "gray", fontSize: "12px" }}> Path: {pathResults[id]?.path.join(", ")}</span>
                                                        </>
                                                    )}
                                                </TermDetailsTitle>
                                                <DetailsColumnDiv>
                                                    <SubtitleDetailsDiv>
                                                        <TermDetailsTitle>Probabilidad:</TermDetailsTitle>
                                                        <ProbabilityText probability={prob * 100} >
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
                                            <div key={index} style={{ display: "flex", alignItems: "center" }}>
                                                {wasPredictedCorrectly(keyword) && (
                                                    <CheckIcon style={{ color: "green", marginRight: "5px" }} />
                                                )}
                                                <KeywordsDetails>{keyword}</KeywordsDetails>
                                            </div>
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
