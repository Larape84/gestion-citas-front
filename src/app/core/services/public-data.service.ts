import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettingsService } from '../app-config/app-settings.service';

@Injectable({
  providedIn: 'root'
})
export class PublicDataService {

  constructor(
    private _httpClient: HttpClient,
    private _appSettings: AppSettingsService


) { }






}
