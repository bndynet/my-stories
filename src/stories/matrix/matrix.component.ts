import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Matrix } from '@bndynet/matrix';

@Component({
  selector: 'storybook-matrix',
  standalone: true,
  template: `<div style="margin: 1rem auto; text-align: center;">
    <div *ngFor="let row of matrix.getData(); let rowIndex = index">
      <ng-container
        *ngFor="let cell of row; trackBy: index; let columnIndex = index"
      >
        <span
          style="cursor: pointer;"
          (click)="onCheckboxChange($event, rowIndex, columnIndex)"
        >
          {{ isChecked(rowIndex, columnIndex) ? '✅' : '☑️' }}
        </span>
      </ng-container>
      <!-- <input type="checkbox" [name]="'chk_' + rowIndex+'_' + columnIndex" [title]="rowIndex + '_' + columnIndex" *ngFor="let cell of row; trackBy: index; let columnIndex = index" [checked]="isChecked(rowIndex, columnIndex)" (change)="onCheckboxChange($event, rowIndex, columnIndex)"/> -->
    </div>
  </div>`,
  imports: [CommonModule, FormsModule],
})
export class MatrixComponent {
  public matrix = new Matrix(53, 7);

  constructor() {
    this.matrix.setValue(6, 52);
    this.matrix.setValuesOfRange({ x: 1, y: 1 }, { x: 4, y: 4 });
  }

  onCheckboxChange(event: any, x: number, y: number): void {
    // const newVal = event.target.checked;
    const newVal = !this.matrix.getData()[x][y];
    this.matrix.setValue(x, y, newVal);
    console.log(this.matrix.getData());
  }

  isChecked(x: number, y: number): boolean {
    return this.matrix.getData()[x][y] || false;
  }
}
