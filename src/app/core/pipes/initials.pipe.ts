import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials',
})
export class InitialsPipe implements PipeTransform {
  transform(name: string): string {
    const namesArray = name.split(' ');
    const initialsArray = namesArray.map((name) => name.substring(0, 1));

    return initialsArray.join('');
  }
}
