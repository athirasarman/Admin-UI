import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private adminService:AdminServiceService) { }

  ngOnInit(): void {
  }

 refresh(){
   this.adminService.refresh();
 }
}
