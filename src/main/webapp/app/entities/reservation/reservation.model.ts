import { BaseEntity } from './../../shared';

export const enum HeureMinutes {
    '_09H00_',
    '_09H15_',
    '_09H30_',
    '_09H45_'
}

export class Reservation implements BaseEntity {
    constructor(
        public id?: number,
        public jourResa?: any,
        public heureDebut?: HeureMinutes,
        public heureFin?: HeureMinutes,
        public nbPersonne?: number,
        public objet?: string,
        public description?: string,
        public salleReservees?: BaseEntity[],
        public reserveurs?: BaseEntity[],
    ) {
    }
}
