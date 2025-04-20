import thesaurus from '../data/UAT-pretty.json';

type TermData = {
    [key: string]: {
      pref_label: string | null;
      broader: string[];
      narrower: string[];
    };
};

/**
 * Returns the pref_label of a term given its ID.
 * @param termId The ID of the term (as string or number).
 * @returns The pref_label string or undefined if not found.
 */
export function getTermNameById(termId: string | number): string | undefined {
    const id = String(termId);
    const label = (thesaurus as TermData)[id]?.pref_label;
    return label ?? undefined;
}
