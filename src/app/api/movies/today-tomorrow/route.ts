import { NextRequest, NextResponse } from 'next/server';
import { MovieService } from '@/services/movieService';

// GET /api/movies/today-tomorrow - Get movies showing today and tomorrow
export async function GET(request: NextRequest) {
  try {
    const movies = await MovieService.getTodayAndTomorrowMovies();

    return NextResponse.json(
      {
        success: true,
        data: movies,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching today and tomorrow movies:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch movies' },
      { status: 500 }
    );
  }
}
