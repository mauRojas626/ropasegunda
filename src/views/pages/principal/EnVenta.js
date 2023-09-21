import { CButton, CTabPane, CCol, CRow, CNavItem, CNavLink, CTabContent, CTabs, CNav, CCard, CSelect, CCardHeader, CCollapse, CCardBody } from '@coreui/react'
import React, { Component } from 'react'
import PrendasCardHorizontal from './PrendaCardHorizontal';
import { Link } from 'react-router-dom';

export default class EnVenta extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapse: 0, 
        }
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
        <CButton className="m-3" color='primary'>Nueva prenda</CButton>
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
                        <h3>Pendientes</h3>
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
                <CTabPane>
                    <CCol xs="12" md="11" className="m-3">
                        <h3>Preguntas realizadas</h3>
                        <CRow>   
                            {prendaData.map(prenda => (
                                <CCol md="6">
                                    <CCard>
                                        <PrendasCardHorizontal prenda={prenda} modo={"enventa"} edit={true}/>
                                    </CCard>
                                </CCol>
                            ))}  
                        </CRow>
                    </CCol>
                </CTabPane>
                <CTabPane>
                <CCol xs="12" md="11" className="m-3">
                    <CRow>
                        <CCol md="2">
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
                            </CSelect>
                        </CCol>
                        <CCol md="2">
                            <span>Tipo de entrega</span>
                        </CCol>
                        <CCol md="3">
                            <CSelect>
                            <option value="1">A domicilio</option>
                            <option value="2">Recojo en Agente</option>
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
                                        color="link" 
                                        className="text-left m-0 p-0" 
                                        onClick={() => this.setState({collapse: this.state.collapse === 0 ? null : 0})}
                                    >
                                        <h5>Cliente</h5>
                                    </CButton>
                                </CCol>
                                <CCol md="2">
                                    <CButton color='primary'>
                                        Enviado
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
                                    <Link className="link" to={{pathname: "/login", state: {prenda: prendaData[0]}}}>
                                        <CButton color='primary'>
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
                                    <PrendasCardHorizontal prenda={prendaData[0]}></PrendasCardHorizontal>
                                    </CCol>
                                    <CCol className="m-0">
                                    <PrendasCardHorizontal prenda={prendaData[0]}></PrendasCardHorizontal>
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
        </>
    )
  }
}
