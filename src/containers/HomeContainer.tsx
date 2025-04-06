/* eslint-disable @typescript-eslint/no-explicit-any */
import { FunctionComponent, useState } from 'react';
import Home from '../views/Home/Home';
import { useMutation } from "@tanstack/react-query";
import { predictFiles } from '../services/prediction.services';
import { getKeywordsFromPDF } from '../helpers/articles_parser';

const HomeContainer: FunctionComponent = () => {
    const [prediction, setPrediction] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [keywords, setKeywords] = useState<Record<string, string[]>>({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [shouldShowAccuracy, setShouldShowAccuracy] = useState(false);
    
    const handlePrevious = () => {
        if (!prediction) return;
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : Object.keys(prediction).length - 1));
    };

    const handleNext = () => {
        if (!prediction) return;
        setCurrentIndex((prevIndex) => (prevIndex < Object.keys(prediction).length - 1 ? prevIndex + 1 : 0));
    };

    const { mutate } = useMutation({
        mutationFn: (file: any) => predictFiles(file),

        onSuccess: (prediction) => {
            setPrediction(prediction.data)
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
            const filesKeywords: Record<string, string[]> = {};

            for (let i = 0; i < files.length; i++) {
                const file = fileArray[i]
                try {
                    const extractedKeywords = await getKeywordsFromPDF(file);
                    filesKeywords[file.name.replace(/\.[^/.]+$/, "")] = extractedKeywords;
                    if (extractedKeywords.length > 0) {
                        setShouldShowAccuracy(true);
                    }
                } catch (error) {
                    console.error(`Error procesando el archivo ${file.name}:`, error);
                }
            }
            setKeywords(filesKeywords)

        } else {
            console.log("No se seleccionaron archivos.");
        }
    }

    return (
        <Home 
            onSubmitDoc={onSubmitDoc} 
            fileName={prediction ? Object.keys(prediction)[currentIndex] : ''}
            predictions={prediction ? prediction[Object.keys(prediction)[currentIndex]] : []} 
            keywords={prediction ? keywords[Object.keys(prediction)[currentIndex]] : []} 
            isLoading={isLoading} 
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            shouldShowAccuracy={shouldShowAccuracy}
        />
    );
}

export default HomeContainer;

