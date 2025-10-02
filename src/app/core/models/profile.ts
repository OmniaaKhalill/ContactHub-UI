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
    public role: string,

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
    public role: string,
    public jobId: string,
 public age: number | null,
     public password: string,   // required when creating

    // New fields
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
    public role: string,
    public jobId: string,
 public age: number | null,
     public password?: string,
  ) {}
}
