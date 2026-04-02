import { Component, computed, model, signal } from '@angular/core';
import { Table } from '../../components/table/table';
import { Modal } from '../../components/modal/modal';

interface Skills {
  technology: string;
  years: number;
  months: number;
}

@Component({
  selector: 'form[add-skills-modal]',
  imports: [],
  templateUrl: './add-skills-modal.html',
  styleUrl: './profile.scss'
})

export class AddSkillsModal {
  skills = model<Skills[]>();
}

@Component({
  selector: 'section[profile-page]',
  imports: [Table, Modal, AddSkillsModal],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})

export class ProfilePage {

  isShown = signal<boolean>(false);

  skills = signal<Skills[]>([
    { technology: "React.js", years: 1, months: 5 },
    { technology: "Angular.js", years: 1, months: 5 },
    { technology: "TypeScript.js", years: 1, months: 5 }
  ]);

  updatedSkills = computed(() =>
    this.skills().map((skill) => {
      return { ...skill, experience: `${skill.years} year ${skill.months} months` }
    }
  ))

  openSkillModal() {
    this.isShown.set(true);
  }
}

