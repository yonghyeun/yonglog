const TodoList = () => {
  const todos = [{ id: 1, content: '아침에 일찍 일어나기' }];

  return (
    <section className='wrapper'>
      <ul className='flex'>
        {todos?.map(({ id, content }) => (
          <li key={id}>{content}</li>
        ))}
      </ul>
      <div className='flex'>
        <input type='text' />
        <button>add Todo</button>
      </div>
    </section>
  );
};

export default TodoList;
