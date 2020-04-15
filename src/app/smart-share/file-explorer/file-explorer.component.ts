import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, UrlSegment} from '@angular/router';
import {FileServerService} from '../service/file-server.service';
import {UploadObject} from '../domain-models/UploadObject';
import {Auth0ServiceService} from '../../authentication/auth0/auth0-service.service';
import {S3DownloadObject} from '../domain-models/S3DownloadObject';
import {DownloadFolderRequest} from '../domain-models/DownloadFolderRequest';
import * as JSZip from 'node_modules/jszip/dist/jszip.min.js';
import {DeleteObjectRequest} from '../domain-models/DeleteObjectRequest';
import {DeleteObjectsRequest} from '../domain-models/DeleteObjectsRequest';
import {ObjectAccessRequest} from '../domain-models/ObjectAccessRequest';
import {AdminServerService} from '../service/admin-server.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.less']
})
export class FileExplorerComponent implements OnInit {


  bucketObjects;


  private selectedBucket: string;
  private uploadPanelOpenState = false;
  private fileManagerPanelOpenState = true;
  private lastModified: Date;
  private selectedFileOrFolder;
  filesToBeDownloaded = [];
  private filesToBeUploaded: File[] = [];
  uploadFolderBoxTitle = 'Choose Folder';
  disableTextBox = true;
  private readChecked = false;
  private writeChecked = false;
  private deleteChecked = false;
  private selectedFileOrFolderNode;
  private filesToBeUploadedWithMetadata: Array<UploadObject> = [];

  constructor(private route: ActivatedRoute, private fileServerService: FileServerService,
              private oauth: Auth0ServiceService,
              private adminServerService: AdminServerService,
              private toastr: ToastrService
  ) {
    this.bucketObjects = this.route.snapshot.data.bucketObjects;
  }

  ngOnInit() {
    this.route.url.subscribe((url: UrlSegment[]) => {
      this.selectedBucket = url[0].parameters.bucketName;
    });
  }

  filterBuckets(selectedBucket: string) {
    if (selectedBucket === 'Choose Bucket') {
      alert('choose userManged name');
    } else {
      this.selectedBucket = selectedBucket.toLowerCase();
      this.fileServerService.getBucketObjects(this.oauth.getUser()._userName, this.selectedBucket).subscribe(value => {
        this.bucketObjects = value;
        this.displayFileStructureChart();
      });
    }
  }

  displayFileStructureChart() {
    return this.getFileStructureChartData();
  }

  openUploadPanel() {
    this.uploadPanelOpenState = true;
    this.fileManagerPanelOpenState = false;
  }


  removeFileFromSelectedFiles(selectedFile) {
    this.filesToBeUploaded = this.filesToBeUploaded.filter((file) => file.name !== selectedFile);
  }

  cancelUploadTask() {
    this.uploadPanelOpenState = false;
    this.fileManagerPanelOpenState = true;
  }

  onUpload() {
    console.log(this.filesToBeUploadedWithMetadata);
    if (this.filesToBeUploadedWithMetadata.length > 0) {
      this.fileServerService.uploadFile(this.filesToBeUploadedWithMetadata).subscribe(uploadStatus => {
        if (uploadStatus) {
          this.fileServerService.getBucketObjects(this.oauth.getUser()._userName, this.selectedBucket).subscribe(value => {
            this.bucketObjects = value;
            this.displayFileStructureChart();
            this.cancelUploadTask();
            this.filesToBeUploadedWithMetadata = [];
            this.filesToBeUploaded = [];
          });
        }
      });
    }
  }

