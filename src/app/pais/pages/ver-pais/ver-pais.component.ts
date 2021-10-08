import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {switchMap,tap} from 'rxjs/operators';

import { Country } from '../../interfaces/pais.interface';
import { Name } from '../../interfaces/pais.interface';

import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {
  pais !: Country
  paisname!: Name;

  constructor(private activatedRoute: ActivatedRoute,
              private paisService : PaisService          
    ) { }

  ngOnInit(): void {

    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.paisService.getPaisPorCode(id)),
      tap(console.log))

    .subscribe( pais => {
      this.paisname = pais[0].name,
      this.pais = pais[0]
    })

    // #####################THIS IS ANOTHER OPTION TO GET THE ID WITHOUTH RJSX#########
  //   this.activatedRoute.params
  //   .subscribe( ({id}) => {
  //       console.log(id);

  //       this.paisService.getPaisPorCode(id)
  //       .subscribe(pais => {
  //         console.log(pais);
  //       })
  //     }
  //   )
  }
}
