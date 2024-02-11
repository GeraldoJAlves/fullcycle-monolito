import { Id } from "@/modules/@shared/domain/value-object";

export default class BaseEntity {
    protected id: Id;
    protected createdAt: Date;
    protected updatedAt: Date;

    constructor(id?: Id, createdAt?: Date, updatedAt?: Date) {
        this.id = id || new Id();
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }

    getId() {
        return this.id
    }

    getCreatedAt() {
        return this.createdAt
    }

    getUpdatedAt() {
        return this.updatedAt
    }
}