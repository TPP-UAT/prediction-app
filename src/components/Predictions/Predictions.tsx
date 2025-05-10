/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Prediction from "../Prediction/Prediction";
import { Column, Title } from "./styles";

interface PredictionsProps {
    predictions: any;
    title: string;
    keywords: any;
    probabilityMax: number;
    probabilityMin: number;
    shouldShowAccuracy: boolean;
    isRight?: boolean;
}

const Predictions = (props: PredictionsProps) => {
    const { predictions, title, keywords, probabilityMax, probabilityMin, shouldShowAccuracy, isRight = false } = props;

    return (
        <Column isRight={isRight}>
            <Title>{title}</Title>
            {predictions.map((item: any, _index: any) => {
                const prob = item.combined_probability;

                if (prob >= probabilityMin && prob <= probabilityMax) {
                    return (
                       <Prediction term={item} originalKeywords={keywords} shouldShowAccuracy={shouldShowAccuracy} isRight={isRight} /> 
                    );
                }

                return null;
            })}


        </Column>
    );
}

export default Predictions;
