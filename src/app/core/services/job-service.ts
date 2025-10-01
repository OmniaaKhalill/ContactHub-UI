import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobForCreate, JobForUpdate } from '../models/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  baseUrl = environment.baseUrl;
  constructor(public http: HttpClient) { }

  GetAll(): Observable<any> {

    return this.http.get<any>(this.baseUrl + "/api/Jobs");

  }


  getEntityDetails(id: string): Observable<any> {

    return this.http.get<any>(this.baseUrl + "/api/Jobs/" + id);

  }


  Delete(id: string): Observable<any> {


    return this.http.delete<any>(this.baseUrl + "/api/Jobs/" + id);

  }


  Create(entity: JobForCreate) {
    return this.http.post<any>(this.baseUrl + "/api/Jobs", entity)
  }


  update(entity: JobForUpdate, id: string) {
    return this.http.put<any>(this.baseUrl + "/api/Jobs/" + id, entity)
  }








}



