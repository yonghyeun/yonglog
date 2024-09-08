import type { Source, Directory, MDXSource, PostInfo } from '@/types/post';
import type { CountObject } from '@/types/global';

const fs = require('fs');
const path = require('path');

class PostUtilsModel {
  isDirectory(source: Source): source is Directory {
    return fs.lstatSync(source).isDirectory();
  }

  isMDX(source: Source): source is MDXSource {
    const fileName = path.basename(source);
    return path.extname(fileName) === '.mdx' || path.extname(fileName) == '.md';
  }

  translatePath(source: Source): Source {
    const relativePath = path.relative(
      path.join(process.cwd(), 'public'),
      source,
    );

    return `/${relativePath.replace(/\\/g, '/')}`;
  }

  isPostHasTag(postTag: PostInfo['meta']['tag'], searchParmsTag: string) {
    // searchParamsTagArray
    const SPTArray = searchParmsTag.split('&');
    return SPTArray.every((spt) => postTag.includes(spt));
  }

  incrementCount(collection: CountObject, key: string) {
    if (!collection[key]) {
      collection[key] = 1;
    } else {
      collection[key] += 1;
    }
  }

  deepStringtify(obj: Object) {
    const stringtifyRecursively = (value: any): string => {
      if (value === null) {
        return 'null';
      }

      if (Array.isArray(value)) {
        return `[${value.map(stringtifyRecursively).join(',')}]`;
      }

      if (typeof value === 'object') {
        const sortedKeys = Object.keys(value).sort();
        const keyValuePairs = sortedKeys.map(
          (key) => `"${key}":${stringtifyRecursively(value[key])}`,
        );
        return '{' + keyValuePairs.join(',') + '}';
      }

      return JSON.stringify(value);
    };

    return stringtifyRecursively(obj);
  }
}

export default PostUtilsModel;
