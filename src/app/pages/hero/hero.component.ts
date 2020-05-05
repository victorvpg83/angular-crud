import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { HeroModel } from '../../models/hero.model';
import { HeroesService } from 'src/app/services/heroes.service';

import { Observable } from 'rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  user = new HeroModel()

  constructor( private usersService: HeroesService,
               private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')

    if ( id !== 'new' ) {
      this.usersService.getUser( id )
        .subscribe( (response: HeroModel) => {
          this.user = response
          this.user.id = id
        })
    }

  }

  save( form: NgForm ) {

    if ( form.invalid ) {
      console.log('Formulario no válido')
      return
    }

    Swal.fire({
      title: 'Espere por favor',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    })
    Swal.showLoading()

    let petition: Observable<any>

    if ( this.user.id ) {
      petition = this.usersService.updateUser( this.user )


    } else {

     petition = this.usersService.createUser( this.user )

    }

    petition.subscribe( response => {
      Swal.fire({
        title: this.user.name,
        text: 'Se actualizó correctamente',
        icon: 'success'
      })
    } )

  }

}
