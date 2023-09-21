import { CRow, CCol, CFormGroup, CLabel, CInput, CSelect, CInputFile, CButton, CInputGroup, CInputGroupPrepend, CInputGroupText } from '@coreui/react'
import React, { Component } from 'react'

export default class InformacionUsuario extends Component {
  render() {
    return (
      <>
        
        <CRow className="m-auto">
            <CCol md="6" className="mb-4">
                <h3>Datos Personales</h3>
                <CFormGroup className="mt-4">
                    <CLabel htmlFor="name">Nombre</CLabel>
                    <CInput id="nombre" placeholder="Ingrese su nombre" required />
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="lastname">Apellido</CLabel>
                    <CInput id="apellido" placeholder="Ingrese su apellido" required />
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="email">Correo Electrónico</CLabel>
                    <CInput id="email" placeholder="Ingrese su correo" required />
                </CFormGroup>
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
                    <CLabel>Buscas prendas para</CLabel>
                    <CSelect custom name="gender" id="gender">
                    <option value="1">Hombre</option>
                    <option value="2">Mujer</option>
                    </CSelect>
                </CFormGroup>
                <CFormGroup>
                    <CLabel type='number'>Celular</CLabel>
                    <CInput id="celular" placeholder="Ingrese su celular" required />
                </CFormGroup>
                <CFormGroup>
                    <CLabel type='number'>Documento de identificación</CLabel>
                    <CInputGroup>
                    <CInputGroupPrepend>
                        <CSelect custom name="doc" id="doc">
                        <option value="1">DNI</option>
                        <option value="2">CE</option>
                        </CSelect>
                    </CInputGroupPrepend>
                    <CInput type="email" id="username3" name="username3" autoComplete="name"/>
                  </CInputGroup>
                </CFormGroup>
            </CCol>
            <CCol md="6" className="mb-4">
                <h3>Medidas</h3>
                <CFormGroup className="mt-4">
                    <CLabel type='number'>Cintura (cm)</CLabel>
                    <CInput id="cintura" placeholder="Ingrese su medida de cintura" required />
                </CFormGroup>
                <CFormGroup>
                    <CLabel type='number'>Busto (cm)</CLabel>
                    <CInput id="busto" placeholder="Ingrese su medida de busto" required />
                </CFormGroup>
                <CFormGroup className="mb-5">
                    <CLabel type='number'>Cadera (cm)</CLabel>
                    <CInput id="cadera" placeholder="Ingrese su medida de cadera" required />
                </CFormGroup>
                <h3>Datos de Venta</h3>
                <CFormGroup className="mt-4">
                    <CLabel type='text'>Empresa de delivery a domicilio utilizada</CLabel>
                    <CInput id="delivery" placeholder="Ingrese su empresa de delivery a domicilio" required />
                </CFormGroup>
                <CFormGroup>
                    <CLabel type='text'>Empresa de delivery con recojo en agencia utilizada</CLabel>
                    <CInput id="agencia" placeholder="Ingrese su empresa de delivery en agencia" required />
                </CFormGroup>
                <CFormGroup>
                  <CLabel>QR yape</CLabel>
                  <CCol>
                    <CInputFile accept='image/*' custom id="yape"/>
                    <CLabel htmlFor="custom-file-input" variant="custom-file">
                      Elige archivo...
                    </CLabel>
                  </CCol>
                </CFormGroup>
                <CFormGroup>
                  <CLabel>QR plin</CLabel>
                  <CCol>
                    <CInputFile accept='image/*' custom id="plin"/>
                    <CLabel htmlFor="custom-file-input" variant="custom-file">
                      Elige archivo...
                    </CLabel>
                  </CCol>
                </CFormGroup>
            </CCol>
        </CRow>
        <CRow className="mb-4">
            <CCol md="3" className="m-auto">
                <CButton block color='primary'>
                    Actualizar
                </CButton>
            </CCol>
        </CRow>
      </>
    )
  }
}
