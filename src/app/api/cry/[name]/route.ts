import { NextResponse } from 'next/server';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ name: string }> | { name: string } }
) {
  const resolvedParams = await params;
  const rawName = resolvedParams.name || '';
  const name = rawName.toLowerCase();

  const candidates = [
    `https://play.pokemonshowdown.com/audio/cries/${name}.ogg`,
    `https://play.pokemonshowdown.com/audio/cries/${name}.mp3`,
    `https://play.pokemonshowdown.com/audio/cries/${rawName}.ogg`,
    `https://play.pokemonshowdown.com/audio/cries/${rawName}.mp3`,
  ];

  for (const url of candidates) {
    try {
      console.log('proxy: trying', url);
      const res = await fetch(url);
      console.log('proxy: got status', res.status, 'for', url);
      if (!res.ok) continue;
      const contentType = res.headers.get('content-type') || 'audio/ogg';
      const headers = new Headers();
      headers.set('Content-Type', contentType);
      return new Response(res.body, { status: 200, headers });
    } catch (e) {
      console.log('proxy: error', String(e), 'for', url);
      // try next
    }
  }

  return NextResponse.json({ error: 'not found' }, { status: 404 });
}
