import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FormsModule} from '@angular/forms';
import { DropdownDirective } from './shared/dropdown.directive';
import { OrganiserComponent } from './AppPages/app-event/organiser/organiser.component';
import { OrganiserListComponent } from './AppPages/app-event/organiser/organiser-list/organiser-list.component';
import { OrganiserDetailComponent } from './AppPages/app-event/organiser/organiser-detail/organiser-detail.component';
import { OrganiserInfoComponent } from './AppPages/app-event/organiser/organiser-list/organiser-info/organiser-info.component';
import { BarRatingModule } from "ngx-bar-rating";
import { RatingModule } from 'ng-starrating';
import { Routes, RouterModule } from '@angular/router';
import { AppHomeComponent } from './AppPages/app-home/app-home.component';
import { AppAboutComponent } from './AppPages/app-about/app-about.component';
import { AppGalleryComponent } from './AppPages/app-gallery/app-gallery.component';
import { AppQueryComponent } from './AppPages/app-query/app-query.component';
import { AppEventComponent } from './AppPages/app-event/app-event.component';
import { OrganiserPipe } from './AppPages/app-event/organiser/organiser-list/organiser.pipe';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { UsereditComponent } from './shared/useredit/useredit.component';
import { OrganiserEditComponent } from './Admin/organiser-edit/organiser-edit.component';
import { OrganiserService } from './AppPages/app-event/organiser/organiser.service';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { AuthGuard } from './auth/auth.guard';
import { AppQueriesComponent } from './AppPages/app-queries/app-queries.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule,MatCardModule, MatButtonModule, MatExpansionModule } from '@angular/material';
import { AppMailComponent } from './AppPages/app-queries/app-mail/app-mail.component'
import { OrganisersResolverService } from './AppPages/app-event/organiser/organisers-resolver.service';
//import { ContactAlertComponent } from './AppPages/app-event/organiser/contact-alert/contact-alert.component'
// import { RegisterComponent} from './welcomepages/register/register.component'
// import { LoginComponent } from './welcomepages/login/login.component';
// import { AlertComponent } from './welcomepages/_directives/alert.component';



const appRoutes:Routes = [
   
  {path: '', redirectTo:'/login',pathMatch: 'full'},
 // { path: 'login', component: LoginComponent },
   {path: 'home', component: AppHomeComponent,canActivate:[AuthGuard]},
   {path: 'about', component: AppAboutComponent,canActivate:[AuthGuard]},
  //  {path: 'event', component: AppEventComponent},
   {path: 'event/organiser/:event',component: OrganiserComponent, 
      children:[
                 {path:':id',component:OrganiserDetailComponent}
               ],
      canActivate:[AuthGuard]
   },
   {path: 'gallery', component: AppGalleryComponent,canActivate:[AuthGuard]},
   {path: 'query', component: AppQueryComponent,canActivate:[AuthGuard]},
   {path: 'organiseredit',component:OrganiserEditComponent,canActivate:[AuthGuard]},
   {path: 'useredit',component:UsereditComponent,canActivate:[AuthGuard]},
   {path: 'edit/:id',component:OrganiserEditComponent,canActivate:[AuthGuard]},
   {path: 'queries',component:AppQueriesComponent,canActivate:[AuthGuard]},
   {path: 'login',component:LoginComponent},
   {path: 'signup',component:SignupComponent},
  
];
@NgModule({
  declarations: [
    AppComponent,
    // RegisterComponent,
    HeaderComponent,
    DropdownDirective,
    OrganiserComponent,
    OrganiserListComponent,
    OrganiserDetailComponent,
    OrganiserInfoComponent,
    AppHomeComponent,
    AppAboutComponent,
    AppGalleryComponent,
    AppQueryComponent,
    AppEventComponent,
    OrganiserPipe,
    FooterComponent,
    UsereditComponent,
    OrganiserEditComponent,
    LoginComponent,
    SignupComponent,
    AppQueriesComponent,
    AppMailComponent
    
    // LoginComponent,
    // AlertComponent

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BarRatingModule,
    RatingModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule
  ],
  providers: [OrganiserService,
              AuthGuard,
            {provide:HTTP_INTERCEPTORS,useClass: AuthInterceptor,multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