  extractFileContents(selectedFile) {
    this.filesToBeUploaded.push(selectedFile);
    const reader = new FileReader();
    let dataToBeUploaded: UploadObject = null;
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      if (reader.result) {
        console.log(reader.result);
        const selectedFolder = (this.selectedFileOrFolder === '/') ? '' : this.selectedFileOrFolder;
        // tslint:disable-next-line:max-line-length
        dataToBeUploaded = new UploadObject(selectedFolder.trim() + selectedFile.name, reader.result.toString().split(',')[1], this.oauth.getUser()._userName, this.selectedBucket);
        this.filesToBeUploadedWithMetadata.push(dataToBeUploaded);
      }
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  onFileSelected(event) {
    const selectedFile = event.target.files[0] as File;
    this.extractFileContents(selectedFile);
  }

  onFolderSelected(event) {
    const folderName = event.target.files[0].webkitRelativePath.split('/');
    folderName.pop();
    folderName.join('/');
    this.uploadFolderBoxTitle = folderName;
    const reader = new FileReader();
    [...event.target.files].forEach((file) => {
      this.filesToBeUploaded.push(file);
      let dataToBeUploaded: UploadObject = null;
      const selectedFolder = (this.selectedFileOrFolder === '/') ? '' : this.selectedFileOrFolder;
      if (file.name === '.DS_Store') {
        // tslint:disable-next-line:max-line-length
        dataToBeUploaded = new UploadObject(selectedFolder.trim() + folderName + '/', '', this.oauth.getUser()._userName, this.selectedBucket);
        this.filesToBeUploadedWithMetadata.push(dataToBeUploaded);
      } else {
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (reader.result) {
            console.log(reader.result);
            // tslint:disable-next-line:max-line-length
            dataToBeUploaded = new UploadObject(selectedFolder.trim() + folderName + '/' + file.name, reader.result.toString().split(',')[1], this.oauth.getUser()._userName, this.selectedBucket);
            this.filesToBeUploadedWithMetadata.push(dataToBeUploaded);
          }
        };
        reader.onerror = (error) => {
          console.log('Error: ', error);
        };
      }
    });
  }

  assignSelectedFileOrFolder(selectedFileOrFolderEvent) {
    console.log(selectedFileOrFolderEvent);
    this.selectedFileOrFolderNode = selectedFileOrFolderEvent;
    this.selectedFileOrFolder = selectedFileOrFolderEvent.data.completeName;
    this.lastModified = selectedFileOrFolderEvent.data.lastModified;
    // have to assign accessInfo
    // this.readChecked = selectedFileOrFolderEvent.data.acces
    // this.writeChecked = selectedFileOrFolderEvent.data.acces
    // this.deleteChecked = selectedFileOrFolderEvent.data.acces
  }

  downloadFileFolder() {
    if (this.selectedFileOrFolderNode.children !== undefined) {
      this.filesToBeDownloaded = [];
      this.downloadFolder(this.selectedFileOrFolderNode);
    } else {
      const fileName = this.selectedFileOrFolder.split('/')[this.selectedFileOrFolder.split('/').length - 1];
      this.downloadFile(fileName, this.selectedFileOrFolder, this.selectedBucket);
    }

  }

  deleteFileFolder() {
    if (this.selectedFileOrFolderNode.children !== undefined) {
      const deleteObjectsRequest = new DeleteObjectsRequest();
      const requests = [];
      const folderDeleteRequest = new DeleteObjectRequest();
      folderDeleteRequest.bucketName = this.selectedBucket;
      folderDeleteRequest.objectName = this.selectedFileOrFolderNode.data.completeName;
      folderDeleteRequest.ownerName = this.selectedFileOrFolderNode.data.owner;
      requests.push(folderDeleteRequest);
      this.selectedFileOrFolderNode.children.forEach(child => {
        const request = new DeleteObjectRequest();
        request.bucketName = this.selectedBucket;
        request.objectName = child.data.completeName;
        request.ownerName = child.data.owner;
        requests.push(request);
      });
      deleteObjectsRequest.folderObjects = requests;
      deleteObjectsRequest.bucketName = this.selectedBucket;
      console.log(deleteObjectsRequest);
      this.fileServerService.deleteFolder(deleteObjectsRequest).subscribe(deleteStatus => {
        if (deleteStatus) {
          this.fileServerService.getBucketObjects(this.oauth.getUser()._userName, this.selectedBucket).subscribe(value => {
            this.bucketObjects = value;
            this.displayFileStructureChart();
          });
        }
      });
    } else {
      this.fileServerService
        .deleteFile(this.selectedFileOrFolder, this.selectedBucket, this.selectedFileOrFolderNode.data.owner).subscribe(deleteStatus => {
        if (deleteStatus) {
          this.fileServerService.getBucketObjects(this.oauth.getUser()._userName, this.selectedBucket).subscribe(value => {
            this.bucketObjects = value;
            this.displayFileStructureChart();
            this.selectedFileOrFolder = null;
          });
        }
      });
    }
  }

