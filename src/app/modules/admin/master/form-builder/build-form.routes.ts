import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { FormBuilderComponent } from './build-form.component';
import { inject } from '@angular/core';
import { FormManagerService } from '../form-manager/form-manager.service';

export default [
    {
        path     : '',
        component: FormBuilderComponent,
        resolve: {
            data: (route: ActivatedRouteSnapshot) => {
                const formId = route.paramMap.get('id');
                return inject(FormManagerService).onGetById(formId);
            }
        }
    },
] as Routes;
