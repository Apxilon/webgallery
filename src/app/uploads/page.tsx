import { getFiles } from '@/lib/files';
import { AuthenticatedUploadPage } from '@/components/authenticated-upload-page';

export default async function UploadsPage() {
  const photos = await getFiles('images');
  const videos = await getFiles('videos');
  const documents = await getFiles('documents');
  const audios = await getFiles('audios');

  return (
    <AuthenticatedUploadPage
      photos={photos}
      videos={videos}
      documents={documents}
      audios={audios}
    />
  );
}
