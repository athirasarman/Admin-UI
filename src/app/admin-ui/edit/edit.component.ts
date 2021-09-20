import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Users} from '../users';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
   editForm= this.fb.group({
    name: [null, Validators.required],
    email: [null, Validators.required],
    role: [null, Validators.required]    
  });
  user:Users;

  constructor(private fb: FormBuilder,private adminService:AdminServiceService){ 
     this.user=JSON.parse(window.sessionStorage.user);
     this.editForm.setValue({
        name:this.user.name,
        email:this.user.email,
        role:this.user.role
     });
   }

  ngOnInit(): void {
  }
  
  editUserDetails(status:boolean){
      this.adminService.editUser(this.user.id,this.editForm.controls['name'].value,this.editForm.controls['email'].value,this.editForm.controls['role'].value);
  }

}
