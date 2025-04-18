import { post } from "./api";

export async function predictFiles(files: any): Promise<any> {
    const response = await post("/predict", files);
    return response;
}

export async function recommendFiles(files: any): Promise<any> {
    const response = await post("/recommend", files);
    return response;
}

export async function predictFilesTest(files: any): Promise<any> {
    const response = await post("/predict-test", files);
    return response;
}
