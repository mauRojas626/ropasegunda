import React, { Component } from 'react'
import { CButton, CCol, CCard, CRow, CFormGroup, CLabel, CInput, CSelect, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as citiesActions from '../../../services/redux/actions/provincia'
import * as sellActions from '../../../services/redux/actions/venta'
import EnvioModel from 'src/services/models/EnvioModel';
import { Link } from 'react-router-dom';

class SolicitudEnvio extends Component {
    constructor(props){
        super(props);
        this.state = {
            agencia: true,
            departamento: [],
            provincia: [],
            selectDepartamento: 0,
            idProvincia: 0,
            direccion: "",
            distrito: "",
            telefono: "",
            error: {},
            modal: false
        }
    }

    async componentDidMount (){    
        await this.props.getCities()
        this.setState({departamento: this.props.departamento, provincia: this.props.provincia})
    }

    onClick = () => {
        this.setState({agencia: !this.state.agencia})
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = async () => {
        let error = {}
        if(this.state.direccion === ""){
            error.direccion = "Ingrese su dirección"
        }
        if(this.state.distrito === ""){
            error.distrito = "Ingrese su distrito"
        }
        if(this.state.telefono === "" || this.state.telefono.length !== 9 ){
            error.telefono = "Ingrese su celular"
        }
        if(this.state.idProvincia === 0){
            error.provincia = "Seleccione una provincia"
        }
        if (error.direccion || error.distrito || error.telefono || error.idProvincia){
            this.setState({error: error})
            console.log("error.direccion")
            console.log(error.direccion)
        } else {
            console.log("envio")
            let envio = new EnvioModel()
            envio.direccion = this.state.direccion + " " + this.state.distrito 
            envio.telefono = this.state.telefono
            envio.idProvincia = this.state.idProvincia
            envio.tipoEntrega = this.state.agencia ? 1 : 2
            envio.idVenta = this.props.location.state.sell[0].idVenta

            let sell = this.props.location.state.sell
            let ventas = []
            sell.forEach((element, index) => {
                ventas[index] = element.idVenta
            });
            envio.ventas = ventas
            await this.props.requestShipping(envio)
            this.setState({error: {}, modal: true})
        }   
    }

    render() {
        const errors = this.state.error
        console.log(errors)
        let provincia = this.state.provincia.filter(provincia => provincia.idDepartamento == this.state.selectDepartamento)
        return (
            <>
            <h2>Entrega</h2>
            <CRow>
                <CCol sm="12" md="6" className="mt-4">
                    <h4>Pedido</h4>
                    <CCard>
                        <CCol className="m-3">
                            <h5>Vendedor: {this.props.location.state.sell[0].idVendedor.nombre + " " + this.props.location.state.sell[0].idVendedor.apellido}</h5>
                            <h5>Número de prendas: {this.props.location.state.sell.length}</h5>
                            <h5>Último día para pedir envío: {new Date(this.props.location.state.sell.date.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0,10)}</h5>
                        </CCol>
                    </CCard>
                    <h4>Elija su tipo de envío</h4>
                    <CRow>
                        <CCol>
                            <CButton size='lg' onClick={this.onClick} block color={this.state.agencia ? "dark": "primary"} disabled={!this.state.agencia}>A domicilio</CButton>
                        </CCol>
                        <CCol>
                            <CButton size='lg' onClick={this.onClick} block color={!this.state.agencia ? "dark": "primary"} disabled={this.state.agencia}>Recojo en agencia</CButton>
                        </CCol>
                    </CRow>  
                </CCol>
                <CCol sm="12" md="6" className="mt-4 mb-4">
                    <h4>Ingrese la dirección del lugar de entrega:</h4>
                    <CRow className="m-auto">
                        <CCol xs="12" md="10">
                            <CFormGroup>
                                <CLabel htmlFor="address">Dirección</CLabel>
                                <CInput id="address" name='direccion' placeholder="Ingrese su dirección" required onChange={this.onChange} value={this.state.direccion}/>
                                <span style={{color: 'red'}}>{errors.direccion}</span>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>Departamento</CLabel>
                                <CSelect custom name="selectDepartamento" id="department" onChange={this.onChange} value={this.state.selectDepartamento}>
                                {this.state.departamento.map((departamento,index) => (
                                    <option key={index} value={departamento.idDepartamento}>{departamento.nombre}</option>
                                ))}
                                </CSelect>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>Provincia</CLabel>
                                <CSelect custom name="idProvincia" id="provincia" onChange={this.onChange} value={this.state.idProvincia}>
                                {provincia.map((provincia,index) => (
                                    <option key={index} value={provincia.idProvincia}>{provincia.nombre}</option>
                                ))}
                                </CSelect>
                                <span style={{color: 'red'}}>{errors.provincia}</span>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel htmlFor="district">Distrito</CLabel>
                                <CInput id="distrito" name='distrito' placeholder="Ingrese su distrito" required onChange={this.onChange} value={this.state.distrito}/>
                                <span style={{color: 'red'}}>{errors.distrito}</span>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel type='number'>Celular</CLabel>
                                <CInput id="celular" name='telefono' placeholder="Ingrese su celular" required onChange={this.onChange} value={this.state.telefono} />
                                <span style={{color: 'red'}}>{errors.telefono}</span>
                            </CFormGroup>
                                <CButton block color='primary' onClick={this.onSubmit}>
                                    Confirmar
                                </CButton>   
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>
            <CModal show={this.state.modal}>
                <CModalHeader closeButton>
                    <CModalTitle>Cotización Solicitada</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    Se ha solicitado la cotización de su envío. Se mostrará el monto a pagar en a sección de ropa comprada
                </CModalBody>
                <CModalFooter>
                    <Link to="/comprados">
                        <CButton color="primary" onClick={() => this.setState({modal: !this.state.modal})}>Aceptar</CButton>
                    </Link>
                </CModalFooter>
            </CModal>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        departamento: state.provincia.cities.departamento,
        provincia: state.provincia.cities.provincia
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(Object.assign({},citiesActions, sellActions), dispatch)
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SolicitudEnvio)
