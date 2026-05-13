import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

const SANITY_REVALIDATE_SECRET = process.env.SANITY_REVALIDATE_SECRET;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Verify the webhook secret if configured
    if (SANITY_REVALIDATE_SECRET) {
      const secret = request.headers.get('x-sanity-secret');

      if (secret !== SANITY_REVALIDATE_SECRET) {
        return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
      }
    }

    const type = body?._type as string | undefined;

    if (!type) {
      return NextResponse.json({ message: 'No _type in body' }, { status: 400 });
    }

    // Map Sanity document types to cache tags
    const tagMap: Record<string, string> = {
      project: 'projects',
      experience: 'experiences',
      education: 'education',
      techStack: 'techStack',
    };

    const tag = tagMap[type];

    if (tag) {
      revalidateTag(tag);
      return NextResponse.json({ revalidated: true, tag });
    }

    return NextResponse.json({ message: `No tag for type: ${type}` }, { status: 200 });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
