export interface IItemStoreEntity{
    id: number;
    name: string;
    amount: number;
    type: 'servicio' | 'producto';
    cantidad?: number;
}