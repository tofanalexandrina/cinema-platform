import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/db/mongodb';

// GET /api/movies - Get all movies
export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase();
    const moviesCollection = db.collection('movies');

    const movies = await moviesCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

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
    const db = await getDatabase();
    const moviesCollection = db.collection('movies');

    const body = await request.json();

    // Add timestamps
    const movieDocument = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await moviesCollection.insertOne(movieDocument);

    return NextResponse.json(
      {
        success: true,
        data: { _id: result.insertedId, ...movieDocument },
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
