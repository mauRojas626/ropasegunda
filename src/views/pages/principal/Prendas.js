import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton, CInput, CCollapse, CInputCheckbox, CLabel, CFormGroup } from '@coreui/react';
import React, { Component } from 'react'
import PrendaCard from './PrendaCard';
import CIcon from '@coreui/icons-react';


export default class Prendas extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapse: 0
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
            <CRow>
                <CCol sm="3">
                    <CCard>
                        <CCardHeader>
                            <strong>Filtros</strong>
                        </CCardHeader>
                        <CCardBody className="p-0">
                            <CCard className="mb-0">
                                <CCardHeader>
                                    <CButton 
                                        block
                                        className="text-left m-0 p-0" 
                                        onClick={() => this.setState({collapse: this.state.collapse === 0 ? null : 0})}
                                    >
                                        <CIcon name='cil-chevron-bottom' className="float-right"></CIcon>
                                        Categoría
                                    </CButton>
                                </CCardHeader>
                                <CCollapse show={this.state.collapse === 0}>
                                    <CCardBody>
                                        <CRow className="g-0">
                                            <CCol className="m-0">
                                                <CInput size='sm'></CInput>
                                                <CFormGroup variant="checkbox" className="checkbox">
                                                    <CInputCheckbox 
                                                        id="checkbox1" 
                                                        name="checkbox1" 
                                                        value="option1" 
                                                    />
                                                    <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">Polo</CLabel>
                                                    </CFormGroup>
                                                    <CFormGroup variant="checkbox" className="checkbox">
                                                    <CInputCheckbox id="checkbox2" name="checkbox2" value="option2" />
                                                    <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox2">Casaca</CLabel>
                                                    </CFormGroup>
                                                    <CFormGroup variant="checkbox" className="checkbox">
                                                    <CInputCheckbox id="checkbox3" name="checkbox3" value="option3" />
                                                    <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox3">Vestido</CLabel>
                                                </CFormGroup>
                                            </CCol>
                                        </CRow>
                                    </CCardBody>
                                </CCollapse>
                            </CCard>
                            <CCard className="mb-0">
                                <CCardHeader>
                                    <CButton 
                                        block
                                        className="text-left m-0 p-0" 
                                        onClick={() => this.setState({collapse: this.state.collapse === 1 ? null : 1})}
                                    >
                                    <CIcon name='cil-chevron-bottom' className="float-right"></CIcon>
                                    Precio
                                    </CButton>
                                </CCardHeader>
                                <CCollapse show={this.state.collapse === 1}>
                                    <CCardBody>
                                        <CRow className="g-0 inline ">
                                            <CCol>
                                                <CInput size='sm' placeholder='Min' ></CInput>
                                            </CCol> {" - "}
                                            <CCol>
                                                <CInput size='sm' placeholder='Max' ></CInput>
                                            </CCol> 
                                        </CRow>
                                    </CCardBody>
                                </CCollapse>
                            </CCard>
                            <CCard className="mb-0">
                                <CCardHeader>
                                    <CButton 
                                        block
                                        className="text-left m-0 p-0" 
                                        onClick={() => this.setState({collapse: this.state.collapse === 2 ? null : 2})}
                                    >
                                    <CIcon name='cil-chevron-bottom' className="float-right"></CIcon>
                                    Nota vendedor
                                    </CButton>
                                </CCardHeader>
                                <CCollapse show={this.state.collapse === 2}>
                                    <CCardBody>
                                        <CRow className="g-0 inline ">
                                            <CCol>
                                                <CFormGroup variant="checkbox" className="checkbox">
                                                <CInputCheckbox 
                                                    id="checkbox1" 
                                                    name="checkbox1" 
                                                    value="option1" 
                                                />
                                                <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">5 estrellas</CLabel>
                                                </CFormGroup>
                                                <CFormGroup variant="checkbox" className="checkbox">
                                                <CInputCheckbox id="checkbox2" name="checkbox2" value="option2" />
                                                <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox2">4 estrellas</CLabel>
                                                </CFormGroup>
                                                <CFormGroup variant="checkbox" className="checkbox">
                                                <CInputCheckbox id="checkbox3" name="checkbox3" value="option3" />
                                                <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox3">3 estrellas</CLabel>
                                                </CFormGroup>
                                                <CFormGroup variant="checkbox" className="checkbox">
                                                <CInputCheckbox id="checkbox3" name="checkbox3" value="option3" />
                                                <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox3">2 estrellas</CLabel>
                                                </CFormGroup>
                                                <CFormGroup variant="checkbox" className="checkbox">
                                                <CInputCheckbox id="checkbox3" name="checkbox3" value="option3" />
                                                <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox3">1 estrella</CLabel>
                                                </CFormGroup>
                                            </CCol>
                                        </CRow>
                                    </CCardBody>
                                </CCollapse>
                            </CCard>
                            <CCard className="mb-0">
                                <CCardHeader>
                                    <CButton 
                                        block
                                        className="text-left m-0 p-0" 
                                        onClick={() => this.setState({collapse: this.state.collapse === 3 ? null : 3})}
                                    >
                                    <CIcon name='cil-chevron-bottom' className="float-right"></CIcon>
                                    Medidas
                                    </CButton>
                                </CCardHeader>
                                <CCollapse show={this.state.collapse === 3}>
                                    <CCardBody>
                                        <span>Busto</span>
                                        <CRow className="g-0 inline ">
                                            <CCol>
                                                <CInput size='sm' placeholder='Min' ></CInput>
                                            </CCol> {" - "}
                                            <CCol>
                                                <CInput size='sm' placeholder='Max' ></CInput>
                                            </CCol> 
                                        </CRow>
                                        <span>Cadera</span>
                                        <CRow className="g-0 inline ">
                                            <CCol>
                                                <CInput size='sm' placeholder='Min' ></CInput>
                                            </CCol> {" - "}
                                            <CCol>
                                                <CInput size='sm' placeholder='Max' ></CInput>
                                            </CCol> 
                                        </CRow>
                                        <span>Cintura</span>
                                        <CRow className="g-0 inline ">
                                            <CCol>
                                                <CInput size='sm' placeholder='Min' ></CInput>
                                            </CCol> {" - "}
                                            <CCol>
                                                <CInput size='sm' placeholder='Max' ></CInput>
                                            </CCol> 
                                        </CRow>
                                    </CCardBody>
                                </CCollapse>
                            </CCard>
                            <CCard className="mb-0">
                                <CCardHeader>
                                    <CButton 
                                        block
                                        className="text-left m-0 p-0" 
                                        onClick={() => this.setState({collapse: this.state.collapse === 4 ? null : 4})}
                                    >
                                    <CIcon name='cil-chevron-bottom' className="float-right"></CIcon>
                                    Detalles
                                    </CButton>
                                </CCardHeader>
                                <CCollapse show={this.state.collapse === 4}>
                                    <CCardBody>
                                        <CRow className="g-0 inline ">
                                            <CCol>
                                                <CFormGroup variant="checkbox" className="checkbox">
                                                <CInputCheckbox 
                                                    id="checkbox1" 
                                                    name="checkbox1" 
                                                    value="option1" 
                                                />
                                                <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">Si</CLabel>
                                                </CFormGroup>
                                                <CFormGroup variant="checkbox" className="checkbox">
                                                <CInputCheckbox id="checkbox2" name="checkbox2" value="option2" />
                                                <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox2">No</CLabel>
                                                </CFormGroup>
                                            </CCol>
                                        </CRow>
                                    </CCardBody>
                                </CCollapse>
                            </CCard>
                            <CCard className="mb-0">
                                <CCardHeader>
                                    <CButton 
                                        block
                                        className="text-left m-0 p-0" 
                                        onClick={() => this.setState({collapse: this.state.collapse === 5 ? null : 5})}
                                    >
                                    <CIcon name='cil-chevron-bottom' className="float-right"></CIcon>
                                    Sexo
                                    </CButton>
                                </CCardHeader>
                                <CCollapse show={this.state.collapse === 5}>
                                    <CCardBody>
                                        <CRow className="g-0 inline ">
                                            <CCol>
                                                <CFormGroup variant="checkbox" className="checkbox">
                                                <CInputCheckbox 
                                                    id="checkbox1" 
                                                    name="checkbox1" 
                                                    value="option1" 
                                                />
                                                <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">Hombre</CLabel>
                                                </CFormGroup>
                                                <CFormGroup variant="checkbox" className="checkbox">
                                                <CInputCheckbox id="checkbox2" name="checkbox2" value="option2" />
                                                <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox2">Mujer</CLabel>
                                                </CFormGroup>
                                            </CCol>
                                        </CRow>
                                    </CCardBody>
                                </CCollapse>
                            </CCard>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol xs="12" sm="9" className="m-auto">
                    <CRow xs="6" md="12">
                        { prendaData.map(prenda => 
                            <CCol xs="12" sm="6" md="4" className="mb-3">
                                <PrendaCard onClick={this.onClick} key={prenda.id} prenda={prenda}></PrendaCard>
                            </CCol>
                        ) }
                    </CRow>
                </CCol>
            </CRow>
            
        )
    }
}