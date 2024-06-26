import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { issueNumber: string } },
) {
  const { issueNumber } = params;

  try {
    const response = await 
  } catch (e) {}

  return NextResponse.json(
    {
      issueNumber,
      meessage: 'hi~!',
    },
    { status: 200 },
  );
}
