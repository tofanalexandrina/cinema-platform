import { NextRequest, NextResponse } from 'next/server';
import { GeneralInfoService } from '@/services/generalInfoService';

// GET /api/generalInfo - Get general information
export async function GET(request: NextRequest) {
  try {
    const generalInfo = await GeneralInfoService.getGeneralInfo();

    return NextResponse.json(
      {
        success: true,
        data: generalInfo,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching general information:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch general information' },
      { status: 500 }
    );
  }
}

// POST /api/generalInfo - Create or update general information
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const generalInfo = await GeneralInfoService.upsertGeneralInfo(body);

    return NextResponse.json(
      {
        success: true,
        data: generalInfo,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error creating/updating general information:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create or update general information' },
      { status: 500 }
    );
  }
}
