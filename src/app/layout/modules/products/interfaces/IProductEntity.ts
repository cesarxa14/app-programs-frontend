export interface IProductEntity {
  id: number;
  name: string;
  description: string;
  quantity: number;
  status: 'HABILITADO' | 'INHABILITADO';
  priceSale: number;
  image: string;
}