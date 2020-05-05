import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroModel } from '../../models/hero.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  users: HeroModel[] = []
  loading = false

  constructor( private heroesService: HeroesService ) { }

  ngOnInit(): void {

    this.loading = true
    this.heroesService.getUsers()
      .subscribe( response => {
        this.users = response
        this.loading = false
      })
  }

  deleteUser( user: HeroModel, i: number ) {

  Swal.fire({
    title: 'Eliminar',
    text: `¿Eliminar a ${ user.name }?`,
    icon: 'question',
    showConfirmButton: true,
    showCancelButton: true
  }).then( response => {

    if ( response.value ) {

      this.users.splice( i, 1 )
      this.heroesService.deleteUser( user.id ).subscribe()

    }
  })

  }

}
