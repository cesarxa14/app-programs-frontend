import { IUserCustomerEntity } from "../../customers/interfaces/IUserCustomerEntity";

export interface ISalesEntity {
    id: number;
    sellerId: number;
    customer: IUserCustomerEntity;
    category: string;
    saleName: string;
    type_voucher: string;
    payment_method: string;
    amount: number;
    igv: number;
    saleDate: Date;
    startDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}