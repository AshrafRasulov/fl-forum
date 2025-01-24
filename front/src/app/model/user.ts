
export class User{
  user_id: number = 0;
  login: string = '';
  password: string = '';
  first_name: string = '';
  last_name: string = '';
  middle_name: string = '';
  state: number = 0;
  cr_by: number = 0;
  cr_on: string = '';
  up_by: number = 0;
  up_on: string = '';
  post_count: number = 0;
  message_count: number = 0;
  is_admin: number;
  getUser = (): string => `
    ${this.user_id}
    ${this.login}
    ${this.password}
    ${this.first_name}
    ${this.last_name}
    ${this.middle_name}
    ${this.state}
    ${this.cr_by}
    ${this.cr_on}
    ${this.up_by}
    ${this.up_on}
    ${this.post_count}
    ${this.is_admin};
    ${this.message_count}`;

  getShortUser = (): string =>
    `${this.first_name.substring(0,1)}
    .${this.last_name}
    .${this.middle_name.substring(0,1)}`;
}

