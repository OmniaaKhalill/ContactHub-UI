export class Profile {
  constructor(
    public id: string,
    public fullName: string,
    public email: string,
    public phoneNumber: string | null,
    public address: string | null,
    public userName: string,
        public jobId: string,

        public jobName:  string | null,
    public roles: string[]=[]
  ) {}
}

export class ProfileForCreate {
  constructor(
    public fullName: string,
    public email: string,
    public phoneNumber: string | null,
    public address: string | null,
    public userName: string,
    public password: string,   // required when creating
    public roles: string[]
  ) {}
}

export class ProfileForUpdate {
  constructor(
    public id: string,
    public fullName: string,
    public email: string,
    public phoneNumber: string | null,
    public address: string | null,
    public userName: string,
    public password?: string,   // optional on update
    public roles?: string[]
  ) {}
}