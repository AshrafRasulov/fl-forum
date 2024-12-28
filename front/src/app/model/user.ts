
export class User{
  first_name: string = '';
  last_name: string = '';
  middle_name: string = '';
  user_id: number = 0;
  roles: string[] = [];

  getFio = (): string => `${this.last_name} ${this.first_name} ${this.middle_name}`;

  getShortFio = (): string =>
    `${this.last_name}.${this.first_name.substring(0,1)}.${this.middle_name.substring(0,1)}`;
}

