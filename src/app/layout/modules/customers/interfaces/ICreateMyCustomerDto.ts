export interface ICreateMyCustomerDto {
    name: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
    country: string;
    department: string;
    province: string;
    district: string;
    type_document: string;
    document: string;
    birthdate: Date;
    medical_history: string;
    createdBy: number;
}