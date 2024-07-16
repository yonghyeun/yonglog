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
  if (req.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 204 });
    // Handle preflight requests
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    return response;
  }

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
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  return response;
};

const OPTIONS = (req: NextRequest) => {
  const response = new NextResponse();

  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  return response;
};

export { GET, POST, OPTIONS };
