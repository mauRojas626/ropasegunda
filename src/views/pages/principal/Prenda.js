import { CButton, CCard, CNav, CTabs, CCol, CImg, CRow, CNavItem,CNavLink, CTabContent, CTabPane, CDataTable, CInput, CInputGroupAppend, CInputGroup, CSelect } from '@coreui/react';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PrendaCard from './PrendaCard';
import CIcon from '@coreui/icons-react';

export default class Prenda extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageShow: this.props.location.state.prenda.fotos[0].link
        }
    }

    onClickImg = (e) => {
        this.setState({imageShow: e.target.src})
    }

    render() {
        const prenda2 = {id: 2, nombre: "Polera H&M", precio: 10, talla: "XS", color: "Azul", detalles: "No", marca: "H&M", sexo: 1, categoría: "polo", material: "algodón", fotos: [{link: "https://hmperu.vtexassets.com/arquivos/ids/3685306/Casaca-polar-con-capucha---Negro---H-M-PE.jpg?v=1778013864"}, {link: "https://www.panoramaweb.com.mx/u/fotografias/m/2022/8/2/f850x638-33802_111291_5050.jpg"}], fechaPublicacion: "", vendedor: "Ocasi.on"}
        const fields = ['Tipo', 'Medida']
        const medidaData = [{ Tipo: 'Cadera', Medida: 80 }, { Tipo: 'Cintura', Medida: 75 }, { Tipo: 'Busto', Medida: 79 }, { Tipo: 'Largo Prenda', Medida: 65 }, { Tipo: 'Largo Manga', Medida: 60 }]
        return (
            <>
            <CRow>
                <CCol xs="12" sm="8" className="m-auto">
                    <CRow>
                        <CCol xs="12" sm="2" className="align-items-start">
                            {this.props.location.state.prenda.fotos.map(foto => (<CImg onClick={(e) => this.onClickImg(e)} fluid className="otras" rounded src={foto.link} ></CImg>))}
                        </CCol>
                        <CCol xs="12" sm="10" className="m-auto">
                            <CImg fluid className="princi" rounded src={this.state.imageShow} ></CImg>
                        </CCol>
                    </CRow>
                </CCol>
                <CCol xs="12" sm="4">
                    <CCard className="p-4 w-100">
                        <CCol>
                            <span>{this.props.location.state.prenda.vendedor}</span>
                            <span style={{float: "right"}}> <CIcon name="cil-star"/> 4.5</span>
                            <h4>{this.props.location.state.prenda.nombre}</h4>
                            <h6>Talla: {this.props.location.state.prenda.talla}</h6>
                            <h6>S/ {this.props.location.state.prenda.precio}</h6>
                            <h6>Color: {this.props.location.state.prenda.color}</h6>
                            <h6>Marca: {this.props.location.state.prenda.marca}</h6>
                            <h6>Material: {this.props.location.state.prenda.material}</h6>
                            <h6>Detalles: {this.props.location.state.prenda.detalles}</h6>
                            <br/>
                            <Link className="link" to={{pathname: "./Pago", state: {prenda: this.props.location.state.prenda}}}>
                                <CButton block color="primary">
                                    Comprar
                                </CButton>
                            </Link>
                        </CCol>
                    </CCard>
                    
                </CCol>
            </CRow>
            <CRow className="mt-4">
                <CCol  xs="12" sm="8" className="m-top">
                    <CCard className="p-4 w-100">
                    <CTabs>
                        <CNav variant="tabs">
                            <CNavItem>
                                <CNavLink>
                                    Especificaciones de la Prendas
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink>
                                    Preguntas
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink>
                                    Comentarios
                                </CNavLink>
                            </CNavItem>
                        </CNav>
                        <CTabContent>
                            <CTabPane>
                                <CCol xs="12" md="11" className="m-3">
                                    <h3>Especificaciones</h3>

                                    <h6>Medidas (cm)</h6>
                                    <CDataTable
                                    items={medidaData}
                                    fields={fields}
                                    striped
                                    />
                                </CCol>
                            </CTabPane>
                            <CTabPane>
                                <CCol xs="12" md="11" className="m-3">
                                    <CRow md="10" className="mb-5"> 
                                        <h3>Pregúntale al vendedor</h3>
                                        <CInputGroup>
                                        <CInput type="text" id="input2-group2" name="input2-group2" placeholder="Hacer una pregunta" />
                                        <CInputGroupAppend>
                                            <CButton type="button" color="primary">Preguntar</CButton>
                                        </CInputGroupAppend>
                                        </CInputGroup>
                                    </CRow>
                                    
                                    <h3>Preguntas realizadas</h3>
                                    <div className='m-3'>
                                        <h5>¿hacen envíos a Piura?</h5>
                                        <span style={{"display":"inline-block", "margin-left": "40px" }}>  Hola, si hacemos envíos a todo el Perú</span>
                                    </div>
                                    <div className='m-3'>
                                        <h5>¿El saco es de tela?</h5>
                                        <span style={{"display":"inline-block", "margin-left": "40px" }}>Hola, el Saco es de tela fina y se puede lavar en lavadora</span>
                                    </div>
                                </CCol>
                            </CTabPane>
                            <CTabPane>
                            <CCol xs="12" md="11" className="m-3">
                                <CRow>
                                    <CCol xs="12" md="8">
                                        <h3>Comentarios</h3>
                                    </CCol>
                                    <CCol xs="12" md="4">
                                        <CSelect custom name="select" id="select">
                                        <option value="0">Más recientes</option>
                                        <option value="1">Más útiles</option>
                                        </CSelect>
                                    </CCol>
                                    <div className='m-3'>
                                        <h5 style={{"margin-left": "40px" }}><CIcon name="cil-star"/> 4.5</h5>
                                        <span > Me llegó el producto el día de entrega temprano. Muy bonito el polo que compré y estaba en muy buenas condiciones y lavado</span>
                                        <CButton  small color='primary' variant="ghost" style={{"float": "right" }}>¿es util?</CButton>
                                    </div>
                                </CRow>
                            </CCol>
                            </CTabPane>
                        </CTabContent>
                    </CTabs>
                    </CCard>
                </CCol>
                <CCol  xs="12" sm="4" className="m-top">
                    <PrendaCard prenda={prenda2} ></PrendaCard>
                </CCol>
            </CRow>
            </>
        )
    }
}
