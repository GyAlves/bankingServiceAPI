
// interfaces
import ICustomer from "./interfaces/ICustomer";
export class Customer implements ICustomer {
    constructor(
        public id: string,
        public first_name: string,
        public last_name: string,
        public birth_date: Date,
        public cpf: number,
        public email: string,
        public account_id?: string,
    ) { }
}