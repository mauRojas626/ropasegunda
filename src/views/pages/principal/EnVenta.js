import { CButton, CTabPane, CInputFile, CCol, CRow, CNavItem, CNavLink, CTabContent, CTabs, CNav, CCard, CSelect, CCardHeader, CCollapse,
     CCardBody, CModalBody, CModalFooter, CModalHeader, CModalTitle, CModal, CCardImg, CFormGroup, CLabel, CInput, CTextarea } from '@coreui/react'
import React, { Component } from 'react'
import PrendasCardHorizontal from './PrendaCardHorizontal';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as clothesActions from '../../../services/redux/actions/prenda'
import * as sellActions from '../../../services/redux/actions/venta'
import * as buyerActions from '../../../services/redux/actions/comprador'


class EnVenta extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapse: 0,
            validarPago: false,
            cotizarEnvio: false,
            clothes: [],
            user: {},
            validar: [],
            porEnviar: [],
            filterPorEnviar: [],
            vp: [],
            file: false,
            provincia: [],
            departamento: [],
            idDepartamento: "-1",
            tipoEntrega: "3",
            venta: {},
            enviado: false,
            validarPago2: false,
            historial: [], 
            estado: "6",
            error: {},
            reportar: false,
            motivo: "",
            reportados: []
        }
    }
    async componentDidMount(){
        await this.props.getClothes()
        let clothes = this.props.clothes.filter(cloth => cloth.idVendedor.idUsuario === this.props.user.idUsuario)

        await this.props.getSell(this.props.user.idUsuario)
        const sell = this.props.sell    
        let filteredSell = sell.filter((item) => item.idVendedor.idUsuario === this.props.user.idUsuario)
        let validar = filteredSell.filter((item) => item.estado === 0)
        let porEnviar = filteredSell.filter((item) => item.estado >= 2 && item.estado <= 5)
        let historial = filteredSell.filter((item) => item.estado >= 6 && item.estado < 8)
        let reportados = filteredSell.filter((item) => item.estado === 8)
        reportados = reportados.map((item) => {
            if(item.idEnvio === null){
                return {...item, idEnvio: 0}
            }
            return item
        })
        historial.sort((a, b) => new Date(b.fechaCompra) - new Date(a.fechaCompra))
        porEnviar.sort((a, b) => new Date(b.fechaCompra) - new Date(a.fechaCompra))
        const uniqueEnvio2 = [...new Set(historial.map((sell) => sell.idEnvio.idEnvio))]
        let sellByShip2 = []
        uniqueEnvio2.forEach((shipping, index) => {
            sellByShip2[index] = historial.filter((sell) => sell.idEnvio.idEnvio === shipping)
        })

        const uniqueEnvio = [...new Set(porEnviar.map((sell) => sell.idEnvio.idEnvio))]
        let sellByShip = []
        uniqueEnvio.forEach((shipping, index) => {
            sellByShip[index] = porEnviar.filter((sell) => sell.idEnvio.idEnvio === shipping)
        })
        const uniqueDep = [...new Set(porEnviar.map((sell) => sell.idEnvio.idProvincia.departamento))]
        if(this.props.provincia.length === 0){
            await this.props.getCities()
        }
        this.setState({clothes: clothes, user: this.props.user, validar: validar, porEnviar: sellByShip, provincia: this.props.provincia,
             departamento: uniqueDep, filterPorEnviar: sellByShip, historial: sellByShip2, reportados: reportados})
    }

    onChangeFile = (e) => {
        this.setState({file: e.target.files[0]})
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    cotizar = async () => {
        if(document.getElementById("precio").value.length >= 1 && !isNaN(document.getElementById("precio").value)){
            let envio = this.state.venta.idEnvio
            envio.precioEnvio = parseFloat(document.getElementById("precio").value)
            let sell = this.state.venta
            sell.idEnvio = envio
            await this.props.priceShipping(sell)
            this.setState({cotizarEnvio: false})
            let filterPorEnviar = this.state.filterPorEnviar
            filterPorEnviar = filterPorEnviar.map((item) => item.map((sell) => sell.idVenta === this.state.venta.idVenta ? sell = {...sell, estado: 3} : sell))
            this.setState({filterPorEnviar: filterPorEnviar})
            this.setState({error: {}})
        }
        else {
            this.setState({error: {precio: "Ingrese un precio válido"}})
        }
        
    }

    validatePago = async () => {
        let data = new FormData()
        data.append('venta', JSON.stringify(this.state.vp))
        const newFileName = `${Date.now()}_${this.state.file.name}`
        data.append('files', this.state.file, newFileName)
        await this.props.validateSell(data)
        this.setState({validarPago: false})
        let validar = this.state.validar.filter(item => item.idVenta !== this.state.vp.idVenta)
        this.setState({validar: validar, file: false})
    }

    validatePago2 = async () => {
        await this.props.validateShip(this.state.venta)
        this.setState({validarPago2: false, filterPorEnviar: this.state.filterPorEnviar.map((item) => item.map((sell) => sell.idVenta === this.state.venta.idVenta ? sell = {...sell, estado: 5} : sell))})
    }

    reportar = async () => {
        if(this.state.motivo.length < 250 && this.state.motivo.length > 0 && this.state.file){
            const { motivo, vp, file } = this.state
            let venta = vp
            let queja = {}
            queja.comentario = motivo
            queja.tipo = venta.estado === 0 ? "Validación de pago" : "Validación de envío"
            queja.idUsuario = venta.idComprador.idUsuario
            venta.queja = queja
            let data = new FormData()
            data.append('venta', JSON.stringify(venta))
            const newFileName = `${Date.now()}_${file.name}`
            data.append('files', file, newFileName)
            await this.props.reportUser(data)
            this.setState({reportar: false, error: {}, file: false, motivo:"", validar: this.state.validar.filter(item => item.idVenta !== this.state.vp.idVenta)})
        } else {
            if(this.state.motivo.length === 0) this.setState({error: {motivo: "Ingrese un motivo"}})
            if(this.state.motivo.length >= 250)
            this.setState({error: {motivo: "Ingrese un motivo menor a 250 caracteres"}})
            if(!this.state.file) this.setState({error: {file: "Ingrese un archivo"}})

        }
    }

    onDelete = async (id) => {
        await this.props.deleteClothes(id)
        this.setState({clothes: this.state.clothes.filter(cloth => cloth.idPrenda !== id)})
    }

    onClickVP = (id) => {
        this.setState({validarPago: true, vp: this.state.validar.filter(item => item.idVenta === id)[0]})
    }

    onClickCE = (venta) => {
        if(venta.estado === 2){
            this.setState({cotizarEnvio: true, venta: venta})
        } else if(venta.estado === 4){
            this.setState({validarPago2: true, venta: venta})
        } else {
            this.setState({enviado: true, venta: venta})
        }
    }

    onChangeE = (e) => {
        const { venta } = this.state
        let sell = venta
        sell.idEnvio[e.target.name] = e.target.value
        this.setState({venta: sell})
    }

    indicarEnvio = async () => {
        await this.props.enviar(this.state.venta)
        this.setState({enviado: false, filterPorEnviar: this.state.filterPorEnviar.filter((item) => item[0].idEnvio.idEnvio !== this.state.venta.idEnvio.idEnvio)})
    }

    filtrar = () => {
        let filterPorEnviar = this.state.porEnviar
        if(this.state.idDepartamento !== "-1"){
            filterPorEnviar = filterPorEnviar.filter((item) => item[0].idEnvio.idProvincia.departamento === this.state.idDepartamento)
        }
        if(this.state.tipoEntrega !== "3"){
            filterPorEnviar = filterPorEnviar.filter((item) => item[0].idEnvio.tipoEntrega === parseInt(this.state.tipoEntrega))
        }
        if(this.state.estado !== "6"){
            filterPorEnviar = filterPorEnviar.filter((item) => item[0].estado === parseInt(this.state.estado))
        }
        this.setState({filterPorEnviar: filterPorEnviar})
        
    }
    render(){

    return (
        <>
        <h3>Prendas en venta</h3>
        <Link to="/en-venta/nuevo">
            <CButton className="m-3" color='primary'>
                    Nueva prenda
            </CButton>
        </Link>
        <CTabs>
            <CNav variant="tabs">
                <CNavItem>
                    <CNavLink>
                        Acciones pendientes
                    </CNavLink>
                </CNavItem>
                <CNavItem>
                    <CNavLink>
                        Prendas en venta
                    </CNavLink>
                </CNavItem>
                <CNavItem>
                    <CNavLink>
                        Por enviar
                    </CNavLink>
                </CNavItem>
                <CNavItem>
                    <CNavLink>
                        Historial
                    </CNavLink>
                </CNavItem>
            </CNav>
            <CTabContent>
                <CTabPane>
                    <CCol xs="12" md="11" className="m-3">
                        <h3>Pendiente confirmar pago</h3>
                        <CRow>   
                            {this.state.validar.map((prenda, index) => (
                                <CCol md="6" key={index}>
                                    <CCard>
                                        <PrendasCardHorizontal venta={prenda}  modo={"enventa"} tipo="validar" onClick={this.onClickVP}/>
                                    </CCard>
                                </CCol>
                            ))}  
                        </CRow>
                    </CCol>
                </CTabPane>
                <CTabPane>
                    <CCol xs="12" md="11" className="m-3">
                        <h3>Prendas en venta</h3>
                        <CRow>   
                            {this.state.clothes.map((prenda, index) => (
                                <CCol md="6" key={index}>
                                    <CCard>
                                        <PrendasCardHorizontal prenda={prenda} modo={"enventa"} onDelete={this.onDelete} edit={true}/>
                                    </CCard>
                                </CCol>
                            ))}  
                        </CRow>
                    </CCol>
                </CTabPane>
                <CTabPane>
                <CCol xs="12" md="12" className="m-3">
                    <CRow>
                        <CCol md="1">
                            <span>Departamento</span>
                        </CCol>
                        <CCol md="3">
                            <CSelect name='idDepartamento' value={this.state.idDepartamento} onChange={this.onChange}>
                                <option value="-1" >Todos</option>
                                {this.state.departamento.map((departamento,index) => (    
                                    <option key={index} value={departamento}>{departamento}</option>
                                ))}
                            </CSelect>
                        </CCol>
                        <CCol md="1">
                            <span>Tipo de entrega</span>
                        </CCol>
                        <CCol md="2" >
                            <CSelect name="tipoEntrega" value={this.state.tipoEntrega} onChange={this.onChange}>
                            <option value={3}>Todos</option>
                            <option value={2}>A domicilio</option>
                            <option value={1}>Recojo en Agencia</option>
                            </CSelect>
                        </CCol>
                        <CCol md="1">
                            <span>Estado</span>
                        </CCol>
                        <CCol md="2">
                            <CSelect onChange={this.onChange} name={'estado'}>
                            <option value={6}>Todos</option>
                            <option value={2}>Cotizar envío</option>
                            <option value={3}>Pendiente pago</option>
                            <option value={4}>Confirmar pago</option>
                            <option value={5}>Por enviar</option>
                            </CSelect>
                        </CCol>
                        <CButton md="2" color='primary' onClick={() => this.filtrar()}>
                            Filtrar
                        </CButton>
                    </CRow>
                    <CRow>
                    <CCol xs="12" md="11" className="m-3">
                    {
                        this.state.filterPorEnviar.map((venta, index) => (
                            <CCard className="mb-0" key={index}>
                                <CCardHeader>
                                    <CRow>
                                        <CCol md="10">
                                            <CButton
                                                block
                                                className="text-left m-0 p-0"
                                                onClick={() => this.setState({collapse: this.state.collapse === index ? null : index})}
                                            >
                                                <CRow className="m-auto" style={{ justifyContent: 'space-around'}}>
                                                    <span>Cliente: {venta[0].idComprador.nombre + " " + venta[0].idComprador.apellido}</span>
                                                    <span>
                                                        {parseInt(venta[0].estado) === 2 ? (
                                                            "Fecha de Solicitud:" +
                                                            (venta[0].idEnvio && venta[0].idEnvio.fechaSolicitud
                                                            ? venta[0].idEnvio.fechaSolicitud.toString().slice(0, 10)
                                                            : "")
                                                        ) : (
                                                            "Fecha pago envío:" +
                                                            (venta[0].idEnvio && venta[0].idEnvio.fechaPago
                                                            ? venta[0].idEnvio.fechaPago.toString().slice(0, 10)
                                                            : "")
                                                        )}
                                                    </span>
                                                    <span>Entrega: {parseInt(venta[0].idEnvio.tipoEntrega) === 2 ? "A domicilio" : "En agencia"}</span>
                                                </CRow>
                                            </CButton>
                                        </CCol>
                                        <CCol md="2">
                                            <CButton color='primary' size='sm' onClick={() => this.onClickCE(venta[0])} disabled={parseInt(venta[0].estado) === 3}>
                                                {parseInt(venta[0].estado) === 2 ? "Cotizar envío" : parseInt(venta[0].estado) === 4 ? "Confirmar pago" : parseInt(venta[0].estado) === 3 ? "Esperando pago" : "Enviado"}
                                            </CButton>
                                        </CCol>
                                    </CRow>
                                </CCardHeader>
                                <CCollapse show={this.state.collapse === index}>
                                    <CCardBody>
                                        <CRow>
                                            <CCol md="12">
                                                <CRow className="m-auto" style={{ justifyContent: 'space-around'}}>
                                                    <span>DNI: {venta[0].idComprador.dni}</span>
                                                    <span> Dirección: {venta[0].idEnvio.direccion}</span>
                                                    <span>Celular: {venta[0].idEnvio.telefono}</span>
                                                </CRow>
                                            </CCol>
                                        </CRow>
                                        <CRow className="g-0">
                                            {venta.map((prenda, index) => (
                                                <CCol className="m-0" key={index}>
                                                    <PrendasCardHorizontal modo="enventa" prenda={prenda.prenda[0]}></PrendasCardHorizontal>
                                                </CCol>
                                               
                                            ))}
                                        </CRow>
                                    </CCardBody>
                                </CCollapse>
                            </CCard>
                        ))
                    }
                    </CCol>
                    </CRow>
                </CCol>
                </CTabPane>
                <CTabPane>
                    <CCol xs="12" md="11" className="m-3">
                        <h3>Historial</h3>
                            {
                                this.state.historial.map((venta, index) => 
                                <CCard className="mb-0" key={index}>
                                <CCardHeader>
                                    <CRow>
                                        <CCol md="12">
                                            <CButton
                                                block
                                                className="text-left m-0 p-0"
                                                onClick={() => this.setState({collapse: this.state.collapse === index ? null : index})}
                                            >
                                                <CRow className="m-auto" style={{ justifyContent: 'space-around'}}>
                                                    <span>Cliente: {venta[0].idComprador.nombre + " " + venta[0].idComprador.apellido}</span>
                                                    <span> Dirección: {venta[0].idEnvio.direccion}</span>
                                                    <span>Entrega: {parseInt(venta[0].idEnvio.tipoEntrega) === 2 ? "A domicilio" : "En agencia"}</span>
                                                </CRow>
                                            </CButton>
                                        </CCol>
                                    </CRow>
                                </CCardHeader>
                                <CCollapse show={this.state.collapse === index}>
                                    <CCardBody>
                                        <CRow className="g-0">
                                            {venta.map((prenda, index) => (
                                                <CCol className="m-0" key={index}>
                                                    <PrendasCardHorizontal modo="enventa" prenda={prenda.prenda[0]}></PrendasCardHorizontal>
                                                </CCol>
                                               
                                            ))}
                                        </CRow>
                                    </CCardBody>
                                </CCollapse>
                            </CCard>
                                )
                            }  
                        <h3>Reportados</h3>
                            { this.state.reportados.length > 0 ?
                                <CCard className="mb-0">
                                    <CCardHeader>
                                        <CRow>
                                            <CCol md="12">
                                                <CButton
                                                    block
                                                    className="text-left m-0 p-0"
                                                    onClick={() => this.setState({collapse: this.state.collapse === -1 ? null : -1})}
                                                >
                                                    <CRow className="m-auto" style={{ justifyContent: 'space-around'}}>
                                                        <span>Prendas reportadas sin solicitud de envío</span>
                                                    </CRow>
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CCardHeader>
                                    <CCollapse show={this.state.collapse === -1}>
                                        <CCardBody>
                                            <CRow className="g-0">
                                                {this.state.reportados.map((prenda, index) => (
                                                    <CCol className="m-0" key={index}>
                                                        <PrendasCardHorizontal modo="enventa" prenda={prenda.prenda[0]}></PrendasCardHorizontal>
                                                    </CCol>
                                                ))}
                                            </CRow>
                                        </CCardBody>
                                    </CCollapse>
                                </CCard>
                                : null 
                            }
                    </CCol>
                </CTabPane>
            </CTabContent>
        </CTabs>
        <CModal 
            show={this.state.validarPago} 
            onClose={() => this.setState({validarPago: !this.state.validarPago})}
            size="lg"
        >
            <CModalHeader closeButton>
            <CModalTitle>Validar Pago</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CCardImg src={this.state.vp.comprobanteCliente}></CCardImg>
                <CFormGroup row className="m-4">
                  <CLabel col md={3}>Subir comprobante</CLabel>
                  <CCol xs="12" md="9">
                    <CInputFile custom id="custom-file-input" onChange={this.onChangeFile}/>
                    <CLabel htmlFor="custom-file-input" variant="custom-file">
                      {this.state.file ? this.state.file.name : "Elige el archivo..."}
                    </CLabel>
                  </CCol>
                </CFormGroup>
            </CModalBody>
            <CModalFooter>
            <CButton color="primary" onClick={this.validatePago} disabled={!this.state.file}>Confirmar Pago</CButton>{' '}
            <CButton color="secondary" onClick={() => this.setState({validarPago: !this.state.validarPago, reportar: true})}>Reportar</CButton>
            </CModalFooter>
        </CModal>
        <CModal 
            show={this.state.reportar} 
            onClose={() => this.setState({reportar: !this.state.reportar})}
            size="lg"
        >
            <CModalHeader closeButton>
                <CModalTitle>Reportar</CModalTitle>
            </CModalHeader>
            <CModalBody>
                    <CCol md='9' className='m-auto'>
                        <CRow>
                            <CCol className='mb-2'>
                                <CFormGroup>
                                    <CLabel type='text'>Motivo de reporte (solo 250 caracteres). Suba un archivo como evidencia</CLabel>
                                    <CTextarea 
                                    name="motivo" 
                                    id="motivo"
                                    rows="3"
                                    placeholder="Indique el motivo" 
                                    value={this.state.motivo} onChange={this.onChange}
                                    />
                                    <span style={{color: 'red'}}>{this.state.error.motivo}</span>
                                    <span style={{color: 'red'}}>{this.state.error.file}</span>
                                </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol  className='mt-2'>
                            <CFormGroup>
                                <CInputFile custom id="custom-file-input" onChange={this.onChangeFile}/>
                                <CLabel htmlFor="custom-file-input" variant="custom-file">
                                    {this.state.file ? this.state.file.name : "Suba su evidencia..."}
                                </CLabel>
                            </CFormGroup>
                            </CCol>
                        </CRow>
                    </CCol>
                
            </CModalBody>
            <CModalFooter>
                <CButton color="primary" onClick={this.reportar}>Enviar</CButton>
            </CModalFooter>
        </CModal>
        <CModal 
            show={this.state.cotizarEnvio}
            onClose={() => this.setState({cotizarEnvio: !this.state.cotizarEnvio})}
            size="sm"
        >
            <CModalHeader closeButton>
            <CModalTitle>Cotizar envío</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CFormGroup>
                    <CLabel type='number'>Indicar el precio del delivery</CLabel>
                    <CInput id="precio" placeholder="S/." required />
                    <span style={{color: 'red'}}>{this.state.error.precio}</span>
                </CFormGroup>
            </CModalBody>
            <CModalFooter>
            <CButton color="primary" onClick={this.cotizar}>Enviar</CButton>
            </CModalFooter>
        </CModal>
        <CModal 
            show={this.state.validarPago2} 
            onClose={() => this.setState({validarPago2: !this.state.validarPago2})}
            size="lg"
        >
            <CModalHeader closeButton>
            <CModalTitle>Validar Pago</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CCardImg src={this.state.venta.idEnvio ? this.state.venta.idEnvio.comprobanteCliente : "" }></CCardImg>
            </CModalBody>
            <CModalFooter>
            <CButton color="primary" onClick={this.validatePago2}>Confirmar Pago</CButton>
            </CModalFooter>
        </CModal>
        <CModal 
            show={this.state.enviado} 
            onClose={() => this.setState({enviado: !this.state.enviado})}
            size='sm'
        >
            <CModalHeader closeButton>
            <CModalTitle>Indicar envío</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CFormGroup>
                    <CLabel type='number'>Indicar fecha estimada de envío</CLabel>
                    <CInput type='date' name="fechaEntrega"  required onChange={this.onChangeE}/>
                </CFormGroup>
                {this.state.venta.idEnvio && this.state.venta.idEnvio.tipoEntrega === 1 ? 
                <CFormGroup>
                    <CLabel type='number'>Confirmar dirección agencia</CLabel>
                    <CInput type='text' name="direccion"  required value={this.state.venta.idEnvio.direccion} onChange={this.onChangeE}/>
                </CFormGroup>: null}
            </CModalBody>
            <CModalFooter>
            <CButton color="primary" onClick={this.indicarEnvio} disabled={this.state.venta.idEnvio ? !this.state.venta.idEnvio.fechaEntrega : true}>Confirmar Envio</CButton>
            </CModalFooter>
        </CModal>
        </>
    )
  }
}

const mapStateToProps = state => {
    return {
        clothes: state.prenda.clothes,
        user: state.auth.user,
        sell: state.venta.sell,
        departamento: state.provincia.cities.departamento,
        provincia: state.provincia.cities.provincia
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(Object.assign({},clothesActions, sellActions, buyerActions), dispatch)
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(EnVenta)