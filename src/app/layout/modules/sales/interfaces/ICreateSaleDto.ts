export interface ICreateSaleDto {
    sellerId: number;
    customerId: number;
    category: string;
    saleName: string;
    itemId: number;
    type_voucher: string;
    startDate: string;
    payment_method: string;
    amount: number;
    igv: number;
    saleDate: Date;
}