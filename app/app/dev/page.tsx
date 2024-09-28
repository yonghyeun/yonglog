const PostLoading = () => {
  return (
    <div className='mt-24'>
      <label htmlFor='camera'>camera</label>
      <input type='file' capture='environment' accept='*' />
    </div>
  );
};

export default PostLoading;
