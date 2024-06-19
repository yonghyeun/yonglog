import Link from 'next/link';

export const Up = () => {
  return (
    <Link href='#page-header' className='mr-2'>
      <svg
        data-theme
        width='40'
        height='40'
        viewBox='0 0 60 60'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M20.4 33.2638L27.288 25.9201C27.63 25.5399 28.0483 25.2358 28.5156 25.0278C28.9827 24.8197 29.4886 24.7119 30 24.7119C30.5115 24.7119 31.0174 24.8197 31.4844 25.0278C31.9517 25.2358 32.37 25.5399 32.712 25.9201L39.6 33.2638'
          stroke-width='1.2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M8.40002 17.8078V41.8077C8.40002 47.1098 12.6981 51.4077 18 51.4077H42C47.3019 51.4077 51.6 47.1098 51.6 41.8077V17.8078C51.6 12.5058 47.3019 8.20776 42 8.20776H18C12.6981 8.20776 8.40002 12.5058 8.40002 17.8078Z'
          stroke-width='1.2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </svg>
    </Link>
  );
};

export const Down = () => {
  return (
    <Link href='#page-footer' className='mr-2'>
      <svg
        data-theme
        width='40'
        height='40'
        viewBox='0 0 60 60'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M39.6 26.376L32.7118 33.72C32.3659 34.0939 31.9464 34.3915 31.4799 34.5955C31.0131 34.7995 30.5093 34.9049 30 34.9049C29.4907 34.9049 28.987 34.7995 28.5202 34.5955C28.0536 34.3915 27.6341 34.0939 27.288 33.72L20.4 26.376'
          stroke-width='1.2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M51.6 41.8077V17.8078C51.6 12.5058 47.3019 8.20776 42 8.20776H18C12.6981 8.20776 8.40002 12.5058 8.40002 17.8078V41.8077C8.40002 47.1098 12.6981 51.4077 18 51.4077H42C47.3019 51.4077 51.6 47.1098 51.6 41.8077Z'
          stroke-width='1.2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </svg>
    </Link>
  );
};
