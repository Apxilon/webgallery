'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GalleryClient } from './gallery-client';
import type { FileMetadata } from '@/lib/files';

export function AuthenticatedUploadPage({
  photos,
  videos,
  documents,
  audios,
}: {
  photos: FileMetadata[];
  videos: FileMetadata[];
  documents: FileMetadata[];
  audios: FileMetadata[];
}) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    const admin = Boolean(token);
    setIsAdmin(admin);
    setChecked(true);

    if (!admin) {
      router.replace('/');
    }
  }, [router]);

  if (!checked) {
    return null;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <GalleryClient
        photos={photos}
        videos={videos}
        documents={documents}
        audios={audios}
        isAdmin={true}
      />
    </div>
  );
}
