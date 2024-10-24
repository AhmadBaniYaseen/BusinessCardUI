import { Routes } from '@angular/router';
import { BusinessCardComponent } from './business-card.component';
import { CreateBusinssCardComponent } from './create-businss-card/create-businss-card.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'GetAllCards',
        pathMatch: 'full'
    },
    {
        path: 'Create',
        component: CreateBusinssCardComponent
    },
    {
        path: 'GetAllCards',
        component: BusinessCardComponent
    } 
];

