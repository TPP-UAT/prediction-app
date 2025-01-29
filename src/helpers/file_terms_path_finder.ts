import { mapToThesaurus } from "../models/UATMapper";
interface DistanceResult {
  [key: string]: [number | null, string | string[]];
}

export async function calculateDistances(predictedIds: string[], originalIds: string[]): Promise<DistanceResult> {
  const thesaurus = await mapToThesaurus();

  const distances: DistanceResult = {};

  for (const predictedId of predictedIds) {
    for (const originalId of originalIds) {
      const shortestPath = thesaurus.findShortestPath(predictedId, originalId);

      if (shortestPath) {
        distances[`${predictedId},${originalId}`] = [shortestPath.length - 1, shortestPath];
      } else {
        // If no path is found, return None for that pair
        distances[`${predictedId},${originalId}`] = [null, "No path found"];
      }
    }
  }

  return distances;
}

const getFileTermsPath = async (predictedIds: string[], originalIds: string[]): Promise<{ predictedId: string, originalId: string, isPredictedInPath: boolean }[]> => {
  try {
    const result = await calculateDistances(predictedIds, originalIds);

    const pathsValidationResults: { predictedId: string, originalId: string, isPredictedInPath: boolean, path: Array<string>|string }[] = [];

    for (const [key, value] of Object.entries(result)) {
      const [predictedId, originalId] = key.split(",");

      const distance = value[0];
      const path = value[1];

      if (Array.isArray(path) && path.includes("1")) {
        pathsValidationResults.push({
          predictedId,
          originalId,
          isPredictedInPath: false,
          path
        });
      } else {
        const isPredictedInPath = path.includes(predictedId);

        pathsValidationResults.push({
          predictedId,
          originalId,
          isPredictedInPath,
          path
        });
      }
    }

    return pathsValidationResults;
  } catch (error) {
    console.error("An error occurred while calculating distances:", error);
    return [];
  }
};


export default getFileTermsPath;