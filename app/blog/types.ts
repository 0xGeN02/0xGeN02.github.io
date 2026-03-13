export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  language: string;
  readingTime: number;
  draft?: boolean;
}
