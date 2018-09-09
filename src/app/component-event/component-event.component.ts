import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators, FormBuilder } from '@angular/forms';
import { EventsService } from '../services/events/events.service';
import { SkillsService, Skill } from '../services/skills/skills.service';
@Component({
  selector: 'app-component-event',
  templateUrl: './component-event.component.html',
  styleUrls: ['./component-event.component.css']
})
export class ComponentEventComponent implements OnInit {

  form: FormGroup;
  skills: Skill[];
  addedSkills: Skill[];


  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventsService,
    private skillsService: SkillsService,
    private router: Router
  ) { 
    this.addedSkills = [];
    this.form = this.formBuilder.group({
      name: ['', [
        Validators.required,
      ]],
      description: ['', [
        Validators.required,
      ]],
      organization: ['', [
        Validators.required,
      ]],
      skillName: [],
    });
    skillsService.getSkills().subscribe(skills => {
      this.skills = skills;
    });
  }

  ngOnInit() {
  }
  submit(form: NgForm) {
    let name = form.value.name;
    let description = form.value.description
    let organization = form.value.organization;

    const skills = []
    this.addedSkills.forEach(skill =>{
      skills.push(skill)
    })

    this.eventService.createEvent(name, description, organization, skills)
      .subscribe(e => {
        
      this.router.navigate(['feed']);
      });
  }
  addSkill() {
    if (!this.addedSkills) {
      this.addedSkills = [];
    }
    const doesExist = this.addedSkills.findIndex(
      o1 => o1.name === this.form.value.skillName
    );
    if (-1 === doesExist) {
      this.skills.forEach(skillFromDb => {
        if (skillFromDb.name === this.form.value.skillName) {
          this.addedSkills.push(skillFromDb);
        }
      });
    }
    this.form.value.skillName = '';
  }
  canSubmit() {
    const doesExist = this.addedSkills.findIndex(
      o1 => o1.name === this.form.value.skillName
    );
    if (-1 < doesExist) {
      return false;
    }
    let skillExists = false;
    this.skills.forEach(skill => {
      if (skill.name === this.form.value.skillName) {
        skillExists = true;
      }
    });
    return skillExists;
  }
  skillsThatTheEventDoesntHave() {
    if (!this.skills) {
      return [];
    }
    if (!this.addedSkills) {
      this.addedSkills = [];
    }
    const skillsReturn = [];
    this.skills.forEach(skill => {
      const doesExist = this.addedSkills.findIndex(
        o1 =>  o1.id === skill.id
      );
      if (-1 === doesExist) {
        skillsReturn.push(skill);
      }
    });
    return skillsReturn;
  }
}
