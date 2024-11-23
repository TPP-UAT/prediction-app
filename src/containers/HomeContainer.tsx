import { FunctionComponent, useState } from 'react';
import Home from '../views/Home/Home';
import { useMutation } from "@tanstack/react-query";
import { predictFile } from '../services/prediction.services';


const HomeContainer: FunctionComponent = () => {
    const [prediction, setPrediction] = useState(null);

    // Mutations
    const { mutate, isError, error, data, isSuccess } = useMutation({
        mutationFn: (file: any) => predictFile(file),

        onSuccess: (prediction) => {
            console.log("FILE PREDICHA", prediction)
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
        console.log("Submit", formData)
    }

    return <Home onSubmitDoc={onSubmitDoc} prediction={prediction} />;

}

export default HomeContainer;

