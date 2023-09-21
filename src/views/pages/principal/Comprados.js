import { CCol, CTabs, CNav, CNavItem, CNavLink, CTabContent, CTabPane, CRow, CCard, CCardHeader, CButton, CCollapse, CCardBody } from '@coreui/react';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PrendasCardHorizontal from './PrendaCardHorizontal';

export default class Comprados extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapse: 0, 
        }
    }

    render() {

        const prenda = {id: 0, nombre: "Saco Zara", precio: 45, talla: "S", color: "Rojo", detalles: "Tiene un descosido en la parte de atrás", marca: "Zara", sexo: 0, categoría: "saco", material: "tela", fotos: [{link: "https://http2.mlstatic.com/D_NQ_NP_720832-MPE48261251804_112021-O.webp"}, {link: "https://www.panoramaweb.com.mx/u/fotografias/m/2022/8/2/f850x638-33802_111291_5050.jpg"}], fechaPublicacion: "", vendedor: "Ocasi.on"}
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
                                    <CCard className="mb-0">
                                        <CCardHeader>
                                            <CRow>
                                                <CCol md="10">
                                                    <CButton 
                                                        block 
                                                        color="link" 
                                                        className="text-left m-0 p-0" 
                                                        onClick={() => this.setState({collapse: this.state.collapse === 0 ? null : 0})}
                                                    >
                                                        <h5>Ocasi.on</h5>
                                                    </CButton>
                                                </CCol>
                                                <CCol md="2">
                                                    <CButton color='primary'>
                                                        Pedir envío
                                                    </CButton>
                                                </CCol>
                                            </CRow>
                                        </CCardHeader>
                                        <CCollapse show={this.state.collapse === 0}>
                                            <CCardBody>
                                                1. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non
                                                cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
                                                on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
                                                nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                                beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven''t heard of them accusamus labore sustainable VHS.
                                            </CCardBody>
                                        </CCollapse>
                                    </CCard>
                                    <CCard className="mb-0">
                                        <CCardHeader>
                                            <CRow>
                                                <CCol md="10">
                                                    <CButton 
                                                        block 
                                                        color="link" 
                                                        className="text-left m-0 p-0" 
                                                        onClick={() => this.setState({collapse: this.state.collapse === 1 ? null : 1})}
                                                    >
                                                        <CRow className="m-auto" style={{ justifyContent: 'space-around'}}>
                                                            <span>Ocasi.on </span>    
                                                            <span> 2 prendas</span>   
                                                            <span>Pedir envío antes de: 01/02/22</span>
                                                        </CRow>
                                                    </CButton>
                                                </CCol>
                                                <CCol md="2">
                                                    <Link className="link" to={{pathname: "./Entrega", state: {prenda: prenda}}}>
                                                        <CButton color='primary'>
                                                            Pedir envío
                                                        </CButton>
                                                    </Link>
                                                </CCol>
                                            </CRow>
                                        </CCardHeader>
                                        <CCollapse show={this.state.collapse === 1}>
                                            <CCardBody>
                                                <PrendasCardHorizontal prenda={prenda}></PrendasCardHorizontal>
                                                <PrendasCardHorizontal prenda={prenda}></PrendasCardHorizontal>
                                            </CCardBody>
                                        </CCollapse>
                                    </CCard>
                                </CCol>
                            </CTabPane>
                            <CTabPane>
                                <CCol xs="12" md="11" className="m-3">
                                    <h3>Preguntas realizadas</h3>
                                </CCol>
                            </CTabPane>
                            <CTabPane>
                            <CCol xs="12" md="11" className="m-3">
                                <CRow>
                                    <h3>Comentarios</h3>
                                </CRow>
                            </CCol>
                            </CTabPane>
                        </CTabContent>
                    </CTabs>
            </CCol>

        )
    }
}