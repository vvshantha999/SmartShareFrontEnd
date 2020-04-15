import {S3DownloadObject} from './S3DownloadObject';

export class DownloadFolderRequest {
  objectsToBeDownloaded: S3DownloadObject[];
}
