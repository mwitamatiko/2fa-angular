import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'src/app/services/authentication.service';



export interface UserData {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}



@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email'];
  dataSource!: MatTableDataSource<UserData>;
  


  constructor(
    private authService: AuthenticationService
  ) {
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadUsers(){
    this.authService.viewAllUsers().subscribe(
      (response)=>{
        console.log(response)
        // this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort

      }
    )
  }

  onPageChange(event: PageEvent) {
      
    // Update the paginator's pageIndex to the current page index
    this.paginator.pageIndex = event.pageIndex;

    console.log('Current Page Index:', event.pageIndex);

    // You can fetch data based on the current page index and page size
    this.loadUsers();
  }

}


