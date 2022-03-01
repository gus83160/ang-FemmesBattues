// // import {OnChanges, Input} from '@angular/core';
// // import { Component, Input } from '@angular/core';
//
//
// // export class MonthlySummaryModel implements OnChanges{
//
// import {Driver} from './driver';
//
// export class MonthlySummaryModelDto {
//     // public id: String;
//     public driver: Driver;
//     public yearMonth: String;
//     public enteredMonthlyCpamAmount: number;
//     public enteredMonthlyCpamAmountRemitted: number;
//     public enteredDaysWorked: number;
//     public enteredTakeChargeOf: number;
//     public enteredEmptiesKilometers: number;
//     public enteredInChargeKilometers: number;
//
// }
//
//
// export class MonthlySummaryModel {
//
//     private _id: String;
//     private _currentDaysWorked: number;
//     private _newDaysWorked: number;
//     private _currentTakeChargeOf: number;
//     private _newTakeChargeOf: number;
//     private _newEmptiesKilometers: number;
//     private _newInChargeKilometers: number;
//     private _currentMonthlyCPAMAmount: number;
//     private _currentMonthlyCPAMAmountRemitted: number;
//     private _currentEmptiesKilometers: number;
//     private _currentInChargeKilometers: number;
//     private _dataChange: boolean;
//     private _initMonthlySummaryDto: any;
//     private _isDaysWorkedEntered: boolean;
//     private _isEmptiesKilometersEntered: boolean;
//     private _isInChargeKilometersEntered: boolean;
//     private _isTakeChargeOfEntered: boolean;
//
//     constructor(monthlySummaryDto?: any) {
//         this.loadFromMonthlySummaryDto(monthlySummaryDto);
//     }
//
//     loadFromMonthlySummaryDto(monthlySummaryDto?: any) {
//         this._initMonthlySummaryDto = monthlySummaryDto;
//         if (this._initMonthlySummaryDto != null) {
//             this._id = this._initMonthlySummaryDto.id;
//             this._currentDaysWorked         = this._initMonthlySummaryDto.daysWorked;
//             this._currentTakeChargeOf       = this._initMonthlySummaryDto.takeChargeOf;
//             this._currentMonthlyCPAMAmount  = this._initMonthlySummaryDto.monthlyCpamAmount;
//             this._currentMonthlyCPAMAmountRemitted  = this._initMonthlySummaryDto.monthlyCpamAmountRemitted;
//             this._currentEmptiesKilometers = this._initMonthlySummaryDto.totalMonthKmsEmpty;
//             this._currentInChargeKilometers = this._initMonthlySummaryDto.totalMonthKmsInCharge;
//             this._isDaysWorkedEntered = this._initMonthlySummaryDto.daysWorkedEntered;
//             this._isEmptiesKilometersEntered = this._initMonthlySummaryDto.emptiesKilometersEntered;
//             this._isInChargeKilometersEntered = this._initMonthlySummaryDto.inChargeKilometersEntered;
//             this._isTakeChargeOfEntered = this._initMonthlySummaryDto.takeChargeOfEntered;
//         } else {
//             this._currentDaysWorked  = 0;
//         }
//
//         this._dataChange            = false;
//     }
//
//     currentDayWorkedChange(newValue) {
//         this._currentDaysWorked = newValue;
//         this._newDaysWorked = newValue;
//         this._isDaysWorkedEntered = true;
//     }
//
//     recalcDaysWorked(){
//         this._currentDaysWorked = this._initMonthlySummaryDto.calcDaysWorked;
//         this._newDaysWorked = 0;
//     }
//
//     get currentDaysWorked(): number {
//         return this._currentDaysWorked;
//     }
//
//     currentTakeChargeOfChange(newValue: number) {
//         this._currentTakeChargeOf = newValue;
//         this._newTakeChargeOf = newValue;
//         this._isTakeChargeOfEntered = true;
//     }
//
//     currentEmptiesKilometersChange(newValue: number) {
//         this._currentEmptiesKilometers = newValue;
//         this._newEmptiesKilometers = newValue;
//         this._isEmptiesKilometersEntered = true;
//     }
//
//     currentInChargeKilometersChange(newValue: number) {
//         this._currentInChargeKilometers = newValue;
//         this._newInChargeKilometers = newValue;
//         this._isInChargeKilometersEntered = true;
//     }
//
//     recalcTakeChargeOf(){
//         this._currentTakeChargeOf = this._initMonthlySummaryDto.calcTakeChargeOf;
//         this._newTakeChargeOf = 0;
//     }
//
//     recalcEmptiesKilometers(){
//         this._currentEmptiesKilometers = this._initMonthlySummaryDto.calcEmptiesKilometers;
//         this._newEmptiesKilometers = 0;
//     }
//
//     recalcInChargeKilometers(){
//         this._currentInChargeKilometers = this._initMonthlySummaryDto.calcInChargeKilometers;
//         this._newInChargeKilometers = 0;
//     }
//
//     get currentTakeChargeOf(): number {
//         return this._currentTakeChargeOf;
//     }
//
//     currentMonthlyCPAMAmountChange(newValue: number) {
//         this._currentMonthlyCPAMAmount = newValue;
//     }
//
//     get currentMonthlyCPAMAmount(): number {
//         return this._currentMonthlyCPAMAmount;
//     }
//
//     currentMonthlyCPAMAmountRemittedChange(newValue: number) {
//         this._currentMonthlyCPAMAmountRemitted = newValue;
//     }
//
//     get currentMonthlyCPAMAmountRemitted(): number {
//         return this._currentMonthlyCPAMAmountRemitted;
//     }
//
//     get dataChange(): boolean{
//         return  (this._currentDaysWorked != this._initMonthlySummaryDto.daysWorked) ||
//                 (this._currentTakeChargeOf != this._initMonthlySummaryDto.takeChargeOf) ||
//                 (this._currentMonthlyCPAMAmount != this._initMonthlySummaryDto.monthlyCpamAmount) ||
//                 (this._currentMonthlyCPAMAmountRemitted != this._initMonthlySummaryDto.monthlyCpamAmountRemitted);
//     }
//
//     get id(): String {
//         return this._id;
//     }
//
//     set id(value: String) {
//         this._id = value;
//     }
//
//     toDto(): MonthlySummaryModelDto {
//         let monthlySummaryDto: MonthlySummaryModelDto;
//
//         monthlySummaryDto = new MonthlySummaryModelDto();
//         monthlySummaryDto.yearMonth = this._initMonthlySummaryDto.yearMonth;
//         monthlySummaryDto.driver = this._initMonthlySummaryDto.driver;
//
//         if (this._currentMonthlyCPAMAmount != this._initMonthlySummaryDto.monthlyCPAMAmount) {
//             monthlySummaryDto.enteredMonthlyCpamAmount = this._currentMonthlyCPAMAmount;
//         }
//         if (this._currentMonthlyCPAMAmountRemitted != this._initMonthlySummaryDto.monthlyCPAMAmountRemitted) {
//             monthlySummaryDto.enteredMonthlyCpamAmountRemitted = this._currentMonthlyCPAMAmountRemitted;
//         }
//         if (this._isDaysWorkedEntered) {
//             monthlySummaryDto.enteredDaysWorked = this._currentDaysWorked;
//         }
//         if (this._isTakeChargeOfEntered) {
//             monthlySummaryDto.enteredTakeChargeOf = this._currentTakeChargeOf;
//         }
//         if (this._isEmptiesKilometersEntered) {
//             monthlySummaryDto.enteredEmptiesKilometers = this._currentEmptiesKilometers;
//         }
//         if (this._isInChargeKilometersEntered) {
//             monthlySummaryDto.enteredInChargeKilometers = this._currentInChargeKilometers;
//         }
//
//         return(monthlySummaryDto);
//     }
//
//     get currentEmptiesKilometers(): number {
//         return this._currentEmptiesKilometers;
//     }
//
//     get currentInChargeKilometers(): number {
//         return this._currentInChargeKilometers;
//     }
//
//     get isDaysWorkedEntered(): boolean {
//         return this._isDaysWorkedEntered;
//     }
//
//     get isEmptiesKilometersEntered(): boolean {
//         return this._isEmptiesKilometersEntered;
//     }
//
//     get isInChargeKilometersEntered(): boolean {
//         return this._isInChargeKilometersEntered;
//     }
//
//     get isTakeChargeOfEntered(): boolean {
//         return this._isTakeChargeOfEntered;
//     }
// }
