import path from "path";
import { Thesaurus } from "./Thesaurus";
import { Term } from "./Term";
import UATFiltered from "../data/UAT-filtered.json";

interface JsonTerms {
  [key: string]: any;
}

export function mapJsonIdToTermId(jsonKey: string): string {
  return jsonKey.split("/").pop() || ""
}

export function mapJsonTermsToTermAttributes(termKeys: string[], termValues: any[]): Record<string, any> {
  const attributes: Record<string, any> = {};

  termKeys.forEach((key, index) => {
    const value = termValues[index];

    if (key.includes("prefLabel")) {
      attributes.name = value[0].value;
    }
    if (key.includes("altLabel")) {
      attributes.altNames = value.map((val: any) => val.value);
    }
    if (key.includes("broader")) {
      attributes.broader = value.map((val: any) => val.value.split("/").pop() || ""); 
    }
    if (key.includes("narrower")) {
      attributes.narrower = value.map((val: any) => val.value.split("/").pop() || "");
    }
    if (key.includes("deprecated")) {
      attributes.deprecated = true;
    }
    if (key.includes("label") && !attributes.name) {
      attributes.name = value[0].value;
    }
  });

  return attributes;
}

export function mapJsonToTerm(jsonKey: string, jsonTerms: JsonTerms): Term {
  const termKey = mapJsonIdToTermId(jsonKey);
  const term = new Term(termKey);

  const attributes = mapJsonTermsToTermAttributes(Object.keys(jsonTerms), Object.values(jsonTerms));

  if (attributes.name) {
    term.setName(attributes.name);
    term.setChildren(attributes.narrower || []);
    term.setParents(attributes.broader || []);
    term.setAltNames(attributes.altNames || []);
    term.setIsDeprecated(attributes.deprecated || false);
  }

  return term;
}

export async function mapToThesaurus() {
  try {
    const jsonData = UATFiltered;
    const thesaurus = new Thesaurus("UAT");

    for (const [key, obj] of Object.entries(jsonData)) {
      const term = mapJsonToTerm(key, obj);
      thesaurus.addTerm(term);
    }

    return thesaurus;
  } catch (error) {
    console.error("Error reading or processing the file:", error);
    throw error;
  }
}
