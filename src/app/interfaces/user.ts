export interface User {
  fields: {
    created_date: Date;
    published_date: Date;
    fname: string;
    mname: string;
    lname: string;
    password: string;
    login: string;
  };

  model: string;
  pk: number;
}
