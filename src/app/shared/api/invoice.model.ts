export class InvoiceModel {
    customerId: string;
    lines: LineModel[];

    constructor(customerId: string, lines: LineModel[]) {
        this.customerId = customerId;
        this.lines = lines;
    }
}

export class LineModel {
    classCode: string;
    description: string;
    amount: number;

    constructor(classCode: string, description: string, amount: number) {
        this.classCode = classCode;
        this.description = description;
        this.amount = amount;
    }
}
