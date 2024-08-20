export interface ItemCarrito{
    id: number,
    titulo: string,
    edicion: string,
    image_url: string,
    cantidad: number,
    precio: number,
    subtotal?: number
}