import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroModel } from '../models/hero.model';
import { map, delay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://crud-app-a3cc0.firebaseio.com'

  constructor( private http: HttpClient ) { }

  createUser( user: HeroModel ) {
    return this.http.post(`${ this.url }/users.json`, user)
      .pipe(
        map( ( response: any ) => {
          user.id = response.name
          return user
        } )
      )
  }
  updateUser( user: HeroModel ) {

    const userTemp = {
      ...user
    }
    delete userTemp.id
    return this.http.put( `${ this.url }/users/${ user.id }.json`, userTemp )
  }

  deleteUser( id: string ) {
    return this.http.delete(`${ this.url }/users/${ id }.json`)
  }

  getUser( id: string ) {
    return this.http.get(`${ this.url }/users/${ id }.json`)
  }

  getUsers() {
    return this.http.get(`${ this.url }/users.json`)
      .pipe(
        map( response => this.createArray( response ) ),
        delay( 0 )
      )
  }

  private createArray( usersObj: object ) {

    const users: HeroModel[] = []

    if ( usersObj === null ) { return [] }

    Object.keys( usersObj ).forEach( key => {
      const user: HeroModel = usersObj[ key ]
      user.id = key
      users.push( user )
    });


    return users
  }
}
