import { Component, OnInit } from '@angular/core';
import { MedicinaService } from 'src/app/services/medicina.service';
import { Medicina } from 'src/app/models/medicina';
import { MedicinaEdicion } from 'src/app/models/medicinaEdicion';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-medicinas',
  templateUrl: './listar-medicinas.component.html',
  styleUrls: ['./listar-medicinas.component.css']
})

export class ListarMedicinasComponent implements OnInit {
  medicinas: Medicina[] = []; 
  medicinaSeleccionada: Medicina | null = null;
  nuevasExistencias: number = 0;
  cantidadOriginal: number = 0;
  medicinasFiltradas: Medicina[] = [];
  busqueda: string = '';
  selectedCategoria: string = '';

  constructor(private medicinaService: MedicinaService) { }

  ngOnInit(): void {
    this.getMedicinas();
  }

  elimMedicina(): void {
    Swal.fire({
      position: 'center', icon: 'success', title: 'Se ha Eliminado Correctamente', showConfirmButton: false, timer: 3000
    })
  }

  errMedicina(): void {
    Swal.fire({
      position: 'center', icon: 'error', title: 'No puede ser menor o igual a 0', showConfirmButton: false, timer: 3000
    })
  }

  getMedicinas() {
    this.medicinaService.getMedicinas().subscribe(
      (data: Medicina[]) => {
        this.medicinas = data;
        this.medicinasFiltradas = [...this.medicinas]; // Copia las medicinas a medicinasFiltradas
      },
      (error) => {
        console.error('Error al obtener medicinas: ', error);
      }
    );
  }  

  eliminarMedicina(id: any){
    this.medicinaService.eliminarMedicina(id).subscribe(
      (data: any) => {
        this.elimMedicina();
        this.getMedicinas();
      },
      (error) => {
        console.error('Error al borrar medicina', error);
      }
    );
  }

  obtenerMedicinaPorId(id: string): void {
    this.medicinaService.obtenerMedicina(id).subscribe(
      (data: Medicina) => {
        this.medicinaSeleccionada = data;
        this.cantidadOriginal = data.cantidad; // Guardar la cantidad original
      },
      (error) => {
        console.error('Error al obtener la medicina por ID: ', error);
      }
    );
  }

  guardarCambios() {
    if (this.medicinaSeleccionada) {
      const nuevasExistencias = this.nuevasExistencias;
      const cantidadNueva = this.cantidadOriginal + nuevasExistencias;
  
      if (nuevasExistencias <= 0) {
        console.log('Las nuevas existencias deben ser mayores que 0.');
        this.errMedicina();
        return; // No continúes si las nuevas existencias son inválidas
      }
  
      // Actualizar la cantidad en el objeto medicinaSeleccionada
      this.medicinaSeleccionada.cantidad = cantidadNueva;
  
      this.medicinaService.editarMedicina(this.medicinaSeleccionada._id, cantidadNueva).subscribe(
        (data) => {
          console.log('Cambios guardados con éxito');
          window.location.reload(); // Recarga la página
        },
        (error) => {
          console.error('Error al editar medicina: ', error);
        }
      );
    }
  }
  
  filtrarMedicinas() {
    // Comprueba que se haya seleccionado una categoría
    if (this.selectedCategoria) {
      // Llama al servicio para filtrar las medicinas con la categoría seleccionada
      this.medicinaService.filtrarMedicinas(this.selectedCategoria).subscribe(
        (data: Medicina[]) => {
          this.medicinas = data;
          // Puedes hacer más operaciones o procesamiento aquí si es necesario
        },
        (error) => {
          console.error('Error al filtrar medicinas: ', error);
        }
      );
    }
  }

  filtrarMedicinas2(): void {
    if (this.selectedCategoria) {
      // Filtra las medicinas en función de la categoría seleccionada
      this.medicinasFiltradas = this.medicinas.filter(medicina => medicina.categoria === this.selectedCategoria);
    } else {
      // Si no se selecciona una categoría, muestra todas las medicinas
      this.medicinasFiltradas = [...this.medicinas];
    }
  }
  
  

}
