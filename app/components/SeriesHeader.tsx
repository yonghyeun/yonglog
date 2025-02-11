import { MDXRemote } from "next-mdx-remote/rsc";
import { getMdxComponents } from "@/lib/getMdxComponents";

import type { PostMeta } from "@/types/post";

const SeriesHeader = ({
  seriesHeader,
}: {
  seriesHeader: PostMeta["seriesHeader"] | null;
}) => {
  const isHeaderExsit = seriesHeader !== null;
  const components = getMdxComponents({});

  return isHeaderExsit ? (
    <section>
      <MDXRemote source={seriesHeader || ""} components={components} />
    </section>
  ) : (
    <></>
  );
};

export default SeriesHeader;
