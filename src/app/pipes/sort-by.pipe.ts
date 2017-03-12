import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (typeof args === 'object'){
      value = value.filter((img)=>{
        return img.name.indexOf(args.search) >= 0
      })
    }

    if (args === 'date'){
      value.sort((a, b)=> {
        a.date = new Date(a.date);
        b.date = new Date(b.date);
        if (a.date > b.date) return -1;
        if (a.date < b.date) return 1;
      });
    }
    if (args === 'name'){
      value.sort((a, b)=>{
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
      })
    }

    return value
  }

}
