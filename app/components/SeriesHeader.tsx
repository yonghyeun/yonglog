import { MDXRemote } from 'next-mdx-remote/rsc';
import { useMDXComponents } from '@/app/lib/mdxComponents';

import type { PostMeta } from '@/types/post';

const SeriesHeader = ({
  seriesHeader,
}: {
  seriesHeader: PostMeta['seriesHeader'] | null;
}) => {
  const isHeaderExsit = seriesHeader !== null;
  const components = useMDXComponents({});

  return isHeaderExsit ? (
    <section>
      <MDXRemote source={seriesHeader || ''} components={components} />
    </section>
  ) : (
    <></>
  );
};

export default SeriesHeader;
