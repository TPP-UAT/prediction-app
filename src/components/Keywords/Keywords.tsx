/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import getFileTermsPath from "../../helpers/file_terms_path_finder";
import { Column, DetailsColumnDiv, KeywordsDetails, Title } from "./styles";

interface KeywordsProps {
    keywords: any;
    predictions: any;
}

const Keywords = (props: KeywordsProps) => {
    const { keywords, predictions } = props;
    const [keywordsWithPaths, setKeywordsWithPaths] = useState<any>([]);
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

        fetchPaths();
    }, [keywords, predictionsIds]);

    const renderIcon = (termsPath: any, reversePath: any) => {
        const combinedPaths = [...termsPath, ...reversePath];
        console.log('🚀 ~ combinedPaths:', combinedPaths);
        const found = combinedPaths.find((termPath: any) => Array.isArray(termPath.path));

        if (!found) {
            return <CloseIcon style={{ color: "red", marginRight: "5px", marginTop: "-13px" }} />;
        }

        if (found.path.length === 1) {
            return <CheckIcon style={{ color: "green", marginRight: "5px", marginTop: "-13px" }} />;
        }
        if (found.path.length > 1) {
            if (found.isReverse) {
                return <CheckIcon style={{ color: "yellow", marginRight: "5px", marginTop: "-13px" }} />;
            } else {
                return <CheckIcon style={{ color: "orange", marginRight: "5px", marginTop: "-13px" }} />;
            }
        }
        return null;
    }


    return (
        <Column>
            <Title>Terminos originales:</Title>
            <DetailsColumnDiv>
                <div>
                    {keywordsWithPaths.map(({ keyword, termsPath, reversePath}, index: any) => {
                        return (
                            <div key={index} style={{ display: "flex", alignItems: "center", textAlign: 'center' }}>
                                {renderIcon(termsPath, reversePath)}
                                <KeywordsDetails>{keyword}</KeywordsDetails>
                            </div>
                        );
                    })}
                </div>
            </DetailsColumnDiv>
        </Column>
    );
};

export default Keywords;