import { NextRequest, NextResponse } from 'next/server';
import { MovieService } from '@/services/movieService';

// GET /api/movies/[id] - Get a single movie by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const param = await params;
    const movie = await MovieService.getById(param.id);

    return NextResponse.json(
      {
        success: true,
        data: movie,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching movie:', error);
    
    if (error.message === 'Movie not found') {
      return NextResponse.json(
        { success: false, error: 'Movie not found' },
        { status: 404 }
      );
    }

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
    const param = await params;
    const body = await request.json();
    
    const movie = await MovieService.update(param.id, body);

    return NextResponse.json(
      {
        success: true,
        data: movie,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating movie:', error);
    
    if (error.message === 'Movie not found') {
      return NextResponse.json(
        { success: false, error: 'Movie not found' },
        { status: 404 }
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
    const param = await params;
    await MovieService.delete(param.id);

    return NextResponse.json(
      {
        success: true,
        data: {},
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting movie:', error);
    
    if (error.message === 'Movie not found') {
      return NextResponse.json(
        { success: false, error: 'Movie not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to delete movie' },
      { status: 500 }
    );
  }
}
