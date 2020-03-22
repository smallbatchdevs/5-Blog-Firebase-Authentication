export interface BlogPost {
  title: string;
  body: string;
  isPublished: boolean; // is the blog in draft state or publicly viewable?
  updatedOn: any;
  createdOn: any;
  uid: string;
}
