import SimpleProperty from './SimpleProperty'

export default class PrendaModel extends SimpleProperty {
    id = 0;
    nombre = '';
    precio = 0;
    talla = '';
    color = '';
    detalles = '';
    marca = '';
    sexo = 0;
    categoría = '';
    material = '';
    fotos = [];
    fechaPublicacion = '';
    idConsulta = null;
    idMedida = null;
    idVendedor = null;
    Comprado = 0;
    descripcion = '';
}