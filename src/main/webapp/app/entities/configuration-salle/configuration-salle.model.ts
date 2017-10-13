import { BaseEntity } from './../../shared';

export class ConfigurationSalle implements BaseEntity {
    constructor(
        public id?: number,
        public configName?: string,
        public salles?: BaseEntity[],
    ) {
    }
}
