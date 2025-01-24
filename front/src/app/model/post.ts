export class Post{
  id: number = 0;
  category_id: number = 0;
  content: string = '';
  cr_on: string = '';
  status: number = 0;
  title: string = '';
  user_id: number = 0;
  cr_by: number = 0;
  up_by: number = 0;
  up_on: string = '';

  getPost = (): string => `
  ${this.id}
  ${this.category_id}
  ${this.content}
  ${this.cr_on}
  ${this.status}
  ${this.title}
  ${this.user_id}
  ${this.cr_by}
  ${this.up_on}
  ${this.up_by}`;

}
