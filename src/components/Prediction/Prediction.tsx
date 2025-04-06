/* eslint-disable @typescript-eslint/no-explicit-any */
import CheckIcon from '@mui/icons-material/Check';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import { 
    ProbabilityDiv,
    Percentage,
    Title, 
    Row
} from "./styles";
import getFileTermsPath from '../../helpers/file_terms_path_finder'
import { useEffect, useState } from 'react';

interface PredictionProps {
    term: any;
    originalKeywords: any;
    shouldShowAccuracy: boolean;
    showPath: boolean;
}

const Prediction = (props: PredictionProps) => {
    const { term, originalKeywords, shouldShowAccuracy, showPath } = props;
    const { term: termId, combined_probability: probability, name } = term;
    const [pathResults, setPathResults] = useState<{ [key: string]: { inPath: boolean; path: string[]; color: string } }>({});
    const [mainPath, setMainPath] = useState<any>([]);

    useEffect(() => {
        const fetchOriginalPaths = async () => {
            const elevenChildren = [
                "104", "1145", "1476", "1529", "1583", "343", "486", "563", "739", "804", "847"
            ];
            
            const termsPath = await getFileTermsPath(elevenChildren, [termId]);
            const flattened = termsPath.flat();
            setMainPath(flattened);
        };

        fetchOriginalPaths();
    }, [termId]);

    const renderPath = () => {
        const termWithPath = mainPath.find(kw => kw.isPredictedInPath);
        return (
            <>
                <SubdirectoryArrowRightIcon style={{ color: "gray", height: "18px" }} />
                <span style={{ color: "gray", fontSize: "14px" }}> Camino: [{termWithPath?.path.join(", ")}]</span>
            </>
        );
    }

    const isKeywordCorrect = (termId: string): boolean => {
        return originalKeywords?.some((keyword: string) => keyword.includes(`(${termId})`));
    };

    const isInPath = async (predictedKeywordId: string): Promise<{ inPath: boolean; path: string[], color: string }> => {
        const elevenChildren = [
            "104", "1145", "1476", "1529", "1583", "343", "486", "563", "739", "804", "847"
        ];

        for (const keyword of originalKeywords) {
            const originalKeywordId = keyword.match(/\((\d+)\)/);
            if (!originalKeywordId) continue;
            const originalId = originalKeywordId[1];
            const isMainKeyword = elevenChildren.includes(predictedKeywordId);
            if (isMainKeyword) {
                return { inPath: true, path: [], color: "yellow" };
            }
            const termsPath = await getFileTermsPath(elevenChildren, [originalId]);
        
            for (const termPath of termsPath) {
                const pathWithAllElements = termPath.path;
                const path = pathWithAllElements.slice(1, -1); // Delete first and last element
                if (path.includes(predictedKeywordId)) {
                    console.log("Keyword predicted:", predictedKeywordId, "| Original keyword:", originalId, "| Path:", pathWithAllElements);
                    return { inPath: true, path: pathWithAllElements, color: "yellow" };
                }
            }
        }

        for (const keyword of originalKeywords) {
            const originalKeywordId = keyword.match(/\((\d+)\)/);
            if (!originalKeywordId) continue;
            const originalId = originalKeywordId[1];
        
            const termsPath = await getFileTermsPath(elevenChildren, [predictedKeywordId]);
        
            for (const termPath of termsPath) {
                const pathWithAllElements = termPath.path;
                const path = pathWithAllElements.slice(1, -1); // Delete first and last element
        
                if (path.includes(originalId)) {
                    console.log("CHILDREN - Keyword predicted:", predictedKeywordId, "| Original keyword:", originalId, "| Path:", pathWithAllElements);
                    return { inPath: true, path: pathWithAllElements, color: "orange" };
                }
            }
        }
        return { inPath: false, path: [], color: "black" };
    };

    useEffect(() => {
        const fetchPath = async () => {
            if (!termId) return;
            const result = await isInPath(termId);
            setPathResults(prev => ({ ...prev, [termId]: result }));
        };
    
        fetchPath();
    }, [termId]);

    const shouldShowPath = (shouldShowAccuracy && !isKeywordCorrect(termId) && !pathResults[termId]?.inPath) || showPath;

    return (
        <ProbabilityDiv key={termId}>
            <Row>
                {shouldShowAccuracy && (
                    <>
                        {isKeywordCorrect(termId) ?
                            <CheckIcon style={{ color: "green", marginRight: "5px" }} />
                        :
                        <>
                            {pathResults[termId]?.inPath && (
                                <CheckIcon style={{ color: pathResults[termId]?.color, marginRight: "5px" }} />
                            )}
                    </>
                }
                {!isKeywordCorrect(termId) && !pathResults[termId]?.inPath && (
                    <CloseIcon style={{ color: "red", marginRight: "5px" }} />
                )}
                    </>
                )}
                
                <Title>
                    {name} ({termId}) - Probabilidad:
                </Title>
                <Percentage probability={probability * 100}>
                    {(probability * 100).toFixed(2)}%
                </Percentage>
            </Row>
            <Row style={{ paddingLeft: "35px" }}>
                {shouldShowPath && renderPath()}
                {shouldShowAccuracy && !isKeywordCorrect(termId) && pathResults[termId]?.inPath && (
                    <>
                        <SubdirectoryArrowRightIcon style={{ color: "gray", height: "18px" }} />
                        <span style={{ color: "gray", fontSize: "14px" }}> Camino: [{pathResults[termId]?.path.join(", ")}]</span>
                    </>
                )}
            </Row>
        </ProbabilityDiv>
    );
}

export default Prediction;