import { Component, signal } from '@angular/core';

interface CandidateJobPosting {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  applicants: number;
  posted: string;
  status: string;
  highlights: string[];
}

@Component({
  selector: 'app-candidate-jobs',
  imports: [],
  templateUrl: './candidate-jobs.html',
  styleUrl: './candidate-jobs.scss',
})
export class CandidateJobsPage {
  jobPostings = signal<CandidateJobPosting[]>([
    {
      id: 1,
      title: 'Frontend Developer',
      department: 'Engineering',
      location: 'Bengaluru / Hybrid',
      type: 'Full-time',
      experience: '2-4 Years',
      salary: '8-12 LPA',
      applicants: 42,
      posted: '2 days ago',
      status: 'Urgent Hiring',
      highlights: ['Angular', 'Tailwind CSS', 'REST APIs']
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      experience: '3-5 Years',
      salary: '7-10 LPA',
      applicants: 31,
      posted: '4 days ago',
      status: 'Open',
      highlights: ['Figma', 'Design Systems', 'User Research']
    },
    {
      id: 3,
      title: 'HR Operations Executive',
      department: 'Human Resources',
      location: 'Mumbai / On-site',
      type: 'Full-time',
      experience: '1-3 Years',
      salary: '4-6 LPA',
      applicants: 18,
      posted: '1 week ago',
      status: 'Actively Reviewing',
      highlights: ['Recruitment', 'Onboarding', 'Employee Relations']
    },
    {
      id: 4,
      title: 'Backend Developer',
      department: 'Engineering',
      location: 'Pune / Hybrid',
      type: 'Full-time',
      experience: '3-6 Years',
      salary: '10-15 LPA',
      applicants: 27,
      posted: 'Today',
      status: 'Priority Role',
      highlights: ['Node.js', 'Databases', 'Microservices']
    }
  ]);

  filters = signal<string[]>([
    'All Departments',
    'Remote Friendly',
    'Full-time',
    'Entry to Mid Level'
  ]);

  applicationSteps = signal<string[]>([
    'Browse roles that match your skills and preferred location.',
    'Review the requirements, salary range, and team details.',
    'Click apply and continue with your profile or resume flow.'
  ]);
}
