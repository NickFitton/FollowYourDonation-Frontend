export class ProjectModel {
    id: string;
    name: string;
    amount: number;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.amount = 0;
    }
}
