import React, { Component } from 'react'
import { CButton, CCardImg, CCol, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react'

export default class PrendasCardHorizontal extends Component {
    constructor(props){
        super(props);
        this.state = {
            showQrYape: true 
        }
    }

    render() {
        return (
            <CRow className="g-0"> 
                <CCol xs="12" sm={this.props.modo === "enventa" ? 6 : 4} className="m-left m-0" >
                    <CCardImg src={this.props.prenda.fotos[0].link} style={{height: "12rem"}}></CCardImg>
                </CCol>
                <CCol xs="12" sm={this.props.modo === "enventa" ? 6 : 4} className="m-auto" >
                    {this.props.edit ? <><CIcon name="cil-trash" className="float-right mr-3"/>
                    <CIcon name="cil-pencil" className="float-right mr-2"/></> : this.props.tipo === "validar" ?
                    <CButton color="primary" size='sm' className="float-right mr-2" onClick={this.props.onClick}>Validar pago</CButton>
                    : <></>}
                    
                    <h5>{this.props.tipo === "validar" ? "Estado: " : this.props.modo === "enventa" ? "" : this.props.prenda.vendedor}</h5>
                        
                    <h4>{this.props.prenda.nombre}</h4>
                    <br/>
                    <h6>Talla: {this.props.prenda.talla}</h6>
                    <h6>S/ {this.props.prenda.precio}</h6>
                    <h6>Detalles: {this.props.prenda.detalles !== "" ? "Si" : "No"}</h6>
                </CCol>
                {this.props.modo === "enventa" || this.props.modo === "enviar" ? <></> : 
                <CCol sm="4" className="m-auto">
                    <h6>Fecha de compra: 20/09/23</h6>
                    {this.props.modo === "pe" ? <>
                    <h6>Realizar pago antes de: 24/09/23</h6> 
                    <h6>Dirección: Av. Manuel Medina 354 - Lima - Lima</h6>
                    </> : <h6>Pedir envío antes de: 20/10/23</h6>}
                </CCol>
                }
            </CRow>
        )
    }
}
