import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/db/mongodb';
import Movie from '@/db/models/Movie';

// GET /api/movies/[id] - Get a single movie by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const movie = await Movie.findById(params.id);

    if (!movie) {
      return NextResponse.json(
        { success: false, error: 'Movie not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: movie,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching movie:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch movie' },
      { status: 500 }
    );
  }
}

// PUT /api/movies/[id] - Update a movie by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const body = await request.json();

    const movie = await Movie.findByIdAndUpdate(
      params.id,
      body,
      {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators
      }
    );

    if (!movie) {
      return NextResponse.json(
        { success: false, error: 'Movie not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: movie,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating movie:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { success: false, error: errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update movie' },
      { status: 500 }
    );
  }
}

// DELETE /api/movies/[id] - Delete a movie by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const movie = await Movie.findByIdAndDelete(params.id);

    if (!movie) {
      return NextResponse.json(
        { success: false, error: 'Movie not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {},
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting movie:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete movie' },
      { status: 500 }
    );
  }
}
