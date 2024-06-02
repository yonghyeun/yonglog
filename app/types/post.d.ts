export type Source = string;
export type FilePaths = Array<Source>;
export type Directory = Source & { __directory: true };
export type MDXSource = Source & { __mdx: true };
export type PostInfo = {
  content: string;
  meta: {
    title: string;
    description: string;
    date: string;
    series: string;
    postId: number;
    tag?: Array<string>;
  };
};
export type SeriesName = string;
