export type Source = string;
export type FilePaths = Array<Source>;
export type Directory = Source & { __directory: true };
export type MDXSource = Source & { __mdx: true };
export type SeriesName = string;
export type ImgSource = Source & { __image: true };
export type PostInfo = {
  content: string;
  meta: {
    title: string;
    description: string;
    date: string;
    series: string;
    postId: number;
    date: string;
    time: number;
    tag: Array<string>;
    path: string;
    validThumbnail: Source | ImgSource;
    thumb?: Source | ImgSource;
    issueNumber: number;
  };
};
export type SeriesName = string;
