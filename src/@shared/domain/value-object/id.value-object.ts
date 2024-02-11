import { v4 as uuid } from 'uuid'
import ValueObject from './value-object.interface';

export default class Id implements ValueObject {
    private id: string
    constructor(id?: string) {
        this.id = id || uuid();
    }

    getId() {
        return this.id;
    }
}