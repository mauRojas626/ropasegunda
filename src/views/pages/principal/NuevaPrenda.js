import { CRow, CCol, CInput, CFormGroup, CLabel, CInputGroup, CInputGroupPrepend, CInputGroupText, CSelect, CInputFile } from '@coreui/react'
import React, { Component } from 'react'

export default class NuevaPrenda extends Component {
    onChange = (e) => {
        console.log(e.target)
    }
    render() {
    
    return (
        <CCol>
            <CRow>
                <CCol md="6">
                    <CFormGroup className="mt-3">
                        <CLabel type='text'>nombre</CLabel>
                        <CInput id="name" placeholder="Ingrese el nombre de la prenda" required />
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel type='text'>Color</CLabel>
                        <CInput id="color" placeholder="Ingrese el color" required />
                    </CFormGroup>
                    <span>Medidas</span>
                    <CCol md="12">
                        <CInputGroup className="m-2">
                            <CInputGroupPrepend>
                                <CInputGroupText>
                                    cintura (cm)
                                </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput id="cintura" name="cintura" placeholder="cm" />
                        </CInputGroup>
                        <CInputGroup className="m-2">
                            <CInputGroupPrepend>
                                <CInputGroupText>
                                    busto (cm)
                                </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput id="busto" name="busto" placeholder="cm" />
                        </CInputGroup>
                        <CInputGroup className="m-2">
                            <CInputGroupPrepend>
                                <CInputGroupText>
                                    cadera (cm)
                                </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput id="cadera" name="cadera" placeholder="cm" />
                        </CInputGroup>
                        <CInputGroup className="m-2">
                            <CInputGroupPrepend>
                                <CInputGroupText>
                                    largo (cm)
                                </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput id="largo" name="largo" placeholder="cm" />
                        </CInputGroup>
                        <CInputGroup className="m-2">
                            <CInputGroupPrepend>
                                <CInputGroupText>
                                    largo mangas (cm)
                                </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput id="mangas" name="margas" placeholder="cm" />
                        </CInputGroup>
                        <CInputGroup className="m-2">
                            <CInputGroupPrepend>
                                <CInputGroupText>
                                    hombro a hombro (cm)
                                </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput id="hombro" name="hombro" placeholder="cm" />
                        </CInputGroup>
                    </CCol>
                </CCol>
                <CCol md="6">
                    <CFormGroup className="mt-3">
                        <CLabel type='number'>Precio</CLabel>
                        <CInput id="precio" placeholder="Ingrese el precio de la prenda" required />
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel>Categoría</CLabel>
                        <CSelect custom name="categoria" id="categoria">
                        <option value="1">Saco</option>
                        <option value="2">Polo</option>
                        <option value="3">Pantalón</option>
                        <option value="4">Casaca</option>
                        <option value="5">Polera</option>
                        <option value="6">Top</option>
                        <option value="7">Vestido</option>
                        <option value="8">Blusa</option>
                        <option value="9">Accesorios</option>
                        <option value="10">Otros</option>
                        </CSelect>
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel type='text'>Marca</CLabel>
                        <CInput id="marca" placeholder="Ingrese la marca de la prenda" required />
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel type='text'>Material</CLabel>
                        <CInput id="material" placeholder="Ingrese el material de la prenda" required />
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel type='text'>Detalles</CLabel>
                        <CInput id="detalle" placeholder="Ingrese los detalles de la prenda" required />
                    </CFormGroup>
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <span>fotos</span>
                    <CFormGroup row>
                        <CCol xs="12" md="9">
                            <CInputFile 
                            id="fotos" 
                            name="fotos" 
                            accept='image/*'
                            multiple
                            custom
                            onChange={this.onChange}
                            />
                            <CLabel  htmlFor="fotos" variant="custom-file">
                            Selecciona las fotos
                            </CLabel>
                        </CCol>
                    </CFormGroup>
                </CCol>
            </CRow>
        </CCol>
    )
  }
}
