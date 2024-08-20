import { Tarjeta } from "./tarjeta";
import { Ventas } from "./ventas";

export interface Usuario{
    id:number,
    nombre:string,
    apellido:string,
    mail:string,
    contra:string,
    documento:string,
    tarjetaCredito:Tarjeta,
    favoritos:number[],
    historial:Ventas[]
}    
