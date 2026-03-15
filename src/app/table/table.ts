import { Component, input } from '@angular/core';

type TableHeader = string | [string, string];

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
  tableHeaders = input<TableHeader[]>([]);

  tableData = input<any[]>([]);
  tableDataSequence = input<string[]>([]); // if want increasing sequence in column, pass '#' in data

  tableButtonLabel = input<string>();
  tableButtonAction = input<() => void>();

  isTuple(header: TableHeader): header is [string, string] {
    return Array.isArray(header);
  }
}
