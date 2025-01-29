export class Term {
    private id: string;
    private name: string;
    private children: string[];
    private parents: string[];
    private altNames: string[];
    private isDeprecated: boolean;

    constructor(id: string) {
        this.id = id;
        this.name = "";
        this.children = [];
        this.parents = [];
        this.altNames = [];
        this.isDeprecated = false;
    }

    // Getters
    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getChildren(): string[] {
        return this.children;
    }

    getParents(): string[] {
        return this.parents;
    }

    getIsDeprecated(): boolean {
        return this.isDeprecated;
    }

    // Setters
    setName(name: string): void {
        this.name = name;
    }

    setChildren(children: string[]): void {
        this.children = children;
    }

    setParents(parents: string[]): void {
        this.parents = parents;
    }

    setAltNames(altNames: string[]): void {
        this.altNames = altNames;
    }

    setIsDeprecated(isDeprecated: boolean): void {
        this.isDeprecated = isDeprecated;
    }

    // Utility
    getById(id: string): string | null {
        return this.id === id ? this.name : null;
    }
}
