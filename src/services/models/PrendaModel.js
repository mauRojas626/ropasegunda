import SimpleProperty from './SimpleProperty'

export default class PrendaModel extends SimpleProperty {
    id = 0;
    nombre = '';
    precio = 0;
    talla = '';
    color = '';
    detalle = 'Ninguno';
    marca = '';
    sexo = 0;
    categoría = 'Saco';
    material = '';
    fotos = [];
    fechaPublicacion = '';
    idConsulta = null;
    idMedida = null;
    idVendedor = null;
    Comprado = 0;
    descripcion = '';
}