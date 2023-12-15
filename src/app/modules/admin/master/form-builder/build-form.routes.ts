import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { FormBuilderComponent } from './build-form.component';
import { inject } from '@angular/core';
import { FormManagerService } from '../form-manager/form-manager.service';
import { FormBuilderService } from './build-form.service';
import { switchMap } from 'rxjs';

export default [
    {
        path: '',
        component: FormBuilderComponent,
        resolve: {
            data: (route: ActivatedRouteSnapshot) => {
                const formId = route.paramMap.get('id');
                const formManagerService = inject(FormManagerService);
                const formBuilderService = inject(FormBuilderService);

                return formManagerService.onGetById(formId).pipe(
                    switchMap((formManagerData) => {
                        return formBuilderService.onGetById(formId);
                    })
                );
            }
        }
    },
] as Routes;
