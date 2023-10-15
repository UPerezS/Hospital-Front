import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MedicinaService } from 'src/app/services/medicina.service';
import { Medicina } from 'src/app/models/medicina'; 
import { ActivatedRoute, Router } from '@angular/router';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-reg-act-medicina',
  templateUrl: './reg-act-medicina.component.html',
  styleUrls: ['./reg-act-medicina.component.css']
})
export class RegActMedicinaComponent implements OnInit {
  medicinaSeleccionada: Medicina | null = null;
  nuevasExistencias: number = 0;
  titulo = 'Registrar Medicina';
  id: string | null;
  
  medicinaForm = this.fb.group({
    nombreMedicina: ['', Validators.required],
    categoria: ['Analgesicos', Validators.required],
    cantidad: [0, Validators.required],
    viaAdministracion: ['oral', Validators.required]
  });

  constructor( private fb: FormBuilder, private router: Router, private medicinaService: MedicinaService,
               private aRouter: ActivatedRoute ) { }
  get nombreMedicina() { return this.medicinaForm.get('nombreMedicina'); }
  get categoria() { return this.medicinaForm.get('categoria'); }
  get cantidad() { return this.medicinaForm.get('cantidad'); }
  get viaAdministracion() { return this.medicinaForm.get('viaAdministracion'); }  

  ngOnInit(): void {
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  rMCorrect(): void {
    Swal.fire({
      position: 'center', icon: 'success', title: 'Se ha Registrado Correctamente', showConfirmButton: false, timer: 3000
    })
  }

  rMIncorrect(): void {
    Swal.fire({
      position: 'center', icon: 'error', title: 'Faltan Datos por Llenar', showConfirmButton: false, timer: 3000
    })
  }

  limpiarFormulario(){
    this.medicinaForm.reset(); 
  }

  registrarMedicina() {
    if (this.medicinaForm.valid) {
      const cantidad = this.cantidad.value; // Obtén el valor de cantidad
  
      if (cantidad === 0) {
        // La cantidad es igual a 0, muestra un mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La cantidad no puede ser 0',
        });
      } else {
        // La cantidad es válida, procede con el registro
        const fechaActual = new Date();
  
        const datosMedicina: Medicina = {
          nombreMedicina: this.nombreMedicina.value,
          categoria: this.categoria.value,
          cantidad: this.cantidad.value,
          viaAdministracion: this.viaAdministracion.value,
          fechaEntrega: fechaActual,
          medicamentoDisponible: true,
        };

        //if(this.id !== null){}
  
        this.medicinaService.guardarMedicina(datosMedicina).subscribe(
          (data) => {
            this.limpiarFormulario();
            this.rMCorrect();
          },
          (error) => {
            console.error('Error al obtener medicinas: ', error);
          }
        );
      }
    } else {
      this.rMIncorrect();
    }
  }
  /*
  guardarNuevasExistencias() {
    if (this.medicinaSeleccionada && this.nuevasExistencias > 0) {
      // Suma las nuevas existencias a las existencias actuales
      const nuevasExistenciasTotal = this.medicinaSeleccionada.cantidad + this.nuevasExistencias;
      
      // Actualiza la propiedad de la medicina seleccionada
      this.medicinaSeleccionada.cantidad = nuevasExistenciasTotal;
  
      // Llama al servicio para guardar la medicina actualizada
      this.medicinaService.editarMedicina(this.medicinaSeleccionada._id.toString(), this.medicinaSeleccionada).subscribe(
        (data) => {
  
          // Restablece el valor de nuevasExistencias
          this.nuevasExistencias = 0;
  
          // Muestra un mensaje de éxito
          this.rMCorrect();
        },
        (error) => {
          console.error('Error al guardar medicina: ', error);
        }
      );
    } else {
      // Muestra un mensaje de error si las nuevas existencias son menores o iguales a 0
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las nuevas existencias deben ser mayores que 0',
      });
    }
  }*/

}
