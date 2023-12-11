import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { PasienComponent } from './pasien.component';
import { PasienService } from './pasien.service';

export default [
    {
        path     : '',
        component: PasienComponent,
        resolve  : {
            data: () => inject(PasienService).onGet(),
        },
    },
] as Routes;
