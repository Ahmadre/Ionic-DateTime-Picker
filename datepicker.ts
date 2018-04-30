import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Slides, Platform } from 'ionic-angular';
import { NgCalendarModule } from 'ionic2-calendar';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-datepicker',
  templateUrl: 'datepicker.html',
})
export class DatepickerPage {
  @ViewChild('yearSlides') slides: Slides;

  eventSource = [];
  selectedDay = new Date();
  calendar = {
    mode: 'month',
    currentDate: this.selectedDay,
    dateFormatter: {
      formatMonthViewDayHeader: function(date:Date) {
          return date.toString().substring(0,1);
      }
    }
  }

  ActualYear = moment(new Date().getTime()).format("YYYY");
  ActualMonth = moment(new Date().getTime()).format("MMMM YYYY");
  ActualDate = moment(new Date().getTime()).format("ddd, MMM DD");

  initialYear = null;
  yearMode: boolean = false;
  years = []

  isMobile: boolean;
  isIOS: boolean;
  Datetimepicker: boolean = false;
  choosenTime;
  choosenDateTime;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private platform: Platform) {
    if (platform.is('mobile')) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
    if (platform.is('ios')) {
      this.isIOS = true;
    } else {
      this.isIOS = false;
    }
    if (navParams.get('selectedDay')) {
      this.calendar.currentDate = new Date(navParams.get('selectedDay'));
      this.ActualYear = moment(new Date(navParams.get('selectedDay')).getTime()).format("YYYY");
    }
    if (navParams.get('withTime')) {
      this.Datetimepicker = navParams.get('withTime');
    }
    let min = null;
    let max = null;
    if (navParams.get('minYear')) {
      min = navParams.get('minYear');
    }
    if (navParams.get('maxYear')) {
      max = navParams.get('maxYear');
    }
    if (min != null && max != null) {
      for (var i = 0; i < max - min; i++) {
        this.years.push(max - i);
      }
    } else {
      for (var j = 0; j < 100; j++) {
        this.years.push(new Date().getFullYear() - j);
      }
    }
  }

  last() {
    let month = new Date(this.selectedDay);
    let diff = new Date(month.setMonth(this.selectedDay.getMonth() - 1));
    if (this.calendar.mode == 'month') {
      this.calendar.currentDate = new Date(diff.setDate(this.selectedDay.getDate() - this.selectedDay.getDate() + 1));
      this.selectedDay = this.calendar.currentDate;
    }
  }

  next() {
    let month = new Date(this.selectedDay);
    let diff = new Date(month.setMonth(this.selectedDay.getMonth() + 1));
    if (this.calendar.mode == 'month') {
      this.calendar.currentDate = new Date(diff.setDate(this.selectedDay.getDate() - this.selectedDay.getDate() + 1));
      this.selectedDay = this.calendar.currentDate;
    }
  }

  setYear(){
    if (this.yearMode) {
      this.yearMode = false;
    } else {
      this.yearMode = true;
      for (var i in this.years) {
        if (this.years[i].toString() == this.ActualYear.toString()) {
          this.initialYear = i;
          break;
        }
      }
    }
  }

  selectYear(event){
    if (event) {
      let text;
      for (var i in this.years) {
        if (this.slides.getActiveIndex() != undefined) {
          if (i == this.slides.getActiveIndex().toString()) {
            text = this.years[i].toString();
            break;
          }
        } else {
          return;
        }
      }
      const year : any = text;
      const date = new Date().setFullYear(year, this.selectedDay.getMonth(), this.selectedDay.getDate());
      this.calendar.currentDate = new Date(date);
      this.ActualDate = moment(new Date(date).getTime()).format("ddd, MMM DD");
      this.ActualYear = moment(new Date(text).getTime()).format("YYYY");
    } else {
      if (this.slides.clickedSlide != undefined) {
        this.slides.slideTo(this.slides.clickedIndex);
        const year : any = this.slides.clickedSlide.innerText;
        const date = new Date().setFullYear(year, this.selectedDay.getMonth(), this.selectedDay.getDate());
        this.calendar.currentDate = new Date(date);
        this.ActualDate = moment(new Date(date).getTime()).format("ddd, MMM DD");
        this.ActualYear = moment(new Date(this.slides.clickedSlide.innerText).getTime()).format("YYYY");
      } 
    }
  }

  confirmPicker(){
    if (!this.Datetimepicker) {
      const output = moment(new Date(this.selectedDay).getTime()).format("YYYY-MM-DD");
      this.viewCtrl.dismiss(output);
    } else {
      if (!this.choosenTime) {
        this.choosenTime = '00:00';
      }
      const date = moment(new Date(this.selectedDay).getTime()).format("YYYY-MM-DD");
      this.choosenDateTime = moment(new Date(date + 'T' + this.choosenTime + ':00').getTime()).format();
      this.viewCtrl.dismiss(this.choosenDateTime);
    }
  }

  clearInput(){
    this.viewCtrl.dismiss('clear');
  }

  cancel(){
    this.viewCtrl.dismiss();
  }

  onCurrentDateChanged(event){

  }

  onEventSelected(event){

  }

  onViewTitleChanged(e){
    this.ActualMonth = e;
  }

  onTimeSelected(e){
    this.ActualYear = moment(e.selectedTime).format("YYYY");
    this.ActualDate = moment(e.selectedTime).format("ddd, MMM DD");
    this.selectedDay = e.selectedTime;
  }

  ngAfterViewChecked(){
    if (this.yearMode) {
      if (this.initialYear) {
        this.slides.initialSlide = this.initialYear;
      }
      this.slides.paginationHide = true;
      this.slides.enableKeyboardControl(true);
      this.slides.renderedHeight = 40;
      this.slides.freeMode = true;
      this.slides.centeredSlides = true;
      this.slides.direction = 'vertical';
      this.slides.swipeDirection = 'vertical';
    }
  }

}
