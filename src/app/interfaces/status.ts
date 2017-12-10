export interface Status {
  fields: {
    created_date: Date;
    published_date: Date;
    title: string;
  };

  model: string;
  pk: number;  
}
