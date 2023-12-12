import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { PasienComponent } from './pasien.component';
import { PasienService } from './pasien.service';
import { DialogComponent } from './dialog/dialog.component';
import { FormManagerService } from '../master/form-manager/form-manager.service';

export default [
    {
        path     : '',
        component: PasienComponent,
        resolve  : {
            data: () => inject(PasienService).onGet(),
        },
        children: [
          {
            path     : '',
            component: DialogComponent,
            resolve  : {
                data: () => inject(FormManagerService).onGet(),
            },
          }
        ]
    },
] as Routes;
