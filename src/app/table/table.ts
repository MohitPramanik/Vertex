import { Component, input } from '@angular/core';

type TableCellData = string | [string, string];

@Component({
  selector: '[th-action-area]',
  imports: [],
  template: `<ng-content></ng-content>`,
  styleUrl: './table.scss',
})
export class TableHeaderActionArea {}

@Component({
  selector: '[th-content-area]',
  imports: [],
  template: `<ng-content></ng-content>`,
  styleUrl: './table.scss',
})
export class TableHeaderContentArea {}

@Component({
  selector: 'section[app-table]',
  imports: [],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {

  tableLabel = input<string>("Table title");

  headerButtonLabel = input<string>();
  headerButtonAction = input<() => void>();

  // Accepts string array or if want to add class pass [textToDisplay, class] for the element for which it's needed
  tableHeaders = input<TableCellData[]>([]);

  tableData = input<any[]>([]);

  // Accepts string array or if want to add class pass [textToDisplay, class] for the element for which it's needed
  tableDataSequence = input<TableCellData[]>([]); // if want increasing sequence in column, pass '#' in data

  tableButtonLabel = input<string>();
  tableButtonAction = input<() => void>();

  isTuple(header: TableCellData): header is [string, string] {
    console.log(header)
    return Array.isArray(header);
  }
}
