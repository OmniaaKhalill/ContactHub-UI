export class Login {
            constructor(
    public email: string,
    public password: string,
   
  ) {}
}


export class UserClaims {
            constructor(
                public Name: string,
    public Email: string,
    public Id: string,
        public Role: string,
   
  ) {}
}

export class Register {
            constructor(
    public fullName: string,
    public email: string,
    public password: string,
    ) {}
            }