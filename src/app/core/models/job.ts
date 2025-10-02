export class Job {

    constructor(
    public id: string,
    public name: string,
    public departmentId: string,
    public departmentName: string | null,
   
  ) {}
}


export class JobForCreate {
        constructor(
    public name: string,
    public departmentId: string,
   
  ) {}
}

export class JobForUpdate {
        constructor(
    public id: string,
    public name: string,
    public departmentId: string,
   
  ) {}
}

