export class UserBucketMapping {
  userId: number;
  userName: string;
  bucketName: string;

  constructor(userId: number, userName: string, selectedBucket: string) {
    this.userId = userId;
    this.userName = userName;
    this.bucketName = selectedBucket;
  }
}
