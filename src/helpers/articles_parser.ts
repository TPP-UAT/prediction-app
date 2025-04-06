import pdfToText from 'react-pdftotext'


export async function getKeywordsFromPDF(file: File): Promise<string[]> {
    if (!(file instanceof File)) {
        throw new Error("El archivo no es válido.");
    }
    try {
        const fullText = await pdfToText(file as any);
        const arrayKeywordsText = extractKeywordsFromText(fullText);
        return formatKeywords(arrayKeywordsText);
    } catch (error) {
        console.error("Error al procesar el archivo PDF:", error);
        throw error;
    }
}

function extractKeywordsFromText(text: string): string[] {
    const keywordPattern = /concepts:(.*?)1\. Introduction/gs;
    const matches = keywordPattern.exec(text);

    if (matches && matches[1]) {
        return matches[1]
            .split(/[\s,]+/)
            .map((kw) => kw.trim())
            .filter((kw) => kw.length > 0);
    }

    return [];
}

function formatKeywords(input: string[]): string[] {
    const result: string[] = [];
    let currentKeyword = "";

    for (let i = 0; i < input.length; i++) {
        const token = input[i];

        if (token === "(" && i + 2 < input.length && input[i + 2] === ")") {
            const id = input[i + 1]; // El ID está en la posición i + 1
            currentKeyword = currentKeyword.trim();
            result.push(`${currentKeyword} (${id})`);
            currentKeyword = "";
            i += 2;
        } else if (token !== ";") {
            currentKeyword += ` ${token}`;
        }
    }
    return result;
}
