import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { FormManagerComponent } from './form-manager.component';
import { FormManagerService } from './form-manager.service';

export default [
    {
        path     : '',
        component: FormManagerComponent,
        resolve  : {
            data: () => inject(FormManagerService).get(),
        },
    },
] as Routes;
