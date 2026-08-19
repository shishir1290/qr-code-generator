import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const title = formData.get('title') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate that the file is an audio file
    if (!file.type.startsWith('audio/') && !file.name.match(/\.(mp3|wav|ogg|m4a|aac|wma|flac)$/i)) {
      return NextResponse.json({ error: 'Only audio files are allowed' }, { status: 400 });
    }

    // Limit file size to 10MB
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File size exceeds the 10MB limit' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure uploads directory exists inside public
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Generate unique ID and filename
    const id = crypto.randomUUID();
    const originalExt = path.extname(file.name) || '.mp3';
    const filename = `${id}${originalExt}`;
    const filePath = path.join(uploadsDir, filename);

    // Write file to public/uploads
    await fs.promises.writeFile(filePath, buffer);

    // Save metadata file
    const metadata = {
      id,
      originalName: file.name,
      title: title || 'Audio QR Code',
      fileUrl: `/uploads/${filename}`,
      mimeType: file.type || 'audio/mpeg',
      size: file.size,
      createdAt: new Date().toISOString(),
    };

    const metadataPath = path.join(uploadsDir, `${id}.json`);
    await fs.promises.writeFile(metadataPath, JSON.stringify(metadata, null, 2), 'utf8');

    return NextResponse.json({
      success: true,
      id,
      url: `/audio/${id}`,
      originalName: file.name,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message || 'Failed to upload audio' }, { status: 500 });
  }
}
