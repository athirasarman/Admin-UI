import { Injectable } from '@angular/core';
import { Users } from './users';
import { Observable,of, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry,catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  overAllUserList:Observable<Users[]>=of([]);
  userList: BehaviorSubject<Users[]>=new BehaviorSubject<Users[]>([]);
  userUrl='https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';
  constructor(private http: HttpClient) { }

  /**
   * Returns a list of Users.
   * Function  fetch Users from server
   */
 getUsers(){
    return this.http.get<Users[]>(this.userUrl).pipe(
        map((data:any) => {
        this.overAllUserList=of(JSON.parse(JSON.stringify(data)));
        this.userList.next(data);
        return data;})
     ) as Observable<Users[]>;     
  }

  /**
   * Returns a list of Users.
   * Function to Edit User Details
   */
  editUser(id:string,name:string,email:string,role:string){
     let list=this.userList.getValue();
      list.forEach(user =>{
      if(user.id===id){
        user.name=name;
        user.email=email;
        user.role=role;
      }
    });
    this.userList.next(list);
  }

  
  /**
   * Returns a list of Users.
   * Function to Delete Users from List
   */
  deleteUser(row:Users){ 
    let list=this.userList.getValue();
    list.forEach(user =>{
      if(user.id===row.id){
        list.splice(list.indexOf(user),1);
      }
    });
    this.userList.next(list);
  }
  

  /**
   * Returns a list of Users.
   */
  getUserList(): Observable<Users[]>{
    return this.userList as Observable<Users[]>;
  }

  refresh(){
    this.overAllUserList.subscribe(data =>{
      this.userList.next(data);
    });
  }
}
