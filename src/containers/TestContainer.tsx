import { FunctionComponent, useState } from 'react';
import Test from '../views/Test/Test';
import { useMutation } from "@tanstack/react-query";
import { predictFilesTest } from '../services/prediction.services';


const TestContainer: FunctionComponent = () => {
    const [prediction, setPrediction] = useState(null);

    // Mutations
    const { mutate } = useMutation({
        mutationFn: (file: any) => predictFilesTest(file),

        onSuccess: (prediction) => {
            setPrediction(prediction.data)
        },
        onError: () => {
            console.log("ERROR FILE PREDICHA")
        },
    });

    const onSubmitDoc = (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        mutate(formData)
    }

    return <Test onSubmitDoc={onSubmitDoc} prediction={prediction} />;

}

export default TestContainer;

