import { BaseEntity } from './../../shared';

export class Salle implements BaseEntity {
    constructor(
        public id?: number,
        public nom?: string,
        public numero?: number,
        public maxCapacite?: number,
        public description?: string,
        public reservation?: BaseEntity,
        public configs?: BaseEntity[],
    ) {
    }
}
