export interface ICreateSaleDto {
    sellerId: number;
    customerId: number;
    category: string;
    saleName: string;
    type_voucher: string;
    payment_method: string;
    amount: number;
    igv: number;
    saleDate: Date;
}