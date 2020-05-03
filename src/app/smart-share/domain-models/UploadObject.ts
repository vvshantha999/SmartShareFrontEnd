export class UploadObject {

  objectName: string;
  content: any;
  owner: string;
  ownerId: number;
  bucketName: string;


  constructor(objectName: string, content: any, owner: string, ownerId: number, bucketName: string) {
    this.objectName = objectName;
    this.content = content;
    this.owner = owner;
    this.ownerId = ownerId;
    this.bucketName = bucketName;
  }
}
