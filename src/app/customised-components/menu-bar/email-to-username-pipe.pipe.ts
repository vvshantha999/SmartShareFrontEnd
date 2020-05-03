import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'emailToUsernamePipe'
})
export class EmailToUsernamePipePipe implements PipeTransform {
  // tslint:disable-next-line:max-line-length
  private regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);


  transform(value: string, ...args: any[]): any {
    if (this.regexp.test(value)) {
      return value.split('@')[0];
    }
    return value;
  }
}
