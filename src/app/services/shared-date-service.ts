import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedDataService {
    private _esignData = new BehaviorSubject<any>(null);

    get esignData$() {
        return this._esignData.asObservable();
    }

    setEsignData(data: any) {
        this._esignData.next(data);
    }
}
