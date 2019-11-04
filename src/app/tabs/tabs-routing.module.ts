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
                        path: ':rpostId',
                        loadChildren: './real-estate-posts/detail-post/detail-post.module#DetailPostPageModule'
                    },
                    {
                        path: 'direction',
                        loadChildren: './real-estate-posts/direction/direction.module#DirectionPageModule'
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
                        path: 'lands',
                        loadChildren: './properties/lands/lands.module#LandsPageModule'
                    },
                    {
                        path: 'houses',
                        loadChildren: './properties/houses/houses.module#HousesPageModule'
                    },
                    {
                        path: 'motelleases',
                        loadChildren: './properties/motel-leases/motel-leases.module#MotelLeasesPageModule'
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
  { path: 'direction', loadChildren: './real-restate-posts/direction/direction.module#DirectionPageModule' },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsRoutingModudle { }