import { IProgramEntity } from "../programs/IProgramEntity";

export interface IPackageEntity {
    id: number;
    program: IProgramEntity;
    name: string;
    num_clases: number;
    expiration: number;
    cost: number;
    status: string;
    phone?: number;
}