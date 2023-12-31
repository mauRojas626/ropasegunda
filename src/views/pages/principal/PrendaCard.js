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
                    <CCardImg orientation="top" src={this.props.prenda.fotos[0].url} />
                    <CCardBody>
                        <CCol>
                        <span style={{float: "right"}}> <CIcon name="cil-star"/>{" " + this.props.prenda.rating < 1 ? "" : this.props.prenda.rating.toFixed(1)}</span>
                        <h5>{this.props.prenda.idVendedor.nombre + " " + this.props.prenda.idVendedor.apellido}</h5>
                        <h4>{this.props.prenda.nombre}</h4>
                        <h6>Talla: {this.props.prenda.talla}</h6> 
                        <h6>Medidas: {this.props.prenda.idMedida.busto ? this.props.prenda.idMedida.busto : "-"} / {this.props.prenda.idMedida.cintura ? this.props.prenda.idMedida.cintura : "-"} / {this.props.prenda.idMedida.cadera ? this.props.prenda.idMedida.cadera : "-"}</h6>
                        <h6>S/ {this.props.prenda.precio}</h6>
                        <h6>Detalles: {this.props.prenda.detalle}</h6>
                        </CCol>
                    </CCardBody>
                </CCard>
            </Link>
    )
  }
}
