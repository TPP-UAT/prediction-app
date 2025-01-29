import { Term } from "./Term"
import Heap from "heap";

export class Thesaurus {
    private terms: { [key: string]: Term } = {};
    private name: string;

    constructor(name: string) {
        this.name = name; // Llamada a la función
    }

    // Getters
    getById(termId: string): Term | null {
        return this.terms[termId] || null;
    }

    getBranch(termId: string): Thesaurus {
        const rootTerm = this.getById(termId);
        if (!rootTerm) {
            throw new Error(`Term with ID ${termId} not found.`);
        }

        const branchThesaurus = new Thesaurus(`branch_${rootTerm.getName()}`);
        branchThesaurus.addTerm(rootTerm);
        this.addChildrenOfTerm(branchThesaurus, rootTerm);

        return branchThesaurus;
    }

    getSize(): number {
        return Object.keys(this.terms).length;
    }

    getTerms(): { [key: string]: Term } {
        return this.terms;
    }

    getByName(name: string): Term | undefined {
        return Object.values(this.terms).find(term => term.getName() === name);
    }

    getActiveFatherlessTerms(): string[] {
        return Object.values(this.terms)
            .filter(term => term.getParents().length === 0 && !term.getIsDeprecated())
            .map(term => term.getId());
    }

    getBranchChildren(termId: string): Term[] {
        const rootTerm = this.getById(termId);
        if (!rootTerm) {
            return [];
        }

        const children: Term[] = [];
        for (const childId of rootTerm.getChildren()) {
            const childTerm = this.getById(childId);
            if (childTerm) {
                children.push(childTerm);
                children.push(...this.getBranchChildren(childId));
            }
        }

        return children;
    }

    // Setters
    addChildrenOfTerm(thesaurus: Thesaurus, term: Term): void {
        for (const childId of term.getChildren()) {
            const childTerm = this.getById(childId);
            if (childTerm) {
                thesaurus.addTerm(childTerm);
                this.addChildrenOfTerm(thesaurus, childTerm);
            }
        }
    }

    addTerm(term: Term): void {
        this.terms[term.getId()] = term;
    }

    printNamesAndIds(): void {
        for (const [termKey, termValue] of Object.entries(this.terms)) {
            console.log(
                `Id: ${termKey}, Name: ${termValue.getName()}, Children: ${termValue.getChildren()}`
            );
        }
    }

    findShortestPath(startId: string, endId: string): string[] | null {
        if (!(startId in this.terms) || !(endId in this.terms)) {
            return null;
        }

        const distances: { [key: string]: number } = {};
        const previous: { [key: string]: string | null } = {};
        const heap = new Heap<[number, string]>((a, b) => a[0] - b[0]);

        Object.keys(this.terms).forEach(termId => {
            distances[termId] = Infinity;
            previous[termId] = null;
        });

        distances[startId] = 0;
        heap.push([0, startId]);

        while (!heap.empty()) {
            const [currentDistance, currentId] = heap.pop()!;

            if (currentId === endId) {
                break;
            }

            if (currentDistance > distances[currentId]) {
                continue;
            }

            const term = this.terms[currentId];

            for (const neighborId of [...term.getChildren(), ...term.getParents()]) {
                const newDistance = currentDistance + 1;
                if (newDistance < distances[neighborId]) {
                    distances[neighborId] = newDistance;
                    previous[neighborId] = currentId;
                    heap.push([newDistance, neighborId]);
                }
            }
        }

        const path: string[] = [];
        let currentId: string | null = endId;
        while (currentId) {
            path.push(currentId);
            currentId = previous[currentId];
        }

        path.reverse();
        return path[0] === startId ? path : null;
    }

}
