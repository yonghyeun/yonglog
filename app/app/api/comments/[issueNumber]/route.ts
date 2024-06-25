import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { issueNumber: string } },
) {
  const { issueNumber } = params;

  return NextResponse.json(
    {
      issueNumber,
      meessage: 'hi~!',
    },
    { status: 200 },
  );
}
