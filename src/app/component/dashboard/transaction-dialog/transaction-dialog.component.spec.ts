import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatDialogRef } from '@angular/material/dialog'

import { TransactionDialogComponent } from './transaction-dialog.component'

describe('TransactionDialogComponent', () => {
  let component: TransactionDialogComponent
  let fixture: ComponentFixture<TransactionDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionDialogComponent],
      providers: [MatDialogRef],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
