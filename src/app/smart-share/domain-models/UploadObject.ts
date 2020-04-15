export class UploadObject {

  objectName: string;
  content: any;
  owner: string;
  bucketName: string;


  constructor(objectName: string, content: any, owner: string, bucketName: string) {
    this.objectName = objectName;
    this.content = content;
    this.owner = owner;
    this.bucketName = bucketName;
  }
}
