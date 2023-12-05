import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, Routes } from '@angular/router';
import { FormManagerComponent } from './form-manager.component';
import { FormManagerService } from './form-manager.service';
import { FormManagerDetailsComponent } from './details/details.component';
import { FormManagerDetailEditComponent } from './details-edit/detail-edit.component';

const canDeactivateFormManagerDetails = (
    component: FormManagerDetailsComponent,
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

    // If the next state doesn't contain '/form-manager'
    // it means we are navigating away from the
    // form manager master
    if ( !nextState.url.includes('/form-manager') )
    {
        // Let it navigate
        return true;
    }

    // If we are navigating to another item...
    if ( nextState.url.includes('/create-form') )
    {
        // Just navigate
        return true;
    }

    // If we are navigating to another item...
    if ( nextState.url.includes('/edit-form') )
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
        component: FormManagerComponent,
        resolve  : {
            data: () => inject(FormManagerService).onGet(),
        },
    },
    {
        path     : '',
        component: FormManagerComponent,
        children : [
            {
                path         : 'create-form',
                component    : FormManagerDetailsComponent,
                canDeactivate: [canDeactivateFormManagerDetails],
            },
        ],
    },
    {
        path     : '',
        component: FormManagerComponent,
        children : [
            {
                path         : 'confirm',
                component    : FormManagerComponent,
            },
        ],
    },
    {
        path     : '',
        component: FormManagerComponent,
        children : [
            {
                path         : 'edit-form/:id',
                component: FormManagerDetailEditComponent,
                resolve  : {
                    data: (route: ActivatedRouteSnapshot) => {
                        const formId = route.paramMap.get('id');
                        return inject(FormManagerService).onGetById(formId);
                    }
                },
                canDeactivate: [canDeactivateFormManagerDetails],
            },
        ],
    }
] as Routes;
