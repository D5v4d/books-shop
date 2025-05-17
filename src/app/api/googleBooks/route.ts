import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const subject = searchParams.get('subject');
    const startIndex = searchParams.get('startIndex');

    if (!subject) {
        return Response.json({ error: true, message: 'Missing "subject" parameter' }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    
    const params = new URLSearchParams();
    params.set('q', `"subject:${subject}"`);
    params.set('startIndex', `${startIndex}`);
    params.set('maxResults', '6');
    params.set('langRestrict', 'en');
    params.set('key', `${apiKey}`);
    params.set('printType', 'books');

    try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?${params.toString()}`);
        if (!res.ok) throw new Error(`Google Books API returned ${res.status}`);

        const data = await res.json();
        return Response.json(data);
    } catch (error) {
        console.error('Error fetching books:', error);
        return Response.json({ error: 'Failed to fetch books' }, { status: 500 });
    }
}