export interface IProductEntity {
  id: number;
  name: string;
  description: string;
  quantity: number;
  status: 'HABILITADO' | 'INHABILITADO';
  price_sale: number;
  image: string;
  phone_owner?: number;
}