import {Component, OnInit} from '@angular/core';
import {AdminServerService} from '../service/admin-server.service';
import {Auth0ServiceService} from '../../authentication/auth0/auth0-service.service';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-relationship',
  templateUrl: './relationship.component.html',
  styleUrls: ['./relationship.component.less']
})
export class RelationshipComponent implements OnInit {
  private perspective;
  private perspectiveLabel;
  ownerData;
  userData;
  // = {
  //   name: 'bucket975351',
  //   owner: '',
  //   accessInfo: null,
  //   completeName: '/',
  //   lastModified: null,
  //   children: [
  //     {
  //       name: 'sar.jpeg',
  //       owner: '',
  //       user: 'sethuram',
  //       accessInfo: null,
  //       completeName: '18228016.jpeg',
  //       lastModified: 'Apr 2, 2020, 5:18:10 AM'
  //     },
  //     {
  //       name: '18228016.jpeg',
  //       owner: '',
  //       user: 'sethuram',
  //       accessInfo: null,
  //       completeName: 'test5/18228016.jpeg',
  //       lastModified: 'Apr 6, 2020, 8:30:13 PM'
  //     },
  //     {
  //       name: 'sample.pdf',
  //       owner: '',
  //       accessInfo: null,
  //       completeName: 'sample.pdf',
  //       lastModified: 'Mar 7, 2020, 11:49:30 PM'
  //     },
  //     {
  //       name: 'sample',
  //       owner: '',
  //       accessInfo: null,
  //       completeName: 'sample/',
  //       lastModified: null,
  //       children: [
  //         {
  //           name: 'ibm-blockchain_second-edition_final_XIM12354USEN.pdf',
  //           owner: '',
  //           accessInfo: null,
  //           completeName: 'sample/ibm-blockchain_second-edition_final_XIM12354USEN.pdf',
  //           lastModified: 'Apr 6, 2020, 8:26:25 PM'
  //         }
  //       ]
  //     },
  //     {
  //       name: 'test5',
  //       owner: '',
  //       accessInfo: null,
  //       completeName: 'test5/',
  //       lastModified: null,
  //       children: [
  //         {
  //           name: '18228016.jpeg',
  //           owner: '',
  //           user: 'sethuram',
  //           accessInfo: null,
  //           completeName: 'test5/18228016.jpeg',
  //           lastModified: 'Apr 6, 2020, 8:30:13 PM'
  //         },
  //         {
  //           name: '18228016.jpeg',
  //           owner: '',
  //           user: 'ramu',
  //           accessInfo: null,
  //           completeName: 'test5/18228016.jpeg',
  //           lastModified: 'Apr 6, 2020, 8:30:13 PM'
  //         },
  //         {
  //           name: '18228016.jpeg',
  //           owner: '',
  //           user: 'reddy',
  //           accessInfo: null,
  //           completeName: 'test5/18228016.jpeg',
  //           lastModified: 'Apr 6, 2020, 8:30:13 PM'
  //         },
  //         {
  //           name: 'ibm-blockchain_second-edition_final_XIM12354USEN.pdf',
  //           owner: '',
  //           accessInfo: null,
  //           completeName: 'sample/ibm-blockchain_second-edition_final_XIM12354USEN.pdf',
  //           lastModified: 'Apr 6, 2020, 8:26:25 PM'
  //         }
  //       ]
  //     }
  //   ]
  // };

