import { post } from "./api";

export async function predictFile(file: any): Promise<any> {
    console.log("FILE A ENVIAR", file)
    const response = await post("/predict/", file);
    //response = {
    //     'fileId':
    //     {
    //         'termId': {
    //             'probabilities': [0.6],
    //                 'multipliers': [0.4],
    //                     'multipliersNames': ['abstract'],
    //                         'parents': '739'
    //         }
    //     }
    // }

    // const response = {
    //     'abcde':
    //     {
    //         '104': {
    //             'probabilities': [0.6, 0.9],
    //             'multipliers': [0.4, 0.39],
    //             'multipliersNames': ['abstract', "tf-df"],
    //             'parents': ['739', '739']
    //         },
    //         '105': {
    //             'probabilities': [0.5, 0.85],
    //             'multipliers': [0.4, 0.39],
    //             'multipliersNames': ['abstract', "tf-df"],
    //             'parents': ['711']
    //         },
    //         '107': {
    //             'probabilities': [0.3],
    //             'multipliers': [0.5],
    //             'multipliersNames': ['abstract'],
    //             'parents': ['739']
    //         }
    //     }
    // }


    return response;
}