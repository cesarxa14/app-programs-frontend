import { IProgramEntity } from "../../clases/interfaces/programs/IProgramEntity";
import { IUserCustomerEntity } from "../../customers/interfaces/IUserCustomerEntity";

export interface IBookEntity {
    id: number;
    userBooked: IUserCustomerEntity;
    program: IProgramEntity;
    classDate: Date;
    classHour: Date;
    userCreator: number;
    deleted: number;
}