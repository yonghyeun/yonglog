// TODO Route 하는 Link 컴포넌트로 구성하기
// TODO Active 한 상태에 따라 뭐 어쩌구 저쩌구 하기
const Category = ({ name, to }: { name: string; to?: string }) => {
  return (
    <button className='border rounded-l-lg rounded-r-lg text-center px-2 py-2 focus:outline-none font-light text-sm'>
      {name}
    </button>
  );
};

// TODO MDX 의 태그 리스트를 가져와서 렌더링 하기
const tagList = [
  'React',
  'NextJS',
  'TypeScript',
  '알고리즘',
  'React',
  'NextJS',
  'TypeScript',
  '알고리즘',
  'React',
  'NextJS',
  'TypeScript',
  '알고리즘',
  'React',
  'NextJS',
  'TypeScript',
  '알고리즘',
  'React',
  'NextJS',
  'TypeScript',
  '알고리즘',
];

// TODO 태그 별 라우팅 하는 로직 추가하기
const CategoryList = () => {
  return (
    <section className='px-4 sm:px-8 md:px-16 lg:px-32 mt-24 sm:mt-24 md:mt-24 lg:mt-24 mb-12 sm:mb-12 md:mb-6 lg:mb-24'>
      <ul className='flex flex-wrap gap-2.5'>
        {tagList.map((tag, id) => (
          <li key={id}>
            <Category name={tag} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CategoryList;
