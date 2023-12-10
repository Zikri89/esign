import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { FormBuilderComponent } from './build-form.component';
import { AddFieldComponent } from './addfields/add-field.component';

const canDeactivateAddField = (
    component: AddFieldComponent,
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

    // If the next state doesn't contain '/form-builder'
    // it means we are navigating away from the
    // form builder master
    if ( !nextState.url.includes('/form-builder') )
    {
        // Let it navigate
        return true;
    }

    // If we are navigating to another field...
    if ( nextState.url.includes('/add-field') )
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
        component: FormBuilderComponent,
    },
    {
        path     : '',
        component: FormBuilderComponent,
        children : [
            {
                path         : 'add-field',
                component    : AddFieldComponent,
                canDeactivate: [canDeactivateAddField],
            },
        ],
    },
] as Routes;
