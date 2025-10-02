export class Profile {
  constructor(
    public id: string,
    public fullName: string,
    public email: string,
    public phoneNumber: string | null,
    public address: string | null,
    public userName: string,
    public jobId: string,
    public jobName: string | null,
    public roles: string[] = [],

    // New fields
    public birthDate: Date | null,
    public age: number | null,       // comes from backend (computed)
    public photoPath: string | null
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
    public roles: string[],
    public jobId: string,
 public age: number | null,
    // New fields
    public birthDate: Date | null,
    public photo?: File // send actual file when uploading
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
    public password?: string,   
    public roles?: string[],

    // New fields
    public birthDate?: Date | null,
    public photo?: File | null,
    
     public age?: number | null,
  ) {}
}
