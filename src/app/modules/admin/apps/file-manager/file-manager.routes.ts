import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, Routes } from '@angular/router';
import { FileManagerDetailsComponent } from 'app/modules/admin/apps/file-manager/details/details.component';
import { FileManagerComponent } from 'app/modules/admin/apps/file-manager/file-manager.component';
import { FileManagerService } from 'app/modules/admin/apps/file-manager/file-manager.service';
import { FileManagerListComponent } from 'app/modules/admin/apps/file-manager/list/list.component';
import { catchError, throwError } from 'rxjs';
import { FormsWizardsComponent } from './wizards/wizards.component';
import { PatientService } from '../../master/pasien/patients.service';
import { FormManagerService } from '../../master/form-manager/form-manager.service';
import { HttpUrlEncodingCodec } from '@angular/common/http';
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
    const router = inject(Router);
    const codec = new HttpUrlEncodingCodec();

    const formulirId = route.paramMap.get('formulirId');
    const noRawat = codec.encodeValue(route.paramMap.get('noRawat'));

    return fileManagerService.onGetById(formulirId).pipe(
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
                path     : 'formulir/:formulirId/:noRawat',
                component: FormsWizardsComponent,
                resolve : {
                    formData : formResolver
                },
                pathMatch: 'full'
            },
            {
                path     : '',
                component: FileManagerListComponent,
                resolve  : {
                    items: () => {
                        return inject(FileManagerService).getItems();
                    }
                },
                children : [
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
            }
        ],
    },
] as Routes;
