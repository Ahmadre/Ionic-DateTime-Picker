import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DatepickerPage } from './datepicker';
import { NgCalendarModule } from 'ionic2-calendar';
import { IonicErrorHandler } from 'ionic-angular';

@NgModule({
  declarations: [
    DatepickerPage,
  ],
  imports: [
    NgCalendarModule,
    IonicPageModule.forChild(DatepickerPage),
  ],
  providers: [
    { provide: LOCALE_ID, 
      useValue: 'en-EN' },
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class DatepickerPageModule {}
