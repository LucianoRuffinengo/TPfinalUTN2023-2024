import { ItemCarrito } from "./itemCarrito";

export interface Ventas{
    pedidos:ItemCarrito[]
    fecha: Date
    total: number
}