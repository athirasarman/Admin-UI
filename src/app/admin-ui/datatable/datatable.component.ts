import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort} from '@angular/material/sort';
import { Users} from '../users';
import { AdminServiceService } from '../admin-service.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from '../edit/edit.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {
  dataSource= new MatTableDataSource<Users>([]);
  selection = new SelectionModel<Users>(true, []);
  displayedColumns: string[] = ['select','name', 'email', 'role','buttons'];
  overall = false;
  userSelected = false; 

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private adminService:AdminServiceService,
              public dialog: MatDialog) {
     this.adminService.getUsers().subscribe(data => {
         this.dataSource=new MatTableDataSource(data);
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
     });
     this.adminService.getUserList().subscribe(data =>{
         this.dataSource=new MatTableDataSource(data);
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
     })
    
   }

  ngOnInit(): void {
   
  }

  ngAfterViewInit() {
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
  }

  applyFilter(event:any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

    /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = 10;
    return numSelected === numRows;
  }

   /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    for(var index in this.dataSource.data){
      if(Number(index)<10) {
       this.selection.select(this.dataSource.data[index]);
     }
    }
    //this.selection.select(...this.dataSource.data);
    }

      /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Users): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  openEditUser(row:Users){
    window.sessionStorage.setItem('user',JSON.stringify(row));
    const dialogRef = this.dialog.open(EditComponent);

    dialogRef.afterClosed().subscribe(result => {});
    this.overall=false;

  }

  deleteUser(row:Users){
    const dialogRef = this.dialog.open(DeleteUserComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
         this.adminService.deleteUser(row);
      }
    });
  }

  deleteSelectedUsers(){
   this.selection.selected.forEach(user =>{
     this.adminService.deleteUser(user);
   });
   this.overall=false;
  }

}
