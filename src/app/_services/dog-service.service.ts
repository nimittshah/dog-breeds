import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DogServiceService {

  constructor(private http: HttpClient) { }

  /** fetchDogs : this function fetches the list of Dogs and send the list. */
  fetchDogs(): Observable<any> {
    return this.http.get("https://dog.ceo/api/breeds/list/all", { responseType: 'json' }).pipe(map((_dogs: any) => { return _dogs.message }));
  }
  /** fetchDogImage : this function fetches image of selected Breed and Sub-Breed. */
  fetchDogImage(_breed: string, _subBreed: string): Observable<any> {
    return this.http.get("https://dog.ceo/api/breed/" + _breed + "/" + _subBreed + "/images/random", { responseType: 'json' }).pipe(map((_dogImage: any) => { return _dogImage.message }));
  }
}
