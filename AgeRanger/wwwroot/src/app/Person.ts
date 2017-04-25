export class Person {
    id?: number;
    lastName: string;
    firstName: string;
    age: number;
    ageGroup: string;

    constructor(name?:Partial<Person>) {
        Object.assign(this, name);
    }
}