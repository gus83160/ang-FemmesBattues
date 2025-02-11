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
    COURSE_SAISIE = 'saisie',

  UTILISATEUR = 'utilisateur',
    UTILISATEUR_LIST = 'liste',
    UTILISATEUR_EDIT = 'edit',
    UTILISATEUR_LIST_V0 = 'listev0',


  ADMIN = 'admin',
  PRISE_EN_CHARGE = 'priseencharge',
}
