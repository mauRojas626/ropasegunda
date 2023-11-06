import SimpleProperty from './SimpleProperty'

export default class EnvioModel extends SimpleProperty {
    idEnvio = 0;
    precioEnvio = 0;
    fechaEntrega = null;
    direccion = "";
    tipoEntrega = 0;
    ComprobanteCliente = null;
    telefono = 0;
}