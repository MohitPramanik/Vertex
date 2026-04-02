import { Component, input, OnInit, output } from '@angular/core';

type TableCellData = string | [string, string];

@Component({
  selector: '[th-action-area]',
  imports: [],
  template: `<ng-content></ng-content>`,
  styleUrl: './table.scss',
})
export class TableHeaderActionArea { }

@Component({
  selector: '[th-content-area]',
  imports: [],
  template: `<ng-content></ng-content>`,
  styleUrl: './table.scss',
})
export class TableHeaderContentArea { }

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

  isTuple(val: TableCellData) {
    return Array.isArray(val);
  }

  isNormalString(val: TableCellData) {
    if (!val.includes(".") && !Array.isArray(val)) return true;
    return false;
  }

  resolveItem(
    val: TableCellData,
    data: { [key: string]: string },
    index: number
  ) {
    // val can or cannot be tuple
    if (this.isTuple(val)) {
        if (val[0] === "#") {
          return index + 1;
        }
        else if (val[0].includes(".")) { /* if val[0] is object */
          return this.resolveObject(val[0], data);
        }
        else {  /* if val[0] is normal string */
          return data[val[0]]
        }
    }
    else {
        if (val.includes(".")) { /* if object */
          return this.resolveObject(val, data);
        }
        else if (val === "#") { 
          return index + 1;
        }
        else { /* if normal string */
          return data[val];
        }
    }
  }


  resolveObject(item: string, data: { [key: string]: any }) {
    let keys = item.split(".");

    const result = keys.reduce((acc, key) => acc?.[key], data)
    return result;

  }
}
