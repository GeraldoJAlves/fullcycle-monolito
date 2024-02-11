import { Id } from "@/@shared/domain/value-object";

export default class BaseEntity {
    private id: Id;
    private createdAt: Date;
    private updatedAt: Date;

    constructor(id: Id, createdAt: Date, updatedAt: Date) {
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