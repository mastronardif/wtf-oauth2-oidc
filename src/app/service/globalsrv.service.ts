import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalsrvService {
  private envOidc: BehaviorSubject<string> = new BehaviorSubject<string>(
    'Inital value TBD'
  );
  constructor() {}

  public getEnv() {
    return this.envOidc.asObservable();
  }

  public updateEnv(lan: string) {
    this.envOidc.next(lan);
  }

  public helper_getEnvSectionHeads(environment: any, ignore: Array<string>): Array<string> {
    var filteredArray= Object.keys(environment).filter((allNameObject) => !ignore.includes(allNameObject));
    return filteredArray;
  }
}
