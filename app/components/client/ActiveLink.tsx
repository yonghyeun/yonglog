'use client';

import Link from 'next/link';

import { useSearchParams } from 'next/navigation';
import { checkIsActive, getNewSearchParms } from '@/app/lib/route';

import type { SearchParams } from '@/types/global';

type ActiveLinkProps = {
  newParams: SearchParams;
  classNames: {
    default: string;
    active: string;
  };
  scroll?: boolean;
  toFirstPage?: boolean;
  replace?: boolean;
  children?: React.ReactNode;
};

const ActiveLink = ({
  newParams,
  classNames,
  children,
  scroll = true,
  toFirstPage = false, // 라우팅 시 page=1 를 기본으로 추가 할 것인지
  replace = true, // window.history stack 에서 replace 할 것인지
}: ActiveLinkProps) => {
  const searchParams = useSearchParams(); // readOnly type 의 searchParameter
  const _searchParams = new URLSearchParams(searchParams.toString()); // 복사본 생성

  if (toFirstPage) {
    _searchParams.set('page', '1');
  }

  // 현재 주소와 라우팅 시킬 주소가 동일 한지를 확인
  const isActive = checkIsActive(_searchParams, newParams);
  // 만약 동일하다면 off 하기 위한 href 주소 , 아닐 경우엔 on 하기 위한 href 주소 생성
  const href = getNewSearchParms(_searchParams, newParams, isActive);
  const className = isActive ? classNames.active : classNames.default;

  return (
    <Link href={href} className={className} scroll={scroll} replace={replace}>
      {children}
    </Link>
  );
};

export default ActiveLink;
