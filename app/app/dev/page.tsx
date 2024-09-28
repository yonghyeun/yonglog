'use client';

import React, { useState } from 'react';

const PostLoading = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='mt-24'>
      <h1>웹에서 네이티브 앱 처럼 사용자 카메라에 접근 하는 방법</h1>
      <p>
        현재 화면에 렌더링 되는 이미지는 임시적으로 사용자 메모리에 저장 된
        이미지 입니다.
      </p>
      <p>
        이에 해당 이미지는 아무에게도 유출 되지 않으며 모바일 기기를 종료 할
        경우 사라 집니다 :)
      </p>
      <p>그러니 걱정 마셔요</p>
      {imageUrl && <img src={imageUrl} alt='Uploaded' />}
      <div className='mt-2 flex flex-col gap-2'>
        <label htmlFor='camera'>후면 카메라에 접근해볼게 얍!</label>
        <input
          type='file'
          capture='environment'
          accept='image/*'
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default PostLoading;
