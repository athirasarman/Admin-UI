import { Component } from '@angular/core';
import { AdminServiceService } from './admin-ui/admin-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Admin';
   constructor(private adminService:AdminServiceService) { }
}
