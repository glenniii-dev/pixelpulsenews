type Article = {
  id: number;
  date: string;
  title: string;
  slug: string;
  submittedTo: string;
  content: string;
  author: string;
  bibliography: string;
  isPublished: boolean;
  order?: string;
  createdAt: string;
}

export default Article;