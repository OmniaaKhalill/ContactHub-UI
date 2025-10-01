import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { DepartmentForCreate, DepartmentForUpdate } from '../models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  
  baseUrl = environment.baseUrl;
constructor(public http:HttpClient) { }
  
    GetAll(): Observable<any> {
 
        return this.http.get<any>(this.baseUrl+"/api/Departments" );
  
    }
  
 
    getEntityDetails(id:string): Observable<any> {
    
        return this.http.get<any>(this.baseUrl+"/api/Departments/"+id  );
  
    }
  
  
    Delete(id:string): Observable<any> {
     
   
  return this.http.delete<any>(this.baseUrl+"/api/Departments/"+id  );
    
    }
  
  
    
  
  
    Create(entity:DepartmentForCreate){
      return this.http.post<any>(this.baseUrl+"/api/Departments",entity)
    }
  
  
    update(entity:DepartmentForUpdate,id:string){
      return this.http.put<any>(this.baseUrl+"/api/Departments/"+id,entity)
    }
  

  
  
  
  
  
  
  }
  

