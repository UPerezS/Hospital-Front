export class Medicina {
    _id?: string;
    nombreMedicina: string;
    categoria: string;
    viaAdministracion: string;
    cantidad: number;
    fechaEntrega: Date;
    medicamentoDisponible: boolean;

    constructor(nombreMedicina:string, categoria: string, viaAdministracion: string, cantidad: number){
        this.nombreMedicina = nombreMedicina;
        this.categoria = categoria;
        this.viaAdministracion = viaAdministracion;
        this.cantidad = cantidad;
        this.fechaEntrega = new Date();
        this.medicamentoDisponible = true;
    }
}