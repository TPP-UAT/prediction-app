import { post } from "./api";

export async function predictFileTest(file: any): Promise<any> {
    console.log("FILE A ENVIAR", file)
    const response = await post("/predict/", file);
    console.log("RESPONSE", response)

    return response;
}

export async function predictFile(file: any): Promise<any> {
    console.log("FILE A ENVIAR", file)
    //const response = await post("/predict/", file);
    const response = {
        "data": {
            "acdacd": {
                "241": {
                    "probability": 0.9920117259025574,
                    "name": "Circumstellar matter"
                },
                "486": {
                    "probability": 0.9800344705581665,
                    "name": "Exoplanet astronomy"
                },
                "489": {
                    "probability": 0.9977743029594421,
                    "name": "Exoplanet detection methods"
                },
                "492": {
                    "probability": 0.01459319144487381,
                    "name": "Exoplanet formation"
                },
                "506": {
                    "probability": 0.40230387449264526,
                    "name": "Extragalactic astronomy"
                },
                "563": {
                    "probability": 0.9866576790809631,
                    "name": "Galactic and extragalactic astronomy"
                },
                "612": {
                    "probability": 0.9995299577713013,
                    "name": "Galaxy physics"
                },
                "847": {
                    "probability": 0.532246313989162445,
                    "name": "Interstellar medium"
                },
                "1145": {
                    "probability": 0.9788227677345276,
                    "name": "Observational astronomy"
                },
                "1529": {
                    "probability": 0.017935359850525856,
                    "name": "Solar system astronomy"
                },
                "1567": {
                    "probability": 0.0214847419410944,
                    "name": "Star clusters"
                },
                "1583": {
                    "probability": 0.9132463335990906,
                    "name": "Stellar astronomy"
                },
                "1627": {
                    "probability": 0.019760530441999435,
                    "name": "Stellar remnants"
                },
                "1684": {
                    "probability": 0.9947091341018677,
                    "name": "Astronomical techniques"
                },
                "2205": {
                    "probability": 0.011125915683805943,
                    "name": "Exoplanet migration"
                }
            }
        }
    }

    return response;
}
