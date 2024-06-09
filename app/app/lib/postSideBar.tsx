type HashInfo = [string, string];

const getHashInfo = (text: string): [boolean, HashInfo] => {
  if (text.startsWith('### ')) {
    return [true, ['h3', text.replace('###', '').trim()]];
  }
  if (text.startsWith('## ')) {
    return [true, ['h2', text.replace('##', '').trim()]];
  }
  if (text.startsWith('# ')) {
    return [true, ['h1', text.replace('#', '').trim()]];
  }
  return [false, ['notHeader', text]];
};

export const parsingHeaders = (content: string): HashInfo[] => {
  const hashInfoArray: HashInfo[] = [];

  const contentArray: Array<string> = content.split(/\r?\n/);
  contentArray.forEach((text) => {
    const [isHeader, headerInfo] = getHashInfo(text);
    if (isHeader) {
      hashInfoArray.push(headerInfo);
    }
  });
  return hashInfoArray;
};
