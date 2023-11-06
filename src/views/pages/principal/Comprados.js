import { CCol, CTabs, CNav, CNavItem, CNavLink, CTabContent, CTabPane, CRow, CCard, CCardHeader, CButton, CCollapse, CCardBody, CBadge, CModalBody, CFormGroup,
CLabel, CInput, CModalFooter, CModal, CModalHeader, CModalTitle, CTextarea } from '@coreui/react';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PrendasCardHorizontal from './PrendaCardHorizontal';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as sellActions from '../../../services/redux/actions/venta'

class Comprados extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapse: 0,
            calificar: false,
            sell: [],
            clothesBySeller1: [],
            clothesBySeller0: [],
            uniqueSellers0: [],
            uniqueSellers1: [],
            uniqueShipping0: [],
            uniqueShipping1: [],
            clothesByShipping0: [],
            clothesByShipping1: [],
            clothesByHistorial: [],
            calificacion: 0,
            comentario: ""
        }
    }

    async componentDidMount(){
        await this.props.getSell(this.props.user.idUsuario)
        const sell = this.props.sell    
        
        let filteredSell = sell.filter((item) => item.idComprador.idUsuario === this.props.user.idUsuario)
        let sell1 = filteredSell.filter((item) => item.estado === 1)
        let sell0 = filteredSell.filter((item) => item.estado === 0)
        let ship1 = filteredSell.filter((item) => item.estado === 2 || item.estado === 3)
        let ship2 = filteredSell.filter((item) => item.estado >= 4 && item.estado < 6)
        let historial = filteredSell.filter((item) => item.estado >= 6)

        let uniqueHistorial = [...new Set(historial.map((sell) => sell.idEnvio.idEnvio))]
        let clothesByHistorial = []
        uniqueHistorial.forEach((shipping, index) => {
            clothesByHistorial[index] = historial.filter((sell) => sell.idEnvio.idEnvio === shipping)
        })

        const uniqueShipping0 = [...new Set(ship1.map((sell) => sell.idEnvio.idEnvio))]

        const uniqueShipping1 = [...new Set(ship2.map((sell) => sell.idEnvio.idEnvio))]
        let clothesByShipping0 = []
        let clothesByShipping1 = []
        uniqueShipping0.forEach((shipping, index) => {
            clothesByShipping0[index] = ship1.filter((sell) => sell.idEnvio.idEnvio === shipping)
        })

        uniqueShipping1.forEach((shipping, index) => {
            clothesByShipping1[index] = ship2.filter((sell) => sell.idEnvio.idEnvio === shipping)
        })

        const uniqueSellers0 = [...new Set(sell0.map((sell) => sell.idVendedor.idUsuario))];

        const uniqueSellers1 = [...new Set(sell1.map((sell) => sell.idVendedor.idUsuario))];
        let clothesBySeller0 = []
        let clothesBySeller1 = []
        uniqueSellers0.forEach((seller, index) => {
            clothesBySeller0[index] = sell0.filter((sell) => sell.idVendedor.idUsuario === seller)
            const mostRecentDate = new Date(Math.max(...clothesBySeller0[index].map(sell => new Date(sell.fechaCompra).getTime() )))
            clothesBySeller0[index].date = mostRecentDate
        })
        uniqueSellers1.forEach((seller, index) => {
            clothesBySeller1[index] = sell1.filter((sell) => sell.idVendedor.idUsuario === seller)
            const mostRecentDate = new Date(Math.max(...clothesBySeller1[index].map(sell => new Date(sell.fechaCompra).getTime() )))
            clothesBySeller1[index].date = mostRecentDate
        })
        
        this.setState({clothesBySeller0: clothesBySeller0, uniqueSellers0: uniqueSellers0, clothesBySeller1: clothesBySeller1, uniqueSellers1: uniqueSellers1,
            uniqueShipping0: uniqueShipping0, uniqueShipping1: uniqueShipping1, clothesByShipping0: clothesByShipping0, clothesByShipping1: clothesByShipping1,
            clothesByHistorial: clothesByHistorial
        })
    }

    calificar   = () => {
        let envio = this.state.sell[0].idEnvio
        envio.calificacion = parseInt(this.state.calificacion)
        envio.comentario = this.state.comentario
        envio.idVendedor = this.state.sell[0].idVendedor
        this.props.calificar(envio)
        this.setState({calificar: !this.state.calificar})
        let clothesByHistorial = this.state.clothesByHistorial
        clothesByHistorial.forEach((sell) => {
            if(sell[0].idEnvio.idEnvio === envio.idEnvio){
                sell.forEach((item) => {
                    item.estado = 7
                })
            }
        })
    }

    onChange = (e) => {
        this.setState({[e.target.id]: e.target.value})
    }

    modal = (sell) => {
        this.setState({calificar: !this.state.calificar, sell: sell})
    }

    render() {
        return (
            <CCol md="10">
                <h1>Prendas Compradas</h1>
                <CTabs>
                        <CNav variant="tabs">
                            <CNavItem>
                                <CNavLink>
                                    Pedidos Acumulados
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink>
                                    Pendiente Pago Envío
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink>
                                    Estado de Envío
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
                                    <h3>Pendientes</h3>
                                    {this.state.clothesBySeller0.map((sell, index) => 
                                        <CCard className="mb-0" key={index}>
                                            <CCardHeader>
                                                <CRow>
                                                    <CCol md="9">
                                                        <CButton 
                                                            block 
                                                            className="text-left m-0 p-0" 
                                                            onClick={() => this.setState({collapse: this.state.collapse === index ? null : index})}
                                                        >
                                                            <CRow className="m-auto" style={{ justifyContent: 'space-around'}} key={index}>
                                                                <span>{sell[0].idVendedor.nombre + " " + sell[0].idVendedor.apellido} </span>    
                                                                <span> {sell.length === 1 ? "1 prenda" : sell.length + " prendas"}</span>   
                                                                <span>{sell[0].fechaConfirmacionPago === null ? "Fecha máxima de confirmación: " + new Date(sell.date.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0,10) 
                                                                : "Pedir envío antes de: " + new Date(sell.date.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0,10) }</span>
                                                            </CRow>
                                                        </CButton>
                                                    </CCol>
                                                    <CCol md="3">
                                                        <Link className="link" to={{pathname: "/comprados/entrega", state: {sell: sell}}}>
                                                            <CButton color='primary' disabled={sell[0].fechaConfirmacionPago === null}>
                                                                {sell[0].fechaConfirmacionPago === null ? "Validando pago" : "Pedir envío"}
                                                            </CButton>
                                                        </Link>
                                                    </CCol>
                                                </CRow>
                                            </CCardHeader>
                                            <CCollapse show={this.state.collapse === index}>
                                                <CCardBody>
                                                    {sell.map((item, index) => 
                                                        <PrendasCardHorizontal key={index} venta={item}></PrendasCardHorizontal>
                                                        
                                                    )}
                                                </CCardBody>
                                            </CCollapse>
                                        </CCard>
                                    )
                                    }   
                                    {this.state.clothesBySeller1.map((sell, index) => 
                                        <CCard className="mb-0" key={index}>
                                            <CCardHeader>
                                                <CRow>
                                                    <CCol md="9">
                                                        <CButton 
                                                            block 
                                                            className="text-left m-0 p-0" 
                                                            onClick={() => this.setState({collapse: this.state.collapse === index + this.state.clothesBySeller0.length ? null : index + this.state.clothesBySeller0.length})}
                                                        >
                                                            <CRow className="m-auto" style={{ justifyContent: 'space-around'}} key={index}>
                                                                <span>{sell[0].idVendedor.nombre + " " + sell[0].idVendedor.apellido} </span>    
                                                                <span> {sell.length === 1 ? "1 prenda" : sell.length + " prendas"}</span>   
                                                                <span>{sell[0].fechaConfirmacionPago === null ? "Fecha máxima de confirmación: " + new Date(sell.date.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0,10) 
                                                                : "Pedir envío antes de: " + new Date(sell.date.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0,10) }</span>
                                                            </CRow>
                                                        </CButton>
                                                    </CCol>
                                                    <CCol md="3">
                                                        <Link className="link" to={{pathname: "/comprados/entrega", state: {sell: sell}}}>
                                                            <CButton color='primary' disabled={sell[0].fechaConfirmacionPago === null}>
                                                                {sell[0].fechaConfirmacionPago === null ? "Validando pago" : "Pedir envío"}
                                                            </CButton>
                                                        </Link>
                                                    </CCol>
                                                </CRow>
                                            </CCardHeader>
                                            <CCollapse show={this.state.collapse === index + this.state.clothesBySeller0.length}>
                                                <CCardBody>
                                                    {sell.map((item, index) => 
                                                        <PrendasCardHorizontal key={index} venta={item}></PrendasCardHorizontal>
                                                        
                                                    )}
                                                </CCardBody>
                                            </CCollapse>
                                        </CCard>
                                    )
                                    }
                                </CCol>
                            </CTabPane>
                            <CTabPane>
                                <CCol xs="12" md="11" className="m-3">
                                    <h3>Pendiente pago envío</h3>
                                    {this.state.clothesByShipping0.map((sell, index) =>
                                        <CCard className="mb-0" key={index}>
                                            <CCardHeader>
                                                <CRow>
                                                    <CCol md="10">
                                                        <CButton
                                                            block
                                                            className="text-left m-0 p-0"
                                                            onClick={() => this.setState({ collapse: this.state.collapse === index ? null : index })}
                                                        >
                                                            <CRow className="m-auto" style={{ justifyContent: 'space-around' }} key={index}>
                                                                <span>{sell[0].idVendedor.nombre} </span>
                                                                <span> {sell.length === 1 ? "1 prenda" : sell.length + " prendas"}</span>
                                                                <span>{sell[0].idEnvio.precioEnvio ? "Precio envío: " + sell[0].idEnvio.precioEnvio : "" }</span>
                                                            </CRow>
                                                        </CButton>
                                                    </CCol>
                                                    <CCol md="2">   
                                                        <Link className="link" to={{pathname: "/comprados/pago", state: {sell: sell}}}>
                                                            <CButton color='primary' disabled={sell[0].estado === 2} size={sell[0].estado === 2 ? 'sm': ''} onClick={this.pagarEnvio}>
                                                                {sell[0].estado === 2 ? "Cotizando envio" : "Pagar envío"}
                                                            </CButton>
                                                        </Link>
                                                        
                                                    </CCol>
                                                </CRow>
                                            </CCardHeader>
                                            <CCollapse show={this.state.collapse === index}>
                                                <CCardBody>
                                                    {sell.map((item, index) =>
                                                        <PrendasCardHorizontal modo="pe" key={index} venta={item}></PrendasCardHorizontal>
                                                    )}
                                                </CCardBody>
                                            </CCollapse>
                                        </CCard>
                                    )}
                                </CCol>
                            </CTabPane>
                            <CTabPane>
                            <CCol xs="12" md="11" className="m-3">
                                    <h3>Envíos</h3>
                                    {this.state.clothesByShipping1.map((sell, index) =>
                                        <CCard className="mb-0" key={index}>
                                            <CCardHeader>
                                                <CRow>
                                                    <CCol md="10">
                                                        <CButton
                                                            block
                                                            className="text-left m-0 p-0"
                                                            onClick={() => this.setState({ collapse: this.state.collapse === index ? null : index })}
                                                        >
                                                            <CRow className="m-auto" style={{ justifyContent: 'space-around' }} key={index}>
                                                                <span>{sell[0].idVendedor.nombre + " " + sell[0].idVendedor.apellido} </span>
                                                                <span> {sell.length === 1 ? "1 prenda" : sell.length + " prendas"}</span>
                                                                <span> Fecha estimada: {sell[0].idEnvio.fechaEntrega ? new Date(sell[0].idEnvio.fechaEntrega).toISOString().slice(0,10) : "Por confirmar" }</span>
                                                                <span>Estado: <CBadge shape='pill' color='dark'>{sell[0].estado == 4 ? "confirmando pago" : sell[0].estado == 5 ? "preparando pedido": "En camino"}</CBadge></span>
                                                            </CRow>
                                                        </CButton>
                                                    </CCol>
                                                    <CCol md="2">
                                                        { sell[0].fechaEntrega ? new Date() > new Date(sell[0].fechaEntrega.getTime()) ? <CButton color='primary' size='sm'>
                                                            Reportar
                                                        </CButton> : <></> : <></>}
                                                    </CCol>
                                                </CRow>
                                            </CCardHeader>
                                            <CCollapse show={this.state.collapse === index}>
                                                <CCardBody>
                                                    {
                                                        sell.map((item, index) => <PrendasCardHorizontal modo="pe" venta={item} key={index}></PrendasCardHorizontal>)
                                                    }
                                                    
                                                </CCardBody>
                                            </CCollapse>
                                        </CCard>
                                    )}
                            </CCol>
                            </CTabPane>
                            <CTabPane>
                            <CCol xs="12" md="11" className="m-3">
                                    <h3>Historial</h3>
                                    {this.state.clothesByHistorial.map((sell, index) =>
                                        <CCard className="mb-0" key={index}>
                                            <CCardHeader>
                                                <CRow>
                                                    <CCol md="10">
                                                        <CButton
                                                            block
                                                            className="text-left m-0 p-0"
                                                            onClick={() => this.setState({ collapse: this.state.collapse === index ? null : index })}
                                                        >
                                                            <CRow className="m-auto" style={{ justifyContent: 'space-around' }} key={index}>
                                                                <span>{sell[0].idVendedor.nombre + " " + sell[0].idVendedor.apellido} </span>
                                                                <span> {sell.length === 1 ? "1 prenda" : sell.length + " prendas"}</span>
                                                                <span>Fecha de Entrega: {new Date(sell[0].idEnvio.fechaEntrega).toISOString().slice(0,10)}</span>
                                                            </CRow>
                                                        </CButton>
                                                    </CCol>
                                                    <CCol md="2">
                                                        {sell[0].estado !== 7 ?
                                                        <CButton color='primary' size='sm' onClick={() => this.modal(sell)} >
                                                            Calificar vendedor
                                                        </CButton> : <></>}
                                                    </CCol>
                                                </CRow>
                                            </CCardHeader>
                                            <CCollapse show={this.state.collapse === index}>
                                                <CCardBody>
                                                    {
                                                        sell.map((item, index) => <PrendasCardHorizontal modo="pe" venta={item} key={index}></PrendasCardHorizontal>)
                                                    }
                                                </CCardBody>
                                            </CCollapse>
                                        </CCard>

                                    )}
                                    
                            </CCol>
                            </CTabPane>
                        </CTabContent>
                    </CTabs>
                    <CModal 
                        show={this.state.calificar}
                        onClose={() => this.setState({calificar: !this.state.calificar})}
                        size="sm"
                    >
                        <CModalHeader closeButton>
                        <CModalTitle>Calificar vendedor</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <CFormGroup>
                                <CLabel type='number'>Del 1 al 5 ¿cómo calificas tu experiencia?</CLabel>
                                <CInput id="calificacion" placeholder="indica el número" required value={this.state.calificacion} onChange={this.onChange}/>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel type='text'>Deja un breve comentario sobre tu experiencia</CLabel>
                                <CTextarea 
                                name="cometario" 
                                id="comentario" 
                                rows="4"
                                placeholder="Cuéntanos" 
                                value={this.state.comentario} onChange={this.onChange}
                                />
                            </CFormGroup>
                        </CModalBody>
                        <CModalFooter>
                            <CButton color="primary" onClick={this.calificar}>Enviar</CButton>
                        </CModalFooter>
                    </CModal>
            </CCol>

        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        sell: state.venta.sell
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(Object.assign({},sellActions), dispatch)
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Comprados)