import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/db/mongodb';
import { ObjectId } from 'mongodb';

// GET /api/movies/[id] - Get a single movie by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDatabase();
    const moviesCollection = db.collection('movies');

    const movie = await moviesCollection.findOne({ _id: new ObjectId(params.id) });

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
    const db = await getDatabase();
    const moviesCollection = db.collection('movies');

    const body = await request.json();
    
    const updateDoc = {
      ...body,
      updatedAt: new Date(),
    };

    const result = await moviesCollection.findOneAndUpdate(
      { _id: new ObjectId(params.id) },
      { $set: updateDoc },
      { returnDocument: 'after' }
    );

    if (!result) {
      return NextResponse.json(
        { success: false, error: 'Movie not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating movie:', error);
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
    const db = await getDatabase();
    const moviesCollection = db.collection('movies');

    const result = await moviesCollection.deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 0) {
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
