import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface Skill {
  name: string;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(private http: HttpClient) { }

  getSkills() {
    return this.http.get<Skill[]>(environment.host + '/api/skills/getskills');
  }
}
