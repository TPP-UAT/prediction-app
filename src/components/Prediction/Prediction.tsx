/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { 
    ProbabilityDiv,
    Percentage,
    Title, 
    Row
} from "./styles";
import getFileTermsPath from '../../helpers/file_terms_path_finder'
import { getTermNameById } from '../../helpers/thesarurus';

interface PredictionProps {
    term: any;
    originalKeywords: any;
    shouldShowAccuracy: boolean;
    showPath: boolean;
}

const Prediction = (props: PredictionProps) => {
    const { term, originalKeywords, shouldShowAccuracy, showPath } = props;
    const { term: termId, combined_probability: probability, name } = term;
    const [pathResults, setPathResults] = useState<{ [key: string]: { inPath: boolean; path: string[]; color: string, title: string } }>({});
    const [mainPath, setMainPath] = useState<any>([]);
    const [openModal, setOpenModal] = useState(false);

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

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

        // Iterate over termWithPath, in each term call getTermNameById and make a small indentation
        if (termWithPath) {
            let marginLeft = -5;
            const path = termWithPath.path.map((termId: string, index: number) => {
                marginLeft += 5;
                return (
                    <div key={index} style={{ marginLeft }}>
                        <SubdirectoryArrowRightIcon style={{ color: "gray", height: "16px" }} />
                        <span style={{ color: "gray", fontSize: "14px" }}>{getTermNameById(termId)} ({termId})</span>
                    </div>
                );
            });
            return path;
        }
    }

    const isKeywordCorrect = (termId: string): boolean => {
        return originalKeywords?.some((keyword: string) => keyword.includes(`(${termId})`));
    };

    const isInPath = async (predictedKeywordId: string): Promise<{ inPath: boolean; path: string[], color: string, title: string }> => {
        const elevenChildren = [
            "104", "1145", "1476", "1529", "1583", "343", "486", "563", "739", "804", "847"
        ];

        for (const keyword of originalKeywords) {
            const originalKeywordId = keyword.match(/\((\d+)\)/);
            if (!originalKeywordId) continue;
            const originalId = originalKeywordId[1];
            const isMainKeyword = elevenChildren.includes(predictedKeywordId);
            if (isMainKeyword) {
                return { inPath: true, path: [], color: "yellow", title: "Término más general" };
            }
            const termsPath = await getFileTermsPath(elevenChildren, [originalId]);
        
            for (const termPath of termsPath) {
                const pathWithAllElements = termPath.path;
                const path = pathWithAllElements.slice(1, -1); // Delete first and last element
                if (path.includes(predictedKeywordId)) {
                    console.log("Keyword predicted:", predictedKeywordId, "| Original keyword:", originalId, "| Path:", pathWithAllElements);
                    return { inPath: true, path: pathWithAllElements, color: "yellow", title: "Término más general" };
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
                    return { inPath: true, path: pathWithAllElements, color: "orange", title: "Término más especifico" };
                }
            }
        }
        return { inPath: false, path: [], color: "black", title: '' };
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

    const renderModal = (props: any) => {
        const { open, onClose } = props;
        console.log('🚀 ~ term:', term);
        return (
            <Dialog open={open} onClose={onClose} maxWidth="lg">
                <DialogTitle>{term.name} ({term.term})</DialogTitle>
                <DialogContent>
                    <Row>
                        <Title>
                            Probabilidad:
                        </Title>
                        <Percentage probability={probability * 100}>
                            {(probability * 100).toFixed(2)}%
                        </Percentage>
                    </Row>
                    <Title style={{ textAlign: "left", marginTop: "10px" }}>
                        Camino desde los términos principales:
                    </Title>
                    {renderPath()}
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <>
            {renderModal({ open: openModal, onClose: handleClose })}
            <ProbabilityDiv key={termId}>
                <Row>
                    {shouldShowAccuracy && (
                        <>
                            {isKeywordCorrect(termId) ?
                                <CheckIcon titleAccess='Coincidencia exacta' style={{ color: "green", marginRight: "5px" }} />
                            :
                            <>
                                {pathResults[termId]?.inPath && (
                                    <CheckIcon titleAccess={pathResults[termId]?.title} style={{ color: pathResults[termId]?.color, marginRight: "5px" }} />
                                )}
                        </>
                    }
                    {!isKeywordCorrect(termId) && !pathResults[termId]?.inPath && (
                        <CloseIcon titleAccess='Término erróneo' style={{ color: "red", marginRight: "5px" }} />
                    )}
                        </>
                    )}
                    
                    <Title>
                        {name} ({termId}) - Probabilidad:
                    </Title>
                    <Percentage probability={probability * 100}>
                        {(probability * 100).toFixed(2)}%
                    </Percentage>
                    <InfoIcon 
                        onClick={handleOpen}
                        style={{ color: "gray", marginLeft: "5px", cursor: "pointer" }}
                        titleAccess="Más información"
                    />
                </Row>
            </ProbabilityDiv>
        </>
    );
}

export default Prediction;