  createNewFolder() {
    this.disableTextBox = false;
    this.selectedFileOrFolder = null;
  }

  submitNewFolder() {
    // tslint:disable-next-line:max-line-length
    const dataToBeUploaded: UploadObject = new UploadObject(this.selectedFileOrFolder.trim() + '/', '', this.oauth.getUser()._userName, this.selectedBucket);
    this.fileServerService.createNewFolder(dataToBeUploaded).subscribe(createStatus => {
      if (createStatus) {
        this.fileServerService.getBucketObjects(this.oauth.getUser()._userName, this.selectedBucket).subscribe(value => {
          this.bucketObjects = value;
          this.displayFileStructureChart();
          this.selectedFileOrFolder = null;
          this.disableTextBox = true;
        });
      }
    });
  }

  createAccessRequest(access) {
    if (this.selectedFileOrFolderNode.children === undefined) {
      console.log('inside file');
      const objectAccessRequest = new ObjectAccessRequest();
      objectAccessRequest.access = access;
      objectAccessRequest.bucketName = this.selectedBucket;
      objectAccessRequest.objectName = this.selectedFileOrFolderNode.data.completeName;
      objectAccessRequest.ownerName = this.selectedFileOrFolderNode.data.owner;
      this.adminServerService.createAccessRequest([objectAccessRequest]).subscribe(value => {
        console.log(value);
        (value) ? this.toastr.success(access + 'Request created Successfully ', 'Access Request') :
          this.toastr.error(access + 'Request failed !', 'Access Request');
      });
    } else {
      console.log('inside folder');
      const requests = [];
      const objectAccessRequest = new ObjectAccessRequest();
      objectAccessRequest.access = access;
      objectAccessRequest.bucketName = this.selectedBucket;
      objectAccessRequest.objectName = this.selectedFileOrFolderNode.data.completeName;
      objectAccessRequest.ownerName = this.selectedFileOrFolderNode.data.owner;
      requests.push(objectAccessRequest);
      this.selectedFileOrFolderNode.children.forEach(child => {
        const request = new ObjectAccessRequest();
        request.access = access;
        request.bucketName = this.selectedBucket;
        request.objectName = child.data.completeName;
        request.ownerName = child.data.owner;
        requests.push(request);
      });
      console.log(requests);
      this.adminServerService.createAccessRequest(requests).subscribe(value => {
        console.log(value);
        (value) ? this.toastr.success(access + 'Request created Successfully ', 'Access Request') :
          this.toastr.error(access + 'Request failed !', 'Access Request');
      });
    }
  }

  private getFileStructureChartData() {
    return this.bucketObjects;
  }

  private downloadFile(fileName, objectName, bucketName) {
    this.fileServerService.downloadFile(fileName, objectName, bucketName);
  }

  private downloadFolder(node) {
    const downloadFolderRequest: DownloadFolderRequest = new DownloadFolderRequest();
    const zipFile: JSZip = new JSZip();
    this.objectPathExtractor(node.children);
    downloadFolderRequest.objectsToBeDownloaded = this.filesToBeDownloaded;
    this.fileServerService.downloadFolder(downloadFolderRequest).subscribe(value => {
      value.forEach((object) => {
        zipFile.file(object.objectName, object.downloadedObjectInBase64, {base64: true});
      });
      zipFile.generateAsync({type: 'blob'})
        .then((content) => {
          saveAs(content, node.data.name);
        });
    });
  }

  private objectPathExtractor(node) {
    node.forEach((g) => {
      if (typeof (g) === 'object') {
        if (!('children' in g)) {
          if (!g.data.name.endsWith('/')) {
            const s3DownloadObject = new S3DownloadObject();
            s3DownloadObject.bucketName = this.selectedBucket;
            s3DownloadObject.fileName = g.data.name;
            s3DownloadObject.objectName = g.data.completeName;
            this.filesToBeDownloaded.push(s3DownloadObject);
          }
        } else {
          this.objectPathExtractor(g.children);
        }
      }
    });
  }
}


