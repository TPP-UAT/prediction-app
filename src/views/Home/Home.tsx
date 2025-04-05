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
}

const Home2 = (props: HomeProps) => {
    const { 
        onSubmitDoc, 
        predictions, 
        keywords, 
        isLoading,
        handleNext, 
        handlePrevious,
        fileName
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
                <Title> File Prediction </Title>
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
                {!isLoading && predictions.length ?
                    <PredictionContainer>
                        <TitleRow>
                            <Arrows>
                                <ArrowBackIos onClick={handlePrevious} style={{ cursor: "pointer" }} />
                            </Arrows>
                            <SubitleText>Archivo: </SubitleText>
                            <p>{fileName}</p>
                            <Arrows>
                                <ArrowForwardIos onClick={handleNext} style={{ cursor: "pointer" }} />
                            </Arrows>
                        </TitleRow>
                        <RowDiv>
                            <Predictions
                                predictions={sortedPredictions}
                                keywords={keywords}
                                title="Terminos seguros"
                                probabilityMin={0.75}
                                probabilityMax={1}
                            />
                            <Predictions
                                predictions={sortedPredictions}
                                keywords={keywords}
                                title="Terminos probables"
                                probabilityMin={0.749}
                                probabilityMax={0.5}
                            />
                        </RowDiv>
                        <Keywords keywords={keywords} predictions={sortedPredictions} />
                    </PredictionContainer>
                    : null
                }
            </ColumnDiv>
        </div>
    )
}

export default Home2;
