import { CButton, CCard, CNav, CTabs, CCol, CRow, CNavItem,CNavLink, CTabContent, CTabPane, CDataTable, CInput, CInputGroupAppend, 
    CInputGroup, CCarouselInner, CCarousel, CCarouselControl, CCarouselItem, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle } from '@coreui/react';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PrendaCard from './PrendaCard';
import CIcon from '@coreui/icons-react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as consultaActions from '../../../services/redux/actions/consulta'
import * as prendaActions from '../../../services/redux/actions/prenda'



class Prenda extends Component {
    constructor(props){
        super(props);
        this.state = {
            pregunta: "",
            consultas: this.props.location.state.prenda.idConsulta,
            compra: false,
            modal: false
        }
    }

    preguntar = async () => {
        let consulta = { Pregunta: this.state.pregunta, idPrenda: this.props.location.state.prenda.idPrenda }
        await this.props.createQuestion(consulta)
        this.setState({pregunta: "", consultas: [...this.state.consultas, consulta]})
    }

    comprar = async () => {
        let res = await this.props.blockClothes(this.props.location.state.prenda.idPrenda)
        if(res.type === "BLOCK_CLOTHES"){
            this.setState({compra: true, modal: true})
        } else {
            this.setState({compra: false, modal: true})
        }
    }

    render() {
        const consultas = this.state.consultas
        const fields = ['Tipo', 'Medida']
        const medidaData = [{ Tipo: 'Cadera', Medida: this.props.location.state.prenda.idMedida.cadera || "-" }, 
            { Tipo: 'Cintura', Medida: this.props.location.state.prenda.idMedida.cintura || "-"  }, 
            { Tipo: 'Busto', Medida: this.props.location.state.prenda.idMedida.busto || "-" }, 
            { Tipo: 'Largo Prenda', Medida: this.props.location.state.prenda.idMedida.largoTotal || "-" }, 
            { Tipo: 'Largo Manga', Medida: this.props.location.state.prenda.idMedida.largoMangas || "-" }
        ]
        const comentarios = this.props.location.state.prenda.idVendedor.comentarios.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
        return (
            
            <>
            <CModal show={this.state.modal} onClose={() => this.setState({modal: false})} >
                <CModalHeader>
                    <CModalTitle>{this.state.compra ? "Comprar prenda" : "Prenda Vendida"}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {this.state.compra ? "Recuerde que solo tiene 3 minutos para realizar el pago de la prenda" : "La prenda ya ha sido vendida"}
                </CModalBody>
                <CModalFooter>
                    <Link className="link" to={{pathname: "./Pago", state: {prenda: this.props.location.state.prenda}}} >
                        <CButton color="primary" onClick={() => this.setState({modal: false})}>Aceptar</CButton>
                    </Link>
                </CModalFooter>
            </CModal>
            <CRow>
                <CCol xs="12" sm="8" className="m-auto">
                    <CRow className='m-auto'>
                        <CCarousel className='m-auto'>
                            <CCarouselInner>
                                {this.props.location.state.prenda.fotos.map((foto, index) =>
                                    <CCarouselItem key={index}>
                                        <img className="d-block w-100" src={foto.url} alt={"imagen " + index}/>
                                    </CCarouselItem>
                                )}
                                
                            </CCarouselInner>
                            <CCarouselControl direction="prev"/>
                            <CCarouselControl direction="next"/>
                        </CCarousel>
                    </CRow>
                </CCol>
                <CCol xs="12" sm="4">
                    <CCard className="p-4 w-100">
                        <CCol>
                            <span>{this.props.location.state.prenda.vendedor}</span>
                            <span style={{float: "right"}}> <CIcon name="cil-star"/> {" " + this.props.location.state.prenda.rating.toFixed(1)}</span>
                            <h4>{this.props.location.state.prenda.nombre}</h4>
                            <h6>Talla: {this.props.location.state.prenda.talla}</h6>
                            <h6>S/ {this.props.location.state.prenda.precio}</h6>
                            <h6>Color: {this.props.location.state.prenda.color}</h6>
                            <h6>Marca: {this.props.location.state.prenda.marca}</h6>
                            <h6>Material: {this.props.location.state.prenda.material}</h6>
                            <h6>Detalles: {this.props.location.state.prenda.detalle}</h6>
                            <br/>
                            <CButton block color="primary" onClick={this.comprar}>
                                Comprar
                            </CButton>
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
                                        <CInput type="text" id="input2-group2" name="input2-group2" placeholder="Hacer una pregunta" value={this.state.pregunta} onChange={(e) => this.setState({pregunta: e.target.value})}/>
                                        <CInputGroupAppend>
                                            <CButton type="button" color="primary" onClick={this.preguntar}>Preguntar</CButton>
                                        </CInputGroupAppend>
                                        </CInputGroup>
                                    </CRow>
                                    
                                    <h3>Preguntas realizadas</h3>
                                    {consultas.map((pregunta,index) => (
                                        <div className='m-3' key={index}>
                                            <h5>{pregunta.Pregunta}</h5>
                                            <span style={{"display":"inline-block", "marginLeft": "40px" }}>  {pregunta.Respuesta || "-"}</span>
                                        </div>
                                    ))}
                                </CCol>
                            </CTabPane>
                            <CTabPane>
                            <CCol xs="12" md="11" className="m-3">
                                <CRow>
                                    <CCol xs="12" md="12">
                                        <h3>Comentarios</h3>
                                    </CCol>
                                    {comentarios.map(comentario => (
                                        <CRow className='m-auto'>
                                            <CCol md="2" className='m-auto'>
                                                <h5><CIcon name="cil-star"/>{" " + comentario.calificacion.toFixed(1)}</h5>
                                            </CCol>
                                            <CCol md="10">
                                                <span > {comentario.texto}</span>
                                            </CCol>
                                            
                                        </CRow>
                                    ))}
                                </CRow>
                            </CCol>
                            </CTabPane>
                        </CTabContent>
                    </CTabs>
                    </CCard>
                </CCol>
                <CCol  xs="12" sm="4" className="m-top">
                    <PrendaCard prenda={this.props.location.state.prenda} ></PrendaCard>
                </CCol>
            </CRow>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
  }
  
const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(Object.assign({},consultaActions, prendaActions), dispatch)
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Prenda)