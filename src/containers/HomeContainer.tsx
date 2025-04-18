/* eslint-disable @typescript-eslint/no-explicit-any */
import { FunctionComponent, useState } from 'react';
import { useMutation } from "@tanstack/react-query";
import Home from '../views/Home/Home';
import { predictFiles } from '../services/prediction.services';
import { getKeywordsFromPDF } from '../helpers/articles_parser';

const HomeContainer: FunctionComponent = () => {
    const [predictions, setPredictions] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [keywords, setKeywords] = useState<any>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showPath, setShowPath] = useState(false);
    
    const handlePrevious = () => {
        if (!predictions.length) return;
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : predictions.length - 1));
    };

    const handleNext = () => {
        if (!predictions) return;
        setCurrentIndex((prevIndex) => (prevIndex < predictions.length - 1 ? prevIndex + 1 : 0));
    };

    const { mutate } = useMutation({
        mutationFn: (file: any) => predictFiles(file),

        onSuccess: (prediction) => {
            setPredictions(prediction.data)
            setIsLoading(false);
        },
        onError: () => {
            setIsLoading(false);
        },
    });

    const onSubmitDoc = async (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setIsLoading(true);
        mutate(formData)
    
        const files = event.target.elements['files'].files
        if (files.length > 0) {
            const fileArray = Array.from(files as FileList);
            const filesKeywords: string[][] = [];
    
            for (let i = 0; i < files.length; i++) {
                const file = fileArray[i]
                try {
                    const extractedKeywords = await getKeywordsFromPDF(file);
                    filesKeywords.push(extractedKeywords);
                } catch (error) {
                    console.error(`Error procesando el archivo ${file.name}:`, error);
                    filesKeywords.push([]); // mantener la posición en el array
                }
            }
            setKeywords(filesKeywords);
    
        } else {
            console.log("No se seleccionaron archivos.");
        }
    }

    return (
        <Home 
            onSubmitDoc={onSubmitDoc} 
            fileName={predictions.length ? predictions[currentIndex].filename : ''}
            predictions={predictions.length ? predictions[currentIndex].predictions : []}
            accuracy={predictions.length ? predictions[currentIndex].accuracy : 0}
            keywords={predictions ? keywords[currentIndex] : []} 
            isLoading={isLoading} 
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            shouldShowAccuracy={keywords[0]?.length > 0}
            fileQuantity={predictions.length}
            setShowPath={setShowPath}
            showPath={showPath}
        />
    );
}

export default HomeContainer;

