import { CCard, CCardBody, CCardImg, CCol } from '@coreui/react';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import CIcon from '@coreui/icons-react';

export default class PrendaCard extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render() {
    return (
            <Link className="link" to={{pathname: "./Prenda", state: {prenda: this.props.prenda}}}  >              
                <CCard>
                    <CCardImg orientation="top" src={this.props.prenda.fotos[0].link} />
                    <CCardBody>
                        <CCol>
                        <span style={{float: "right"}}> <CIcon name="cil-star"/> 4.5</span>
                        <h5>{this.props.prenda.vendedor}</h5>
                        <h4>{this.props.prenda.nombre}</h4>
                        <h6>Talla: {this.props.prenda.talla}</h6>
                        <h6>S/ {this.props.prenda.precio}</h6>
                        <h6>Detalles: {this.props.prenda.detalles !== "" ? "Si" : "No"}</h6>
                        </CCol>
                    </CCardBody>
                </CCard>
            </Link>
    )
  }
}
