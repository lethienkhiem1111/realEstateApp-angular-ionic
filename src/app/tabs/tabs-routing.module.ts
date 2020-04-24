import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';


const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: 'real-estate-posts',
                children: [
                    {
                        path: '',
                        loadChildren: './real-estate-posts/real-estate-posts.module#RealEstatePostsPageModule'
                    },
                    {
                        path: 'new-post',
                        loadChildren: './real-estate-posts/new-post/new-post.module#NewPostPageModule'
                    },
                    {
                        path: 'edit/:rpostId',
                        loadChildren: './real-estate-posts/edit-post/edit-post.module#EditPostPageModule'
                    },
                    {
                        path: 'direction',
                        loadChildren: () => import('./real-estate-posts/direction/direction.module').then(m => m.DirectionPageModule)
                    },
                    {
                        path: ':catalog/:rpostId',
                        loadChildren: './real-estate-posts/detail-post/detail-post.module#DetailPostPageModule'
                    }

                ]
            },
            {
                path: 'notifications',
                children: [
                    {
                        path: '',
                        loadChildren: './notifications/notifications.module#NotificationsPageModule'
                    }
                ]
            },
            {
                path: 'properties',
                children: [
                    {
                        path: '',
                        loadChildren: './properties/properties.module#PropertiesPageModule'
                    },
                    {
                        path: 'new-houses',
                        loadChildren: './properties/houses/houses.module#CreateHousePageModule'
                    },
                    {
                        path: 'motelleases',
                        loadChildren: './properties/motel-leases/motel-leases.module#MotelLeasesPageModule'
                    },
                    {
                        path: 'edit-houses/:houseId',
                        loadChildren: './properties/houses/houses.module#EditHousePageModule'
                    },

                ]
            },
            {
                path: 'favorites',
                children: [
                    {
                        path: '',
                        loadChildren: './favorites/favorites.module#FavoritesPageModule'
                    }
                ]
            },
            {
                path: 'profile',
                children: [
                    {
                        path: '',
                        loadChildren: './profile/profile.module#ProfilePageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: 'real-estate-posts',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: 'real-estate-posts',
        pathMatch: 'full'
    },
    { path: 'edit-house', loadChildren: './properties/houses/edit-house/edit-house.module#EditHousePageModule' },
    { path: 'create-house', loadChildren: './properties/houses/create-house/create-house.module#CreateHousePageModule' },
    { path: 'detail-house', loadChildren: './properties/houses/detail-house/detail-house.module#DetailHousePageModule' }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsRoutingModudle { }