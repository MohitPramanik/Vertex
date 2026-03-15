import { Component } from '@angular/core';
import { Table } from '../table/table';

interface Holiday {
  name: string;
  date: string;
  day: string;
  description?: string;
}

@Component({
  selector: 'div.app-holiday-calendar',
  imports: [Table],
  templateUrl: './holiday-calendar.html',
  styleUrl: './holiday-calendar.scss',
})
export class HolidayCalendar {
  holidays: Holiday[] = [
    { name: "New Year's Day", date: "2026-01-01", day: "Thursday", description: "New Year Celebration" },
    { name: "Makar Sankranti", date: "2026-01-14", day: "Wednesday", description: "Harvest Festival" },
    { name: "Republic Day", date: "2026-01-26", day: "Monday", description: "National Holiday" },
    { name: "Maha Shivratri", date: "2026-02-15", day: "Sunday", description: "Hindu Festival" },
    { name: "Holi", date: "2026-03-03", day: "Tuesday", description: "Festival of Colors" },
    { name: "Ram Navami", date: "2026-03-26", day: "Thursday", description: "Birth of Lord Rama" },
    { name: "Good Friday", date: "2026-04-03", day: "Friday", description: "Christian Holiday" },
    { name: "Ambedkar Jayanti", date: "2026-04-14", day: "Tuesday", description: "Birth Anniversary of Dr. B.R. Ambedkar" },
    { name: "Labour Day", date: "2026-05-01", day: "Friday", description: "International Workers' Day" },
    { name: "Buddha Purnima", date: "2026-05-23", day: "Saturday", description: "Birth of Gautama Buddha" },
    { name: "Eid-ul-Fitr", date: "2026-06-18", day: "Thursday", description: "Muslim Festival (Dates may vary)" },
    { name: "Bakrid / Eid al-Adha", date: "2026-07-20", day: "Monday", description: "Muslim Festival (Dates may vary)" },
    { name: "Independence Day", date: "2026-08-15", day: "Saturday", description: "National Holiday" },
    { name: "Raksha Bandhan", date: "2026-08-29", day: "Saturday", description: "Festival Celebrating Sibling Bond" },
    { name: "Janmashtami", date: "2026-09-05", day: "Saturday", description: "Birth of Lord Krishna" },
    { name: "Gandhi Jayanti", date: "2026-10-02", day: "Friday", description: "Birth Anniversary of Mahatma Gandhi" },
    { name: "Dussehra", date: "2026-10-20", day: "Tuesday", description: "Victory of Good over Evil" },
    { name: "Diwali", date: "2026-11-08", day: "Sunday", description: "Festival of Lights" },
    { name: "Guru Nanak Jayanti", date: "2026-11-25", day: "Wednesday", description: "Birth of Guru Nanak" },
    { name: "Christmas Day", date: "2026-12-25", day: "Friday", description: "Christian Festival" }
  ];
}
