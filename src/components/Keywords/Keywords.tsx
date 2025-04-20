/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import { getTermNameById } from '../../helpers/thesarurus';
import getFileTermsPath from "../../helpers/file_terms_path_finder";
import { Column, DetailsColumnDiv, KeywordsDetails, Row, Title } from "./styles";

interface KeywordsProps {
    keywords: any;
    predictions: any;
}

const Keywords = (props: KeywordsProps) => {
    const { keywords, predictions } = props;
    const [keywordsWithPaths, setKeywordsWithPaths] = useState<any>([]);
    const [originalKeywordsWithPaths, setOriginalKeywordsWithPaths] = useState<any>([]);
    const [keyword, setKeyword] = useState("");
    const [openModal, setOpenModal] = useState(false);

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const predictionsIds = useMemo(
        () => predictions.map((prediction: any) => prediction.term),
        [predictions]
    );

    useEffect(() => {
        const fetchPaths = async () => {
            const results = await Promise.all(
                keywords.map(async (keyword: any) => {
                    const originalKeywordid = keyword.match(/\((\d+)\)$/)?.[1];
                    const termsPath = await getFileTermsPath([originalKeywordid], predictionsIds);
                    const reversePath = await getFileTermsPath(predictionsIds, [originalKeywordid]);

                    // Add isReverse to reversePath array
                    reversePath.forEach((termPath: any) => {
                        termPath.isReverse = true;
                    });
                    return { keyword, termsPath, reversePath };
                })
            );
            setKeywordsWithPaths(results);
        };

        const fetchOriginalPaths = async () => {
            const elevenChildren = [
                "104", "1145", "1476", "1529", "1583", "343", "486", "563", "739", "804", "847"
            ];
            const results = await Promise.all(
                keywords.map(async (keyword: any) => {
                    const originalKeywordid = keyword.match(/\((\d+)\)$/)?.[1];
                    const termsPath = await getFileTermsPath(elevenChildren, [originalKeywordid]);

                    return termsPath;
                })
            );
            const flattened = results.flat();
            setOriginalKeywordsWithPaths(flattened);
        };
        
        fetchPaths();

        fetchOriginalPaths();
    }, [keywords, predictionsIds]);

    const renderIcon = (termsPath: any, reversePath: any) => {
        const combinedPaths = [...termsPath, ...reversePath];
        const found = combinedPaths.find((termPath: any) => Array.isArray(termPath.path));

        if (!found) {
            return <CloseIcon style={{ color: "red", marginRight: "5px" }} />;
        }

        if (found.path.length === 1) {
            return <CheckIcon style={{ color: "green", marginRight: "5px", marginTop: "-6px" }} />;
        }
        if (found.path.length > 1) {
            if (found.isReverse) {
                return <CheckIcon style={{ color: "yellow", marginRight: "5px", marginTop: "-6px" }} />;
            } else {
                return <CheckIcon style={{ color: "orange", marginRight: "5px", marginTop: "-6px" }} />;
            }
        }
        return null;
    }

    const renderPaths = (keyword: string) => {
        const originalKeywordid = keyword.match(/\((\d+)\)$/)?.[1];
        const termWithPath = originalKeywordsWithPaths.find((kw: any) => kw.originalId === originalKeywordid && kw.isPredictedInPath);
        
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

    const renderModal = (props: any) => {
        const { open, onClose } = props;
        console.log('🚀 ~ keyword:', keyword);
        return (
            <Dialog open={open} onClose={onClose} maxWidth="lg">
                <DialogTitle>{keyword}</DialogTitle>
                <DialogContent>
                    <KeywordsDetails>
                        Camino desde los términos principales:
                    </KeywordsDetails>
                    {renderPaths(keyword)}
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <>
            {renderModal({ open: openModal, onClose: handleClose })}
            <Column>
                <Title>Terminos originales:</Title>
                <DetailsColumnDiv>
                    <div>
                        {keywordsWithPaths.map(({ keyword, termsPath, reversePath}, index: any) => {
                            return (
                                <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: 'center' }}>
                                    <Row>
                                        {renderIcon(termsPath, reversePath)}
                                        <KeywordsDetails>{keyword}</KeywordsDetails>
                                        <InfoIcon
                                            onClick={() => {
                                                setKeyword(keyword);
                                                handleOpen();
                                            }}
                                            style={{ color: "gray", cursor: "pointer", marginLeft: "10px" }}
                                        />
                                    </Row>
                                </div>
                            );
                        })}
                    </div>
                </DetailsColumnDiv>
            </Column>
        </>
    );
};

export default Keywords;