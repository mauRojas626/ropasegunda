import React, { Component } from 'react'
import { CButton, CCardImg, CCol, CModal, CRow, CModalBody, CModalFooter, CModalHeader, CModalTitle  } from '@coreui/react';
import CIcon from '@coreui/icons-react'

import { Link } from 'react-router-dom';

export default class PrendasCardHorizontal extends Component {
    constructor(props){
        super(props);
        this.state = {
            showQrYape: true,
            modal: false
        }
    }

    onDelete = () => {
        this.props.onDelete(this.props.prenda.idPrenda)
    }

    onClick = () => {
        this.props.onClick(this.props.venta.idVenta)
    }

    render() {
        return (
            <>
            <CRow className="g-0"> 
                <CCol xs="12" sm={this.props.modo === "enventa" ? 6 : 4} className="m-left m-0" >
                    <CCardImg src={this.props.venta ? this.props.venta.prenda[0].fotos[0].url : this.props.prenda.fotos[0].url} style={{height: "12rem"}}></CCardImg>
                </CCol>
                <CCol xs="12" sm={this.props.modo === "enventa" ? 6 : 4} className="m-auto" >
                    {this.props.edit ? <><CButton size='sm' className="float-right mr-2" onClick={this.onDelete}><CIcon name="cil-trash" /></CButton>
                    <Link className="link" to={{pathname: "./en-venta/editar", state: {prenda: this.props.prenda}}}  > <CButton  size='sm' className="float-right m-0"><CIcon name="cil-pencil" /></CButton></Link></> : this.props.tipo === "validar" ?
                    <CButton color="primary" size='sm' className="float-right mr-2" onClick={this.onClick}>Validar pago</CButton>
                    : <></>}
                    
                    <h5>{this.props.tipo === "validar" ? "Estado: " : this.props.modo === "enventa" || this.props.modo === "enviar"  ? "" : this.props.venta ? this.props.venta.idVendedor.nombre + " " + this.props.venta.idVendedor.apellido: ""}</h5>
                        
                    <h4>{this.props.venta ? this.props.venta.prenda[0].nombre : this.props.prenda.nombre}</h4>
                    <br/>
                    <h6>Talla: {this.props.venta ? this.props.venta.prenda[0].talla : this.props.prenda.talla}</h6>
                    <h6>S/ {this.props.venta ? this.props.venta.prenda[0].precio : this.props.prenda.precio}</h6>
                    <h6>Detalles: {this.props.venta ? this.props.venta.prenda[0].detalle !== "Ninguno" ? "Si" : "No" : this.props.prenda.detalle !== "Ninguno" ? "Si" : "No"}</h6>
                </CCol>
                {this.props.modo === "enventa" || this.props.modo === "enviar" || this.props.modo === "admin"  ? <></> : 
                <CCol sm="4" className="m-auto">
                    <h6>Fecha de compra: {this.props.venta ? this.props.venta.fechaCompra.slice(0,10): ""}</h6>
                    {this.props.modo === "pe" ? <>
                    { this.props.venta ? this.props.venta.estado === 2 ? "" : this.props.venta.estado === 3 ? <h6>Realizar pago antes de: {}</h6> : "" : ""}
                    <h6>Dirección: {this.props.venta ? this.props.venta.idEnvio.direccion : ""}</h6>
                    </> : <h6>Pedir envío antes de: {this.props.venta ? new Date(new Date(this.props.venta.fechaCompra).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0,10): ""}</h6>}
                    {this.props.venta ? this.props.venta.estado === 1 ? <CButton color='primary' onClick={() => this.setState({modal: true})}>Ver Boleta</CButton>: <></>: <></>}
                </CCol>
                }
                {this.props.modo === "admin" ?
                <CCol sm="4" className="m-auto">
                    <h6>Fecha de compra: {this.props.venta ? this.props.venta.fechaCompra.slice(0,10): ""}</h6>
                    <h6>Fecha Confirmación Pago: {this.props.venta.fechaConfirmacionPago ? this.props.venta.fechaConfirmacionPago.toString().slice(0,10) : "" }</h6>
                    <h6>Precio: S/ {this.props.venta.total}</h6>
                    <CButton color='primary' size='sm' onClick={() => this.setState({modal: true})} disabled={this.props.venta.comprobantePago === null}>Ver Boleta</CButton>
                    <CButton color='primary' size='sm' onClick={() => this.setState({modal2: true})}>Ver pago cliente</CButton>
                </CCol> : null
                }
            </CRow>
            <CModal show={this.state.modal} onClose={() => this.setState({modal: false})} >
                <CModalHeader closeButton>
                    <CModalTitle>comprobante de Pago</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow className="g-0"> 
                        <CCardImg src={this.props.venta ? this.props.venta.comprobantePago: ""}></CCardImg>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={() => this.setState({modal: false})}>Cerrar</CButton>
                </CModalFooter>
            </CModal>
            <CModal show={this.state.modal2} onClose={() => this.setState({modal2: false})} >
                <CModalHeader closeButton>
                    <CModalTitle>comprobante de Pago</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow className="g-0"> 
                        <CCardImg src={this.props.venta ? this.props.venta.comprobantePago: ""}></CCardImg>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={() => this.setState({modal2: false})}>Cerrar</CButton>
                </CModalFooter>
            </CModal>
            </>
        )
    }
}
