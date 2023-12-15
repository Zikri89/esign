import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, Routes } from '@angular/router';
import { FileManagerDetailsComponent } from 'app/modules/admin/apps/file-manager/details/details.component';
import { FileManagerComponent } from 'app/modules/admin/apps/file-manager/file-manager.component';
import { FileManagerService } from 'app/modules/admin/apps/file-manager/file-manager.service';
import { FileManagerListComponent } from 'app/modules/admin/apps/file-manager/list/list.component';
import { catchError, forkJoin, switchMap, throwError } from 'rxjs';
import { FormsWizardsComponent } from './wizards/wizards.component';
import { PatientService } from '../../master/pasien/patients.service';
import { FormManagerService } from '../../master/form-manager/form-manager.service';
import { HttpUrlEncodingCodec } from '@angular/common/http';
import { PasienService } from '../../pasien/services/pasien.service';
import { RegPeriksaService } from '../../pasien/regperiksa/regperiksa.service';
import { GeneralConcentComponent } from './wizards/formulir/formulir.component';
import { FormDataPasienService } from './wizards/form-data-pasien.service';
import { FormBuilderService } from '../../master/form-builder/build-form.service';
/**
 * Folder resolver
 *
 * @param route
 * @param state
 */

/**
 * Item resolver
 *
 * @param route
 * @param state
 */
const itemResolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
{
    const fileManagerService = inject(FileManagerService);
    const router = inject(Router);
    return fileManagerService.getItemById(route.paramMap.get('id')).pipe(
        // Error here means the requested item is not available
        catchError((error) =>
        {
            // Log the error
            console.error(error);

            // Get the parent url
            const parentUrl = state.url.split('/').slice(0, -1).join('/');

            // Navigate to there
            router.navigateByUrl(parentUrl);

            // Throw an error
            return throwError(error);
        }),
    );
};

const formResolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
{
    const fileManagerService = inject(FormManagerService);
    const regPeriksaService = inject(RegPeriksaService);
    const pasienService = inject(PatientService);
    const router = inject(Router);

    const codec = new HttpUrlEncodingCodec();
    const formulirId = route.paramMap.get('formulirId');
    const noRawat = encodeURIComponent(route.paramMap.get('noRawat'));
    const noRkmMedis = encodeURIComponent(route.paramMap.get('noRkmMedis'));

    const fileManagerObservable = fileManagerService.onGetById(formulirId).pipe(
        // Error here means the requested item is not available
        catchError((error) =>
        {
            // Log the error
            console.error(error);

            // Get the parent url
            const parentUrl = state.url.split('/').slice(0, -1).join('/');

            // Navigate to there
            router.navigateByUrl(parentUrl);

            // Throw an error
            return throwError(error);
        }),
    );

    const regPeriksaObservable = regPeriksaService.onGetById(noRawat).pipe(
        // Error here means the requested item is not available
        catchError((error) =>
        {
            // Log the error
            console.error(error);

            // Get the parent url
            const parentUrl = state.url.split('/').slice(0, -1).join('/');

            // Navigate to there
            router.navigateByUrl(parentUrl);

            // Throw an error
            return throwError(error);
        }),
    );

    const pasienObservable = pasienService.onGetById(noRkmMedis).pipe(
        // Error here means the requested item is not available
        catchError((error) =>
        {
            // Log the error
            console.error(error);

            // Get the parent url
            const parentUrl = state.url.split('/').slice(0, -1).join('/');

            // Navigate to there
            router.navigateByUrl(parentUrl);

            // Throw an error
            return throwError(error);
        }),
    );

    return forkJoin({
        formData: fileManagerObservable,
        regData: regPeriksaObservable,
        formDataPasien: pasienObservable
      });


};

const formResolverDataPasien = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
{
    const formDataPasienService = inject(FormDataPasienService);
    const formBuilderService = inject(FormBuilderService);
    const router = inject(Router);

    const noRawat = encodeURIComponent(route.paramMap.get('noRawat'));
    const formulirId = route.paramMap.get('formulirId');

    return formDataPasienService.onGetById(noRawat).pipe(
        switchMap((formDataPasienData) => {
            return formBuilderService.onGetById(formulirId);
        }),
        catchError((error) =>
        {
            // Log the error
            console.error(error);

            // Get the parent url
            const parentUrl = state.url.split('/').slice(0, -1).join('/');

            // Navigate to there
            router.navigateByUrl(parentUrl);

            // Throw an error
            return throwError(error);
        }),
    );
};

/**
 * Can deactivate file manager details
 *
 * @param component
 * @param currentRoute
 * @param currentState
 * @param nextState
 */
const canDeactivateFileManagerDetails = (
    component: FileManagerDetailsComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot) =>
{
    // Get the next route
    let nextRoute: ActivatedRouteSnapshot = nextState.root;
    while ( nextRoute.firstChild )
    {
        nextRoute = nextRoute.firstChild;
    }

    // If the next state doesn't contain '/file-manager'
    // it means we are navigating away from the
    // file manager app
    if ( !nextState.url.includes('/file-manager') )
    {
        // Let it navigate
        return true;
    }

    // If we are navigating to another item...
    if ( nextState.url.includes('/details') )
    {
        // Just navigate
        return true;
    }

    // Otherwise, close the drawer first, and then navigate
    return component.closeDrawer().then(() => true);
};

export default [
    {
        path     : '',
        component: FileManagerComponent,
        children : [
            {
                path     : 'formulir/:formulirId/:noRawat/:noRkmMedis',
                component: FormsWizardsComponent,
                resolve : {
                    formData : formResolver
                },
            },
            {
                path: 'formulir/:formulirId/:noRawat/:noRkmMedis/formulir',
                component: GeneralConcentComponent,
                resolve : {
                    formData : formResolverDataPasien,
                }
            },
            {
                path         : 'details/:id',
                component    : FileManagerDetailsComponent,
                resolve      : {
                    item: itemResolver,
                    patient: () => {
                        return inject(PatientService).onGet();
                    }
                },
                canDeactivate: [canDeactivateFileManagerDetails],
            },
        ],
    },
] as Routes;
