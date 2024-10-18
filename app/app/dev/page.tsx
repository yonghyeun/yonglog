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
      <input type='file' accept='image/*' onChange={handleFileChange} />
      {imageUrl && <img src={imageUrl} alt='Uploaded' />}
    </div>
  );
};

export default PostLoading;
