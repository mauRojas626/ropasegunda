import { CButton, CTabPane, CInputFile, CCol, CRow, CNavItem, CNavLink, CTabContent, CTabs, CNav, CCard, CSelect, CCardHeader, CCollapse, CCardBody, CModalBody, CModalFooter, CModalHeader, CModalTitle, CModal, CCardImg, CFormGroup, CLabel, CInput } from '@coreui/react'
import React, { Component } from 'react'
import PrendasCardHorizontal from './PrendaCardHorizontal';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as clothesActions from '../../../services/redux/actions/prenda'

class EnVenta extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapse: 0,
            validarPago: false,
            cotizarEnvio: false,
            clothes: [],
            user: {}
        }
    }
    async componentDidMount(){
        await this.props.getClothes()
        let clothes = this.props.clothes.filter(cloth => cloth.idVendedor.idUsuario === this.props.user.idUsuario)
        this.setState({clothes: clothes, user: this.props.user})

    }

    onDelete = (id) => {
        this.props.deleteClothes(id)
        this.setState({clothes: this.state.clothes.filter(cloth => cloth.idPrenda !== id)})
    }

    onClickVP = () => {
        this.setState({validarPago: true})
    }
    onClickCE = () => {
        this.setState({cotizarEnvio: true})
    }
    render() {
    const prendaData = [
        {id: 0, nombre: "Saco Zara", precio: 45, talla: "S", color: "Rojo", detalles: "Tiene un descosido en la parte de atrás", marca: "Zara", sexo: 0, categoría: "saco", material: "tela", fotos: [{link: "https://http2.mlstatic.com/D_NQ_NP_720832-MPE48261251804_112021-O.webp"}, {link: "https://www.panoramaweb.com.mx/u/fotografias/m/2022/8/2/f850x638-33802_111291_5050.jpg"}], fechaPublicacion: "", vendedor: "Ocasi.on"},
        {id: 1, nombre: "Polo H&M", precio: 10, talla: "XS", color: "Rojo", detalles: "No", marca: "H&M", sexo: 1, categoría: "polo", material: "algodón", fotos: [{link: "https://nautica.com.pe/cdn/shop/products/K71006_6NR_A_89ff13d1-839b-4423-8309-53bbb632f804.jpg?v=1652803427"}, {link: "https://www.panoramaweb.com.mx/u/fotografias/m/2022/8/2/f850x638-33802_111291_5050.jpg"}], fechaPublicacion: "", vendedor: "Natalia Salas"},
        {id: 2, nombre: "Chompa Marrón", precio: 15, talla: "XS", color: "Marrón", detalles: "No", marca: "", sexo: 1, categoría: "chompa", material: "", fotos: [{link: "https://lastraperas-public.imgix.net/items/64d2ce621550170008316d2f/IMG_6734_clipped_rev_1.png?h=345&auto=format"}, {link: "https://www.panoramaweb.com.mx/u/fotografias/m/2022/8/2/f850x638-33802_111291_5050.jpg"}], fechaPublicacion: "", vendedor: "Maria Marroquín"},
        {id: 3, nombre: "Top Zara", precio: 15, talla: "S", color: "", detalles: "No", marca: "", sexo: 0, categoría: "Top", material: "", fotos: [{link: "https://lastraperas-public.imgix.net/items/64b8762b22ce520008503ff8/WhatsApp-Image-2023-08-25-at-1.19.34-PM_clipped_rev_1.png?h=345&auto=format"}, {link: "https://www.panoramaweb.com.mx/u/fotografias/m/2022/8/2/f850x638-33802_111291_5050.jpg"}], fechaPublicacion: "", vendedor: "Ocasi.on"},
    ]
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
                            {prendaData.map(prenda => (
                                <CCol md="6">
                                    <CCard>
                                        <PrendasCardHorizontal prenda={prenda} modo={"enventa"} tipo="validar" onClick={this.onClickVP}/>
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
                            <CSelect>
                            <option value="1">Lima</option>
                            <option value="2">Ica</option>
                            <option value="3">Arequipa</option>
                            <option value="4">Moquegua</option>
                            <option value="5">Tacna</option>
                            <option value="6">Tumbes</option>
                            <option value="7">Piura</option>
                            <option value="8">La Libertad</option>
                            <option value="9">Ayacucho</option>
                            <option value="10">Junin</option>
                            <option value="11">Lambayeque</option>
                            <option value="12">Amazonas</option>
                            <option value="13">Todos</option>
                            </CSelect>
                        </CCol>
                        <CCol md="1">
                            <span>Tipo de entrega</span>
                        </CCol>
                        <CCol md="2">
                            <CSelect>
                            <option value="1">A domicilio</option>
                            <option value="2">Recojo en Agente</option>
                            <option value="3s">Todos</option>
                            </CSelect>
                        </CCol>
                        <CCol md="1">
                            <span>Estado</span>
                        </CCol>
                        <CCol md="2">
                            <CSelect>
                            <option value="1">Cotizar envío</option>
                            <option value="2">Confirmar pago</option>
                            <option value="3">Por enviar</option>
                            <option value="4">Pendiente pago</option>
                            <option value="5">Todos</option>
                            </CSelect>
                        </CCol>
                        <CButton md="2" color='primary'>
                            Filtrar
                        </CButton>
                    </CRow>
                    <CRow>
                    <CCol xs="12" md="11" className="m-3">
                    <CCard className="mb-0">
                        <CCardHeader>
                            <CRow>
                                <CCol md="10">
                                    <CButton 
                                        block
                                        className="text-left m-0 p-0" 
                                        onClick={() => this.setState({collapse: this.state.collapse === 0 ? null : 0})}
                                    >
                                        <CRow className="m-auto" style={{ justifyContent: 'space-around'}}>
                                            <span>Cliente: Juan Robles </span>    
                                            <span> Dirección: Av. Nogales 374 - San Borja - Lima</span>  
                                            <span> Entrega: a domicilio</span>     
                                        </CRow>
                                    </CButton>
                                </CCol>
                                <CCol md="2">
                                    <CButton color='danger' size='sm'>
                                        Confirmar pago
                                    </CButton>
                                </CCol>
                            </CRow>
                        </CCardHeader>
                        <CCollapse show={this.state.collapse === 0}>
                            <CCardBody>
                                <CRow className="g-0">
                                    <CCol className="m-0">
                                    <PrendasCardHorizontal modo="enventa" prenda={prendaData[0]}></PrendasCardHorizontal>
                                    </CCol>
                                    <CCol className="m-0">
                                    <PrendasCardHorizontal modo="enventa" prenda={prendaData[1]}></PrendasCardHorizontal>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCollapse>
                    </CCard>
                    <CCard className="mb-0">
                        <CCardHeader>
                            <CRow>
                                <CCol md="10">
                                    <CButton 
                                        block
                                        className="text-left m-0 p-0" 
                                        onClick={() => this.setState({collapse: this.state.collapse === 1 ? null : 1})}
                                    >
                                        <CRow className="m-auto" style={{ justifyContent: 'space-around'}}>
                                        <span>Cliente: Juan Robles </span>    
                                            <span> Dirección: Av. Nogales 374 - San Borja - Lima</span>  
                                            <span> Entrega: a domicilio</span>  
                                        </CRow>
                                    </CButton>
                                </CCol>
                                <CCol md="2">
                                    <Link className="link" to={{pathname: "/login", state: {prenda: prendaData[0]}}}>
                                        <CButton color='primary' size='sm'>
                                            Enviado
                                        </CButton>
                                    </Link>
                                </CCol>
                            </CRow>
                        </CCardHeader>
                        <CCollapse show={this.state.collapse === 1}>    
                            <CCardBody>
                                <CRow className="g-0">
                                    <CCol className="m-0">
                                    <PrendasCardHorizontal modo="enventa" prenda={prendaData[0]}></PrendasCardHorizontal>
                                    </CCol>
                                    <CCol className="m-0">
                                    <PrendasCardHorizontal modo="enventa" prenda={prendaData[0]}></PrendasCardHorizontal>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCollapse>
                    </CCard>
                    <CCard className="mb-0">
                        <CCardHeader>
                            <CRow>
                                <CCol md="10">
                                    <CButton 
                                        block
                                        className="text-left m-0 p-0" 
                                        onClick={() => this.setState({collapse: this.state.collapse === 2 ? null : 2})}
                                    >
                                        <CRow className="m-auto" style={{ justifyContent: 'space-around'}}>
                                            <span>Cliente: Saul Perez </span>    
                                            <span> Dirección: Ca. Flores 654 - Jesús María - Lima</span>  
                                            <span> Entrega: a domicilio</span>     
                                        </CRow>
                                    </CButton>
                                </CCol>
                                <CCol md="2">
                                    <CButton color='warning' size='sm' onClick={this.onClickCE}>
                                        Cotizar envío
                                    </CButton>
                                </CCol>
                            </CRow>
                        </CCardHeader>
                        <CCollapse show={this.state.collapse === 2}>
                            <CCardBody>
                                <CRow className="g-0">
                                    <CCol className="m-0">
                                    <PrendasCardHorizontal modo="enventa" prenda={prendaData[3]}></PrendasCardHorizontal>
                                    </CCol>
                                    <CCol className="m-0">
                                    <PrendasCardHorizontal modo="enventa" prenda={prendaData[2]}></PrendasCardHorizontal>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCollapse>
                    </CCard>
                    </CCol>
                    </CRow>
                </CCol>
                </CTabPane>
                <CTabPane>
                    <CCol xs="12" md="11" className="m-3">
                        <h3>Este mes</h3>
                        <CRow>   
                            {prendaData.map(prenda => (
                                <CCol md="6">
                                    <CCard>
                                        <PrendasCardHorizontal prenda={prenda} modo={"enventa"}/>
                                    </CCard>
                                </CCol>
                            ))}  
                        </CRow>
                        <h3>Más antiguos</h3>
                        <CRow>   
                            {prendaData.map(prenda => (
                                <CCol md="6">
                                    <CCard>
                                        <PrendasCardHorizontal prenda={prenda} modo={"enventa"}/>
                                    </CCard>
                                </CCol>
                            ))}  
                        </CRow>
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
                <CCardImg src='https://mitokenonline.com/wp-content/uploads/2023/06/comprobante-yape.png'></CCardImg>
                <CFormGroup row className="m-4">
                  <CLabel col md={3}>Subir comprobante</CLabel>
                  <CCol xs="12" md="9">
                    <CInputFile custom id="custom-file-input"/>
                    <CLabel htmlFor="custom-file-input" variant="custom-file">
                      Elige el archivo...
                    </CLabel>
                  </CCol>
                </CFormGroup>
            </CModalBody>
            <CModalFooter>
            <CButton color="primary" onClick={() => this.setState({validarPago: !this.state.validarPago})}>Confirmar Pago</CButton>{' '}
            <CButton color="secondary" onClick={() => this.setState({validarPago: !this.state.validarPago})}>Reportar</CButton>
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
                    <CLabel type='number'>Indicar e precio del delivery</CLabel>
                    <CInput id="precio" placeholder="S/." required />
                </CFormGroup>
            </CModalBody>
            <CModalFooter>
            <CButton color="primary" onClick={() => this.setState({cotizarEnvio: !this.state.cotizarEnvio})}>Enviar</CButton>
            </CModalFooter>
        </CModal>
        </>
    )
  }
}

const mapStateToProps = state => {
    return {
        clothes: state.prenda.clothes,
        user: state.auth.user
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(Object.assign({},clothesActions), dispatch)
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(EnVenta)