import { Component, OnInit } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-legends-dialog',
  templateUrl: './legends-dialog.component.html',
  styleUrls: ['./legends-dialog.component.scss'],
})
export class LegendsDialogComponent implements OnInit {
  status = [
    {
      status: 'Available',
      description: 'Charger is available for charging.',
      color: '#90993F',
    },
    {
      status: 'Connected',
      description: 'Vehicle is connected to charger.',
      color: '#ea0088',
    },
    {
      status: 'Offline',
      description: 'Charger is not ready for charging sessions.',
      color: '#ea002a',
    },
    {
      status: 'Occupied',
      description: 'Charger is busy being used by somebody.',
      color: '#000C66',
    },
    {
      status: 'Faulted',
      description: 'Charger is defective',
      color: '#757575',
    },
    {
      status: 'Busy',
      description:
        'Charging session is on-going, Vehicle is connected to charger.',
      color: '#E97300',
    },
    {
      status: 'EV Disconnected',
      description:
        'Charging session has stopped and Vehicle has removed from charger.',
      color: '#0000FF',
    },
  ]

  constructor() {}
  dataSource = new MatTableDataSource<any>(this.status)

  displayedColumns = ['status', 'description']
  ngOnInit(): void {
    // this.dataSource = this.status
  }
}
