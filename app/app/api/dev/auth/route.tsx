import { NextRequest, NextResponse } from 'next/server';

type User = {
  id: string;
  password: string;
};

const db: User[] = [
  {
    id: 'user',
    password: '12345678',
  },
];

export const POST = async (req: NextRequest) => {
  try {
    const { id, password } = await req.json();
    const user = db.find(
      (user) => user.id === id && user.password === password,
    );

    let response;

    if (user) {
      response = NextResponse.json(
        { token: 'login-token', userName: user.id },
        { status: 200 },
      );
    } else {
      response = NextResponse.json(
        { message: 'ID나 PASSWORD를 확인해주세요' },
        { status: 401 },
      );
    }

    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set(
      'Access-Control-Allow-Methods',
      'POST, GET, OPTIONS, PUT, DELETE',
    );
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization',
    );
    return response;
  } catch (error) {
    const response = NextResponse.json(
      { message: 'Error processing request' },
      { status: 500 },
    );
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set(
      'Access-Control-Allow-Methods',
      'POST, GET, OPTIONS, PUT, DELETE',
    );
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization',
    );
    return response;
  }
};

export const OPTIONS = () => {
  let response;

  response = NextResponse.json('ㄱㅊㄱㅊ', { status: 200 });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set(
    'Access-Control-Allow-Methods',
    'POST, GET, OPTIONS, PUT, DELETE',
  );
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization',
  );

  return response;
};
