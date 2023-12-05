import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, Routes } from '@angular/router';
import { FormManagerComponent } from './form-manager.component';
import { FormManagerService } from './form-manager.service';
import { FormManagerDetailsComponent } from './details/details.component';

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

    // If the next state doesn't contain '/file-manager'
    // it means we are navigating away from the
    // file manager app
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
                path         : 'delete-form',
                component    : FormManagerComponent,
            },
        ],
    }
] as Routes;
