import {Injectable} from '@angular/core';


export enum RoutesEnum {
  ROOT = '',

  AUTH = 'auth',
    LOGIN = 'login',
    LOGOUT = 'logout',
    LOGINMDP = 'loginMDP',

  DEMANDE = 'demande',
    DEMANDE_LIST = 'liste',
    DEMANDE_NEW = 'creation',
    DEMANDE_EDIT = 'edition',

  COURSE = 'course',
    COURSE_INFORMATION = 'information',
    // COURSE_RECH = 'recherche',
    // COURSE_RECUP = 'recupcourse',
    COURSE_SAISIE = 'saisie',

  UTILISATEUR = 'utilisateur',
    UTILISATEUR_LIST = 'utilisateur',
    UTILISATEUR_EDIT = 'edit',


  ADMIN = 'admin',
//  MENU = 'menu',
  PRISE_EN_CHARGE = 'priseencharge',
  FACTURE = 'facture',
}

