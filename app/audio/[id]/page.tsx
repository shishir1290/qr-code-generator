import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import AudioPlayerClient from './AudioPlayerClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getMetadata(id: string) {
  try {
    const metadataPath = path.join(process.cwd(), 'public', 'uploads', `${id}.json`);
    if (!fs.existsSync(metadataPath)) {
      return null;
    }
    const data = await fs.promises.readFile(metadataPath, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
}

export default async function AudioPage({ params }: PageProps) {
  const { id } = await params;
  const metadata = await getMetadata(id);

  if (!metadata) {
    notFound();
  }

  return <AudioPlayerClient metadata={metadata} />;
}