  //
  // private testData = {
  //   name: 'root',
  //   children: [
  //     {
  //       name: 'folder/',
  //       children: [
  //         {
  //           name: 'subfolder1/saplie1.txt',
  //           children: [
  //             {name: 'Read'},
  //             {name: 'Write'},
  //             {name: 'Delete'}
  //           ]
  //         }, {
  //           name: 'subfolder1/saplie3.txt',
  //           children: [
  //             {name: 'Read'},
  //             {name: 'Write'},
  //             {name: 'Delete'}
  //           ]
  //         },
  //         {
  //           name: 'subfolder12/saplie_without_access.txt'
  //         },
  //         {
  //           name: 'subfolder1/saplie2.txt',
  //           children: [
  //             {name: 'Read'},
  //             {name: 'Delete'}
  //           ]
  //         },
  //         {
  //           name: 'subfolder1/',
  //           children: [
  //             {
  //               name: 'subfolder11/saplie1.txt',
  //               children: [
  //                 {name: 'Delete'},
  //                 {name: 'Write'}
  //               ]
  //             },
  //             {
  //               name: 'subfolder12/saplie2.txt',
  //               children: [
  //                 {name: 'Delete'},
  //                 {name: 'Write'}
  //               ]
  //             },
  //             {
  //               name: 'subfolder12/saplie_without_access.txt'
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       name: 'folder2/',
  //       children: [
  //         {
  //           name: 'subfolder2/saplie1.txt',
  //           children: [
  //             {name: 'Read'},
  //             {name: 'Write'}
  //           ]
  //         },
  //         {
  //           name: 'subfolder23/saplie_without_access.txt'
  //         },
  //         {
  //           name: 'subfolder2/saplie2.txt',
  //           children: [
  //             {name: 'Read'},
  //             {name: 'Delete'}
  //           ]
  //         },
  //         {
  //           name: 'subfolder2/',
  //           children: [
  //             {
  //               name: 'subfolder21/saplie1.txt',
  //               children: [
  //                 {name: 'Delete'},
  //                 {name: 'Write'}
  //               ]
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       name: 'folder3/',
  //       children: [
  //         {
  //           name: 'subfolder3/saplie1.txt',
  //           children: [
  //             {name: 'Read'},
  //             {name: 'Write'}
  //           ]
  //         },
  //         {
  //           name: 'subfolder3/saplie2.txt',
  //           children: [
  //             {name: 'Read'},
  //             {name: 'Delete'}
  //           ]
  //         },
  //         {
  //           name: 'subfolder3/',
  //           children: [
  //             {
  //               name: 'subfolder31/saplie1.txt',
  //               children: [
  //                 {name: 'Delete'},
  //                 {name: 'Write'}
  //               ]
  //             },
  //             {
  //               name: 'subfolder32/saplie_without_access.txt'
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       name: 'folder4/',
  //       children: [
  //         {
  //           name: 'subfolder4/saplie1.txt',
  //           children: [
  //             {name: 'Read'},
  //             {name: 'Write'}
  //           ]
  //         },
  //         {
  //           name: 'subfolder4/saplie2.txt',
  //           children: [
  //             {name: 'Read'},
  //             {name: 'Delete'}
  //           ]
  //         },
  //         {
  //           name: 'subfolder4/',
  //           children: [
  //             {
  //               name: 'subfolder41/saplie1.txt',
  //               children: [
  //                 {name: 'Delete'},
  //                 {name: 'Write'}
  //               ]
  //             },
  //             {
  //               name: 'subfolder42/saplie_without_access.txt'
  //             }
  //           ]
  //         },
  //         {
  //           name: 'subfolder42/',
  //           children: [
  //             {
  //               name: 'subfolder421/saplie1.txt',
  //               children: [
  //                 {name: 'Delete'},
  //                 {name: 'Write'}
  //               ]
  //             },
  //             {
  //               name: 'subfolder422/saplie_without_access.txt'
  //             }
  //           ]
  //         }
  //       ]
  //     }, {
  //       name: 'folder5/',
  //       children: [
  //         {
  //           name: 'subfolder5/saplie1.txt',
  //           children: [
  //             {name: 'Read'},
  //             {name: 'Write'}
  //           ]
  //         },
  //         {
  //           name: 'subfolder5/saplie2.txt',
  //           children: [
  //             {name: 'Read'},
  //             {name: 'Delete'}
  //           ]
  //         },
  //         {
  //           name: 'subfolder5/',
  //           children: [
  //             {
  //               name: 'subfolder51/saplie1.txt',
  //               children: [
  //                 {name: 'Delete'},
  //                 {name: 'Write'}
  //               ]
  //             },
  //             {
  //               name: 'subfolder52/saplie_without_access.txt'
  //             }
  //           ]
  //         },
  //         {
  //           name: 'subfolder52/',
  //           children: [
  //             {
  //               name: 'subfolder521/saplie1.txt',
  //               children: [
  //                 {name: 'Delete'},
  //                 {name: 'Write'}
  //               ]
  //             },
  //             {
  //               name: 'subfolder522/saplie_without_access.txt'
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // };
  private selectedBucket: string;


  constructor(private adminService: AdminServerService,
              private oauth: Auth0ServiceService,
              private toaster: ToastrService) {
  }

  ngOnInit() {
    this.perspective = false;
    this.perspectiveLabel = 'User';
    this.selectedBucket = 'Choose Bucket';
  }

  filterBuckets(selectedBucket: string) {

    if (selectedBucket === 'Choose Bucket') {
      this.toaster.warning('Please Select Bucket');
    } else {
      this.selectedBucket = selectedBucket.toLowerCase();
      this.adminService.getUsersFileAccessedByOthers(this.oauth.getUserId(), this.selectedBucket).subscribe(value => {
        this.userData = value;
      });
    }
  }

  changePerspective() {
    if (this.perspective === true) {
      this.perspectiveLabel = 'Owner';
      if (this.selectedBucket === 'Choose Bucket') {
        this.toaster.warning('Please Select Bucket');
      } else {
        this.adminService.getFilesAccessedByUserInBucket(this.oauth.getUserId(), this.selectedBucket).subscribe(value => {
          this.ownerData = value;
        });
      }
    } else {
      this.perspectiveLabel = 'User';
      if (this.selectedBucket === 'Choose Bucket') {
        this.toaster.warning('Please Select Bucket');
      } else {
        this.adminService.getUsersFileAccessedByOthers(this.oauth.getUserId(), this.selectedBucket).subscribe(value => {
          this.userData = value;
        });
      }
    }
  }


}
