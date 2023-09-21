import React, { Component } from 'react'
import { CButton, CCol, CCard, CRow, CFormGroup, CLabel, CInput, CSelect } from '@coreui/react';

export default class SolicitudEnvio extends Component {
    constructor(props){
        super(props);
        this.state = {
            agencia: true 
        }
    }

    onClick = () => {
        this.setState({agencia: !this.state.agencia})
    }

    render() {
        return (
            <>
            <h2>Entrega</h2>
            <CRow>
                <CCol sm="12" md="6" className="mt-4">
                    <h4>Pedido</h4>
                    <CCard>
                        <CCol className="m-3">
                            <h5>Vendedor: Ocasi.on</h5>
                            <h5>Número de prendas: 2</h5>
                            <h5>Último día para pedir envío: 09/12/23</h5>
                        </CCol>
                    </CCard>
                    <h4>Elija su medio de pago</h4>
                    <CRow>
                        <CCol>
                            <CButton size='lg' onClick={this.onClick} block color='primary' disabled={!this.state.agencia}>A domicilio</CButton>
                        </CCol>
                        <CCol>
                            <CButton size='lg' onClick={this.onClick} block color='primary' disabled={this.state.agencia}>Recojo en agencia</CButton>
                        </CCol>
                    </CRow>  
                </CCol>
                <CCol sm="12" md="6" className="mt-4 mb-4">
                    <h4>Ingrese la dirección del lugar de entrega:</h4>
                    <CRow className="m-auto">
                        <CCol xs="12" md="10">
                            <CFormGroup>
                                <CLabel htmlFor="address">Dirección</CLabel>
                                <CInput id="address" placeholder="Ingrese su dirección" required />
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>Departamento</CLabel>
                                <CSelect custom name="departamento" id="department">
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
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>Provincia</CLabel>
                                <CSelect custom name="provincia" id="provincia">
                                <option value="1">Lima</option>
                                <option value="2">Huaral</option>
                                <option value="3">Barranca</option>
                                <option value="4">Cajatambo</option>
                                <option value="5">Canta</option>
                                <option value="6">Cañete</option>
                                <option value="7">Huarochirí</option>
                                <option value="8">Huaura</option>
                                <option value="9">Oyón</option>
                                <option value="10">Yauyos</option>
                                </CSelect>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel htmlFor="district">Distrito</CLabel>
                                <CInput id="distrito" placeholder="Ingrese su distrito" required />
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel type='number'>Celular</CLabel>
                                <CInput id="celular" placeholder="Ingrese su celular" required />
                            </CFormGroup>
                            <CButton block color='primary'>
                                Confirmar
                            </CButton>
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>
            </>
        )
    }
}
