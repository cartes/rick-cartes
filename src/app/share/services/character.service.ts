import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Character } from '@share/interfaces/character.interface';
import { environment } from '@env/environment';
import { Observable, throwError } from 'rxjs';

import { TrackHttpError } from '@share/models/TrackHttpError';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(
    private http: HttpClient
  ) { }

  // Obtener listado de personajes
  listCharacters(query = '', page = 200):Observable<Character[] | TrackHttpError> {
    const peticion = `${environment.apiURL}character/?name=${query}&page=${page}`;
    return this.http.get<Character[]>(peticion).pipe(catchError((err) => this.handleHttpError(err)));
  }
  // obtener detalle del personaje
  getCharacterDetail(id: any) {
    const peticion = `${environment.apiURL}character/${id}`;
    return this.http.get<Character>(peticion).pipe(catchError((err) => this.handleHttpError(err)));
  }

  getNumberOfCharacters() {
    const peticion= `${environment.apiURL}character/`;
    return this.http.get<Character>(peticion).pipe(catchError((err) => this.handleHttpError(err)));

  }

  private handleHttpError( error: HttpErrorResponse): Observable<TrackHttpError> {
    let dataError = new TrackHttpError();
    dataError.errorNumber = error.status;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'Ha ocurrido un error';
    return throwError(dataError);
  }

}
