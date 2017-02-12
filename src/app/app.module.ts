import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyButtonsComponent } from './app.component';
import { HomePageComponent } from '../pages/home/home';
import { TabsPageComponent } from '../pages/tabs/tabs';
import { ButtonsPageComponent } from './../pages/buttons/buttons';
import { ButtonService } from './../providers/buttons-service';
import { DevicesListComponent } from './../pages/devices-list/devices-list';
import { PostService } from './../providers/posts-service';

@NgModule({
  declarations: [
    MyButtonsComponent,
    HomePageComponent,
    TabsPageComponent,
    ButtonsPageComponent,
    DevicesListComponent
  ],
  imports: [
    IonicModule.forRoot(MyButtonsComponent)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyButtonsComponent,
    HomePageComponent,
    TabsPageComponent,
    ButtonsPageComponent,
    DevicesListComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, ButtonService, PostService]
})
export class AppModule {}
