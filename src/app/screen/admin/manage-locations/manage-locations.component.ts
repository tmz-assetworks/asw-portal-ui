
  import { Component, OnInit, ViewChild } from '@angular/core';
  import { MatPaginator } from '@angular/material/paginator';
  import {MatTableDataSource} from '@angular/material/table';
  import { OperatorService } from '../operator.service';

@Component({
  selector: 'app-manage-locations',
  templateUrl: './manage-locations.component.html',
  styleUrls: ['./manage-locations.component.scss']
})
export class ManageLocationsComponent implements OnInit {

  customerList= [];
  displayedColumns: string[] = ['locationid', 'locationname', 'locationaddresss','locationcontactname','locationstatus','noofcharges','action'];
 // dataSource = new MatTableDataSource();

  dataSource = new MatTableDataSource<Element>(this.customerList);
  

  constructor(private operator:OperatorService){}

  ngOnInit(){
    this.getCustomerList();
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    
  searchKey:any;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Rows per page';
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
}


  getCustomerList(): void {
    this.operator.getCustomertList().subscribe(
      (data: any) => {
        //console.log(data,"data is coming");
        this.customerList= data.data; 
        this.dataSource.data=this.customerList;
        
       }
      )
    }


    addCustomers():void{
      alert("Your Record Added Coming Soon....")
      }
}
