import { Component, input, OnInit, output } from '@angular/core';

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
  headerButtonActionClicked = output<void>();
  // Accepts string array or if want to add class pass [textToDisplay, class] for the element for which it's needed
  tableHeaders = input<TableCellData[]>([]);
  tableData = input<any[]>([]);
  // Accepts string array or if want to add class pass [textToDisplay, class] for the element for which it's needed
  tableDataSequence = input<TableCellData[]>([]); // if want increasing sequence in column, pass '#' in data
  tableButtonLabel = input<string>();
  tableButtonActionClicked = output<void>();
  emptyTableMessage = input<string>("No Records Found");
  pagination = input<boolean>(false);

  isTuple(header: TableCellData): header is [string, string] {
    return Array.isArray(header);
  }

  
  resolveObject(item: string, data: {[key: string]: any}) {
    let keys = item.split(".");

    const result = keys.reduce((acc, key) => acc?.[key], data)
    return result;

  }
}
