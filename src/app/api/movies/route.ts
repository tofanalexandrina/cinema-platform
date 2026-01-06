import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/db/mongodb';
import Movie from '@/db/models/Movie';

// GET /api/movies - Get all movies
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const movies = await Movie.find({}).sort({ createdAt: -1 }).lean();

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
    await connectDB();

    const body = await request.json();

    // Create movie
    const movie = await Movie.create(body);

    return NextResponse.json(
      {
        success: true,
        data: movie,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating movie:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { success: false, error: errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create movie' },
      { status: 500 }
    );
  }
}
