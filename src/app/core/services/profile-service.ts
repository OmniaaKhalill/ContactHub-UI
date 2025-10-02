import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobForCreate } from '../models/job';
import { ProfileForCreate, ProfileForUpdate } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
    baseUrl = environment.baseUrl;
  constructor(public http: HttpClient) { }

  GetAll(): Observable<any> {

    return this.http.get<any>(this.baseUrl + "/api/UserProfiles/all");

  }


  getEntityDetails(id: string): Observable<any> {

    return this.http.get<any>(this.baseUrl + "/api/UserProfiles/" + id);

  }


  Delete(id: string): Observable<any> {


    return this.http.delete<any>(this.baseUrl + "/api/UserProfiles/" + id);

  }


  Create(entity: FormData) {
    return this.http.post<any>(this.baseUrl + "/api/UserProfiles", entity)
  }


  update(entity: FormData, id: string) {
    return this.http.put<any>(this.baseUrl + "/api/UserProfiles/" + id, entity)
  }








}





