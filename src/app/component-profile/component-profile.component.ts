import { Component, OnInit } from "@angular/core";
import { UserService, User } from "../services/users/user.service";
import { SkillsService, Skill } from "../services/skills/skills.service";
@Component({
  selector: "app-component-profile",
  templateUrl: "./component-profile.component.html",
  styleUrls: ["./component-profile.component.css"]
})
export class ComponentProfileComponent implements OnInit {
  skillName: String;
  user: User;
  skills: Skill[];

  constructor(
    private userService: UserService,
    private skillsService: SkillsService
  ) {
    userService.getUserProfile().subscribe(userInfo => {
      this.user = userInfo;
    });
    skillsService.getSkills().subscribe(skills => {
      this.skills = skills;
    });
  }
  addSkill() {
    if (this.canSubmit()) {
      this.skills.forEach((skill: any) => {
        if (skill.name === this.skillName) {
          this.userService.addSkill(skill._id).subscribe(user => {
            this.user.skills.push(skill);
            this.skillName = undefined;
          });
        }
      });
    }
  }
  canSubmit() {
    const doesExist = this.user.skills.findIndex(
      o1 => o1.name === this.skillName
    );
    if (!doesExist) {
      return false;
    }
    let skillExists = false;
    this.skills.forEach(skill => {
      if (skill.name === this.skillName) {
        skillExists = true;
      }
    });
    return skillExists;
  }
  skillsThatTheUserDoesntHave() {
    if (!this.skills) {
      return [];
    }
    if (!this.user) {
      return [];
    }
    const skillsReturn = [];
    this.skills.forEach(skill => {
      const doesExist = this.user.skills.findIndex(
        o1 => o1.name === skill.name
      );
      if (doesExist) {
        skillsReturn.push(skill);
      }
    });
    return skillsReturn;
  }
  ngOnInit() {}
}
