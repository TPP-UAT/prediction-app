/* eslint-disable @typescript-eslint/no-explicit-any */
import { FunctionComponent, useState } from 'react';
import { useMutation } from "@tanstack/react-query";
import Recomendations from '../views/Recomendations/Recomendations';
import { recommendFiles } from '../services/prediction.services';

const RecomendationsContainer: FunctionComponent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [recommendations, setRecommendations] = useState<any>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = () => {
        if (!recommendations.length) return;
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : recommendations.length - 1));
    };

    const handleNext = () => {
        if (!recommendations) return;
        setCurrentIndex((prevIndex) => (prevIndex < recommendations.length - 1 ? prevIndex + 1 : 0));
    };

    const { mutate } = useMutation({
        mutationFn: (file: any) => recommendFiles(file),

        onSuccess: (recommendation) => {
            setRecommendations(recommendation.data)
            setIsLoading(false);
        },
        onError: () => {
            setIsLoading(false);
        },
    });

    const onSubmit = async (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setIsLoading(true);
        mutate(formData);
    }

    return (
        <Recomendations
            recommendations={recommendations.length ? recommendations[currentIndex].recommendations : []}
            fileName={recommendations.length ? recommendations[currentIndex].filename : ''}
            isLoading={isLoading}
            onSubmit={onSubmit}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
        />
    );
}

export default RecomendationsContainer;

