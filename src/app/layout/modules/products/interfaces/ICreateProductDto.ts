export interface ICreateProductDto {
    name: string;
    description: string;
    quantity: number;
    status: 'HABILITADO' | 'INHABILITADO';
    price_sale: number;
    image: string;
    user_id: number;
}