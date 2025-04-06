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
    showPath: boolean;
}

const Predictions = (props: PredictionsProps) => {
    const { predictions, title, keywords, probabilityMax, probabilityMin, shouldShowAccuracy, showPath } = props;

    return (
        <Column>
            <Title>{title}</Title>
            {predictions.map((item: any, _index: any) => {
                const prob = item.combined_probability;

                if (prob >= probabilityMin && prob <= probabilityMax) {
                    return (
                       <Prediction term={item} originalKeywords={keywords} shouldShowAccuracy={shouldShowAccuracy} showPath={showPath} /> 
                    );
                }

                return null;
            })}


        </Column>
    );
}

export default Predictions;
