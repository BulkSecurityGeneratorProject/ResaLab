import { BaseEntity, User } from './../../shared';

export class Agent implements BaseEntity {
    constructor(
        public id?: number,
        public email?: string,
        public department?: string,
        public reservation?: BaseEntity,
        public user?: User,
    ) {
    }
}
