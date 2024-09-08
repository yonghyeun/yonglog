'use client';

import { useActiveContext } from '@/context/ActiveContext';
import { useEffect } from 'react';

import type { HeadingText, HeadingNumber } from '@/lib/interactiveSidebar';

const ActiveHeader = ({
  headingText,
  headingNumber,
}: {
  headingText: HeadingText; // Actual DOM heading tag의 Id와 같음
  headingNumber: HeadingNumber;
}) => {
  useEffect(() => {
    const $targetHeading = document.getElementById(headingText.trim());
    if (!$targetHeading) return;

    const options = {
      root: null,
      rootMargin: '-200px 0px 0px 0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ isIntersecting }) => {
        isIntersecting && setActiveIndex(headingNumber);
      });
    }, options);

    observer.observe($targetHeading);
    return () => observer.disconnect();
  }, []);

  const { activeIndex, setActiveIndex } = useActiveContext();

  const isUnderActive = headingNumber < activeIndex;
  const isActive = headingNumber === activeIndex;

  return (
    <li
      className='mb-2'
      data-active={isActive}
      data-under-active={isUnderActive}
    >
      {headingText}
    </li>
  );
};

export default ActiveHeader;
