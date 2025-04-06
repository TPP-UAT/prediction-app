/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { FormControl } from '@mui/base/FormControl';
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import ReactLoading from 'react-loading';
import { 
    Arrows,
    Button, 
    ColumnDiv, 
    FormContainer, 
    Header, 
    LoadingDiv, 
    LogoImage, 
    Percentage, 
    PredictionContainer, 
    RowDiv, 
    SubitleText, 
    Title, 
    TitleRow
} from './styles';
import Predictions from '../../components/Predictions/Predictions';
import Keywords from '../../components/Keywords/Keywords';

interface HomeProps {
    onSubmitDoc: (event: React.FormEvent<HTMLFormElement>) => void;
    predictions: any;
    keywords: any;
    isLoading: boolean;
    handlePrevious: () => void;
    handleNext: () => void;
    fileName: string;
    shouldShowAccuracy: boolean;
    accuracy: number;
    fileQuantity: number;
    setShowPath: (showPath: boolean) => void;
    showPath: boolean;
}

const Home = (props: HomeProps) => {
    const { 
        onSubmitDoc, 
        predictions, 
        keywords, 
        isLoading,
        handleNext, 
        handlePrevious,
        fileName,
        accuracy,
        shouldShowAccuracy,
        fileQuantity,
        setShowPath,
        showPath
    } = props;

    const sortedPredictions = predictions.sort((a: any, b: any) => {
        const probA = a.combined_probability;
        const probB = b.combined_probability;

        if (probA > probB) return -1;
        if (probA < probB) return 1;
        return 0;
    });

    useEffect(() => {
        
    }
    , [predictions]);

    return (
        <div>
            <Header>
                <LogoImage src="../../src/assets/AAS-Publishing-2-black.jpg" alt="Logo" />
            </Header>

            <ColumnDiv>
                <Title> Predicción de términos claves - Unified Astronomy Thesaurus</Title>
                <FormContainer>
                    <form onSubmit={onSubmitDoc}>
                        <FormControl defaultValue="" required style={{ alignItems: 'center' }}>
                            <label htmlFor="file" style={{ display: "block" }}>
                                Adjuntar archivos PDF
                            </label>
                            <input
                                id="file"
                                name="files"
                                type="file"
                                required
                                multiple
                                accept=".pdf"
                                style={{ marginTop: '10px', alignContent: 'center' }}
                            />
                        </FormControl>
                        <Button type="submit">Enviar</Button>
                    </form >
                </FormContainer>
                {isLoading && <LoadingDiv><ReactLoading type={'bubbles'} color={'#007aa0'} width={100} /></LoadingDiv>}
                {!isLoading && predictions.length ?
                    <PredictionContainer>
                        <TitleRow>
                            {fileQuantity > 1 && 
                            <Arrows>
                                <ArrowBackIos onClick={handlePrevious} style={{ cursor: "pointer" }} />
                            </Arrows>}
                            <SubitleText isBold>Archivo: </SubitleText>
                            <SubitleText>{fileName}</SubitleText>
                            {fileQuantity > 1 && 
                            <Arrows>
                                <ArrowForwardIos onClick={handleNext} style={{ cursor: "pointer" }} />
                            </Arrows>}
                        </TitleRow>
                        {shouldShowAccuracy ?
                            <TitleRow>
                                <SubitleText isBold>Precisión: </SubitleText>
                                <Percentage probability={accuracy*100}>
                                    {(accuracy*100).toFixed(2)}%
                                </Percentage>
                            </TitleRow>
                            :
                            <TitleRow>
                                <SubitleText isBold>Mostrar caminos del UAT: </SubitleText>
                                <input type="checkbox" checked={showPath} onClick={() => setShowPath(!showPath)} />
                            </TitleRow>
                        }
                        <RowDiv>
                            <Predictions
                                predictions={sortedPredictions}
                                keywords={keywords}
                                title="Terminos seguros"
                                probabilityMin={0.75}
                                probabilityMax={1}
                                shouldShowAccuracy={shouldShowAccuracy}
                                showPath={showPath}
                            />
                            <Predictions
                                predictions={sortedPredictions}
                                keywords={keywords}
                                title="Terminos probables"
                                probabilityMin={0.5}
                                probabilityMax={0.749}
                                shouldShowAccuracy={shouldShowAccuracy}
                                showPath={showPath}
                            />
                        </RowDiv>
                        {shouldShowAccuracy && <Keywords keywords={keywords} predictions={sortedPredictions} />}
                    </PredictionContainer>
                    : null
                }
            </ColumnDiv>
        </div>
    )
}

export default Home;
