import React, { Component } from 'react'
import { CCardImg, CCol, CRow } from '@coreui/react';
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
                <CCol xs="12" sm={this.props.modo === "enventa" ? 6 : 8} className="m-auto" >
                    {this.props.edit ? <><CIcon name="cil-trash" className="float-right mr-3"/>
                    <CIcon name="cil-pencil" className="float-right mr-2"/></> : <></>}
                    <h5>{this.props.modo === "enventa" ? "Estado: " : this.props.prenda.vendedor}</h5>
                        
                    <h4>{this.props.prenda.nombre}</h4>
                    <br/>
                    <h6>Talla: {this.props.prenda.talla}</h6>
                    <h6>S/ {this.props.prenda.precio}</h6>
                    <h6>Detalles: {this.props.prenda.detalles !== "" ? "Si" : "No"}</h6>
                </CCol>
            </CRow>
        )
    }
}
