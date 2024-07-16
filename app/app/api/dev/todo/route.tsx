import { NextRequest, NextResponse } from 'next/server';

type Todo = {
  id: number;
  content: string;
};

let todos: Todo[] = [{ id: 1, content: '치킨 끝내주게 먹기' }];

const delay = async (delay: number) => {
  return new Promise((res) =>
    setTimeout(() => {
      res(true);
    }, delay),
  );
};

const GET = async () => {
  await delay(1000);
  const response = NextResponse.json(todos);
  response.headers.set('Access-Control-Allow-Origin', '*');
  return response;
};

const POST = async (req: NextRequest) => {
  await delay(1000);
  const newTodo: Todo = await req.json();
  if (!newTodo || !newTodo.id || !newTodo.content) {
    const errorResponse = NextResponse.json(
      { error: 'Invalid data format' },
      { status: 400 },
    );
    errorResponse.headers.set('Access-Control-Allow-Origin', '*');
    return errorResponse;
  }

  todos.push(newTodo);
  const response = NextResponse.json(todos);
  response.headers.set('Access-Control-Allow-Origin', '*');
  return response;
};

export { GET, POST };
