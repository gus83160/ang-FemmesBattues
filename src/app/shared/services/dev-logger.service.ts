import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DevLoggerService {
  /**
   * Log a message only if in developer mode
   * @param message Message to log
   * @param data Optional additional data to log
   */
  log(message: string, ...data: any[]): void {
    if (environment.developerMode) {
      console.log(`[DEV] ${message}`, ...data);
    }
  }

  /**
   * Log an error only if in developer mode
   * @param message Error message to log
   * @param error Optional error object
   */
  error(message: string, error?: any): void {
    if (environment.developerMode) {
      console.error(`[DEV ERROR] ${message}`, error);
    }
  }

  /**
   * Log a warning only if in developer mode
   * @param message Warning message to log
   * @param data Optional additional data to log
   */
  warn(message: string, ...data: any[]): void {
    if (environment.developerMode) {
      console.warn(`[DEV WARN] ${message}`, ...data);
    }
  }
}
