export interface Task {
  fields: {
    created_date: Date;
    published_date: Date;
    deadline_date: Date;
    user: number;
    status: number;
    body: string;
    title: string;
  };

  model: string;
  pk: number;	
}
