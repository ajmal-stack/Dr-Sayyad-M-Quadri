import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const resolvedParams = await params;
  return proxyRequest(request, resolvedParams.slug, 'GET');
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const resolvedParams = await params;
  return proxyRequest(request, resolvedParams.slug, 'POST');
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const resolvedParams = await params;
  return proxyRequest(request, resolvedParams.slug, 'PUT');
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const resolvedParams = await params;
  return proxyRequest(request, resolvedParams.slug, 'DELETE');
}

async function proxyRequest(
  request: NextRequest,
  slug: string[],
  method: string
) {
  try {
    const path = slug.join('/');
    const url = `${API_BASE_URL}/auth/${path}`;

    // Get request body for POST/PUT requests
    let body: string | undefined;
    if (method === 'POST' || method === 'PUT') {
      body = await request.text();
    }

    // Forward headers (excluding host and content-length)
    const headers: Record<string, string> = {};
    request.headers.forEach((value, key) => {
      if (!['host', 'content-length'].includes(key.toLowerCase())) {
        headers[key] = value;
      }
    });

    // Add query parameters
    const searchParams = request.nextUrl.searchParams.toString();
    const fullUrl = searchParams ? `${url}?${searchParams}` : url;

    const response = await fetch(fullUrl, {
      method,
      headers,
      body,
    });

    const data = await response.text();

    // Create response with same status and headers
    const nextResponse = new NextResponse(data, {
      status: response.status,
      statusText: response.statusText,
    });

    // Forward response headers
    response.headers.forEach((value, key) => {
      if (
        !['content-encoding', 'content-length', 'transfer-encoding'].includes(
          key.toLowerCase()
        )
      ) {
        nextResponse.headers.set(key, value);
      }
    });

    return nextResponse;
  } catch (error) {
    console.error('API Proxy Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
