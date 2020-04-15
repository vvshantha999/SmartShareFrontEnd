import {DeleteObjectRequest} from './DeleteObjectRequest';

export class DeleteObjectsRequest {

  folderObjects: DeleteObjectRequest[];
  bucketName: string;
}
