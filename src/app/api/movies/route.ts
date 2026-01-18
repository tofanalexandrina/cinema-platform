import { NextRequest, NextResponse } from 'next/server';
import { MovieService } from '@/services/movieService';

// GET /api/movies - Get all movies
export async function GET(request: NextRequest) {
  try {
    const movies = await MovieService.getAll();

    return NextResponse.json(
      {
        success: true,
        data: movies,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching movies:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch movies' },
      { status: 500 }
    );
  }
}

// POST /api/movies - Create a new movie
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const movie = await MovieService.create(body);

    return NextResponse.json(
      {
        success: true,
        data: movie,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating movie:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create movie' },
      { status: 500 }
    );
  }
}
