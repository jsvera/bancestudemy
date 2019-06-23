export class Usuario{

    constructor(
        public dni: string,
        public nombres: string,
        public apellidos: string,
        public email: string,
        public usuario: string,
        public password: string,
        public img?: string,
        public role?: string ,
        public google?: boolean,
        public _id?: string
    ) { }
}
