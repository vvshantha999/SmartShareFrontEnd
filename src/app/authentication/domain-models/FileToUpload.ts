export class FileToUpload {

  uploadedFileName: string;
  uploadedFileContent: any;
  ownerOfTheFile: string;
  selectedFolderWhereFolderHasToBeUploaded: string;
  bucketName: string;

  // tslint:disable-next-line:max-line-length
  constructor(uploadedFileName: string, uploadedFileContent: any, ownerOfTheFile: string, selectedFolderWhereFolderHasToBeUploaded: string, bucketName: string) {
    this.uploadedFileName = uploadedFileName;
    this.uploadedFileContent = uploadedFileContent;
    this.ownerOfTheFile = ownerOfTheFile;
    this.selectedFolderWhereFolderHasToBeUploaded = selectedFolderWhereFolderHasToBeUploaded;
    this.bucketName = bucketName;
  }
}
