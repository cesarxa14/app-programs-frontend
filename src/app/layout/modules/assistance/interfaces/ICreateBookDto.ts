export interface ICreateBookDto {
    program: number;
    classDate: Date;
    classHour: Date;
    userCreator: number;
    userBooked: number;
    additional_notes?: string;
}