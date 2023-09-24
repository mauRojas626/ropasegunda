import { CCol, CTabs, CNav, CNavItem, CNavLink, CTabContent, CTabPane, CRow, CCard, CCardHeader, CButton, CCollapse, CCardBody, CBadge, CModalBody, CFormGroup,
CLabel, CInput, CModalFooter, CModal, CModalHeader, CModalTitle, CTextarea } from '@coreui/react';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PrendasCardHorizontal from './PrendaCardHorizontal';

export default class Comprados extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapse: 0,
            calificar: false
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
                                                        className="text-left m-0 p-0" 
                                                        onClick={() => this.setState({collapse: this.state.collapse === 0 ? null : 0})}
                                                    >
                                                        <CRow className="m-auto" style={{ justifyContent: 'space-around'}}>
                                                            <span>Ocasi.on </span>    
                                                            <span> 1 prenda</span>   
                                                            <span>Pedir envío antes de: 20/10/23</span>
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
                                        <CCollapse show={this.state.collapse === 0}>
                                            <CCardBody>
                                                <PrendasCardHorizontal prenda={prenda}></PrendasCardHorizontal>
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
                                                            <span>Ocasi.on </span>    
                                                            <span> 2 prendas</span>   
                                                            <span>Fecha máxima de confimación: 27/09/23</span>
                                                        </CRow>
                                                    </CButton>
                                                </CCol>
                                                <CCol md="2">       
                                                        <CButton color='dark' size='sm' disabled>
                                                            validando pago
                                                        </CButton>
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
                                    <h3>Pendiente pago envío</h3>
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
                                                        <CRow className="m-auto" style={{ justifyContent: 'space-around'}}>
                                                            <span>Ocasi.on </span>    
                                                            <span> 1 prenda</span>   
                                                            <span>Precio envío: S/10</span>
                                                        </CRow>
                                                    </CButton>
                                                </CCol>
                                                <CCol md="2">   
                                                        <CButton color='primary'>
                                                            Pagar envío
                                                        </CButton>
                                                </CCol>
                                            </CRow>
                                        </CCardHeader>
                                        <CCollapse show={this.state.collapse === 0}>
                                            <CCardBody>
                                                <PrendasCardHorizontal modo="pe" prenda={prenda}></PrendasCardHorizontal>
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
                                                            <span>Precio envío: S/10</span>
                                                        </CRow>
                                                    </CButton>
                                                </CCol>
                                                <CCol md="2">
                                                    <Link className="link" to={{pathname: "./Entrega", state: {prenda: prenda}}}>
                                                        <CButton color='primary'>
                                                            Pagar envío
                                                        </CButton>
                                                    </Link>
                                                </CCol>
                                            </CRow>
                                        </CCardHeader>
                                        <CCollapse show={this.state.collapse === 1}>
                                            <CCardBody>
                                                <PrendasCardHorizontal modo="pe" prenda={prenda}></PrendasCardHorizontal>
                                                <PrendasCardHorizontal modo="pe" prenda={prenda}></PrendasCardHorizontal>
                                            </CCardBody>
                                        </CCollapse>
                                    </CCard>
                                </CCol>
                            </CTabPane>
                            <CTabPane>
                            <CCol xs="12" md="11" className="m-3">
                                    <h3>Envíos</h3>
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
                                                            <span>Fecha estimada: 29/09/23</span>  
                                                            <span>Estado: <CBadge shape="pill" color="dark">En camino</CBadge></span>
                                                            
                                                        </CRow>
                                                    </CButton>
                                                </CCol>
                                                <CCol md="2">
                                                    <Link className="link" to={{pathname: "/comprados", state: {prenda: prenda}}}>
                                                        <CButton color='primary' size='sm'>
                                                            Reportar
                                                        </CButton>
                                                    </Link>
                                                </CCol>
                                            </CRow>
                                        </CCardHeader>
                                        <CCollapse show={this.state.collapse === 1}>
                                            <CCardBody>
                                                <PrendasCardHorizontal modo="pe" prenda={prenda}></PrendasCardHorizontal>
                                                <PrendasCardHorizontal modo="pe" prenda={prenda}></PrendasCardHorizontal>
                                            </CCardBody>
                                        </CCollapse>
                                    </CCard>
                            </CCol>
                            </CTabPane>
                            <CTabPane>
                            <CCol xs="12" md="11" className="m-3">
                                    <h3>Historial</h3>
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
                                                            <span>Fecha de compra: 29/09/23</span>  
                                                            <span>Fecha de envío: 02/10/23</span>
                                                        </CRow>
                                                    </CButton>
                                                </CCol>
                                                <CCol md="2">
                                                    <CButton color='primary' size='sm' onClick={() => this.setState({calificar: true})}>
                                                        Calificar vendedor
                                                    </CButton>
                                                </CCol>
                                            </CRow>
                                        </CCardHeader>
                                        <CCollapse show={this.state.collapse === 1}>
                                            <CCardBody>
                                                <PrendasCardHorizontal modo="pe" prenda={prenda}></PrendasCardHorizontal>
                                                <PrendasCardHorizontal modo="pe" prenda={prenda}></PrendasCardHorizontal>
                                            </CCardBody>
                                        </CCollapse>
                                    </CCard>
                            </CCol>
                            </CTabPane>
                        </CTabContent>
                    </CTabs>
                    <CModal 
                        show={this.state.calificar}
                        onClose={() => this.setState({calificar: !this.state.calificar})}
                        size="md"
                    >
                        <CModalHeader closeButton>
                        <CModalTitle>Calificar vendedor</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <CFormGroup>
                                <CLabel type='number'>Del 1 al 5 ¿cómo calificas tu experiencia?</CLabel>
                                <CInput id="calificacion" placeholder="indica el número" required />
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel type='texts'>Deja un breve comentario sobre tu experiencia</CLabel>
                                <CTextarea 
                                name="cometario" 
                                id="comentario" 
                                rows="4"
                                placeholder="Cuéntanos" 
                                />
                            </CFormGroup>
                        </CModalBody>
                        <CModalFooter>
                        <CButton color="primary" onClick={() => this.setState({calificar: !this.state.calificar})}>Enviar</CButton>
                        </CModalFooter>
                    </CModal>
            </CCol>

        )
    }
}