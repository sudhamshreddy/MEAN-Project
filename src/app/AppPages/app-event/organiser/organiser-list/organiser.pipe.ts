import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filter'
})
export class OrganiserPipe implements PipeTransform {
  
  

  transform(value: any,filteredNumber: number,propName: string): any {
    
    if(value.length === 0)
    {
      return value;
    }
   // ,filteredBudget: number,filteredSize: number,filteredLocation: string
    const resultArray = [];
    for(const organiser of value)
    {
      if(organiser[propName] >= filteredNumber)
      {
         resultArray.push(organiser);
      }
    }
    return resultArray;
  }

}
