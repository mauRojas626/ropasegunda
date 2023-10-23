import { CRow, CCol, CFormGroup, CLabel, CInput, CSelect, CInputFile, CButton, CInputGroup, CInputGroupPrepend } from '@coreui/react'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as buyerActions from '../../../services/redux/actions/comprador'

class InformacionUsuario extends Component {
  constructor(props){
    super(props);
    this.state = {
        collapse: 0,
        isLoading: true,
        failed: false,
        usuario: [],
        tipoDoc: 1,
    }
  }
  
  
  async componentDidMount(){
    this.setState({usuario: this.props.user})
    if(this.props.user.dni.length === 8){
      this.setState({tipoDoc: 1})
    } else {
      this.setState({tipoDoc: 2})
    }

  }

  onchange = (key) => (e) => {
    switch (key) {
      case 'nombre':
        this.setState({usuario: {...this.state.usuario, nombre: e.target.value}})
        break;
      case 'apellido':
        this.setState({usuario: {...this.state.usuario, apellido: e.target.value}})
        break;
      case 'email':
        this.setState({usuario: {...this.state.usuario, correo: e.target.value}})
        break;
      case 'address':
        this.setState({usuario: {...this.state.usuario, direccion: e.target.value}})
        break;
      case 'celular':
        this.setState({usuario: {...this.state.usuario, celular: e.target.value}})
        break;
      case 'dni':
        this.setState({usuario: {...this.state.usuario, dni: e.target.value}})
        break;
      case 'ruc':
        this.setState({usuario: {...this.state.usuario, idVendedor: {...this.state.usuario.idVendedor, ruc: e.target.value}}})
        break;
      case 'delivery':
        this.setState({usuario: {...this.state.usuario, idVendedor: {...this.state.usuario.idVendedor, delivery: e.target.value}}})
        break;
      case 'agencia':
        this.setState({usuario: {...this.state.usuario, idVendedor: {...this.state.usuario.idVendedor, agencia: e.target.value}}})
        break;
      case 'cintura':
        this.setState({usuario: {...this.state.usuario, idMedida: {...this.state.usuario.idMedida, cintura: e.target.value}}})
        break;
      case 'busto':
        this.setState({usuario: {...this.state.usuario, idMedida: {...this.state.usuario.idMedida, busto: e.target.value}}})
        break;
      case 'cadera':
        this.setState({usuario: {...this.state.usuario, idMedida: {...this.state.usuario.idMedida, cadera: e.target.value}}})
        break;
      default:
        break;
    }
  }

  onchangeDoc = (e) => {
    this.setState({tipoDoc: e.target.value})
  }
  render() {
    return (
      <>
        
        <CRow className="m-auto">
            <CCol md="6" className="mb-4">
                <h3>Datos Personales</h3>
                <CFormGroup className="mt-4">
                    <CLabel htmlFor="name">Nombre</CLabel>
                    <CInput id="nombre" placeholder="Ingrese su nombre" required onChange={this.onchange} value={this.state.usuario.nombre}/>
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="lastname">Apellido</CLabel>
                    <CInput id="apellido" placeholder="Ingrese su apellido" required onChange={this.onchange} value={this.state.usuario.apellido}/>
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="email">Correo Electrónico</CLabel>
                    <CInput id="email" placeholder="Ingrese su correo" required onChange={this.onchange} value={this.state.usuario.correo}/>
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="address">Dirección</CLabel>
                    <CInput id="address" placeholder="Ingrese su dirección" required onChange={this.onchange} value={this.state.usuario.direccion}/>
                </CFormGroup>
                <CFormGroup>
                    <CLabel>Departamento</CLabel>
                    <CSelect custom name="departamento" id="department">
                    <option value="Lima">Lima</option>
                    <option value="Ica">Ica</option>
                    <option value="Arequipa">Arequipa</option>
                    <option value="Moquegua">Moquegua</option>
                    <option value="Tacna">Tacna</option>
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
                    <CSelect custom name="gender" id="gender" value={this.state.usuario.genero} onChange={this.onchange}>
                    <option value="0">Mujer</option>
                    <option value="1">Hombre</option>
                    </CSelect>
                </CFormGroup>
                <CFormGroup>
                    <CLabel type='number'>Celular</CLabel>
                    <CInput id="celular" placeholder="Ingrese su celular" required onChange={this.onchange} value={this.state.usuario.celular}/>
                </CFormGroup>
                <CFormGroup>
                    <CLabel type='number'>Documento de identificación</CLabel>
                    <CInputGroup>
                    <CInputGroupPrepend>
                        <CSelect custom name="doc" id="doc" onChange={this.onchangeDoc} value={this.state.tipoDoc}>
                        <option value="1">DNI</option>
                        <option value="2">CE</option>
                        </CSelect>
                    </CInputGroupPrepend>
                    <CInput type="text" id="username3" name="dni" value={this.state.usuario.dni} onChange={this.onchange}/>
                  </CInputGroup>
                </CFormGroup>
            </CCol>
            <CCol md="6" className="mb-4">
                <h3>Medidas</h3>
                <CFormGroup className="mt-3">
                    <CLabel type='number'>Cintura (cm)</CLabel>
                    <CInput id="cintura" placeholder="Ingrese su medida de cintura" required onChange={this.onchange} value={this.state.usuario.idVendedor ? this.state.usuario.idMedida.cintura : "" }/>
                </CFormGroup>
                <CFormGroup>
                    <CLabel type='number'>Busto (cm)</CLabel>
                    <CInput id="busto" placeholder="Ingrese su medida de busto" required onChange={this.onchange} value={this.state.usuario.idVendedor ? this.state.usuario.idMedida.busto : "" }/>
                </CFormGroup>
                <CFormGroup className="mb-5">
                    <CLabel type='number'>Cadera (cm)</CLabel>
                    <CInput id="cadera" placeholder="Ingrese su medida de cadera" required onChange={this.onchange} value={this.state.usuario.idVendedor ? this.state.usuario.idMedida.cadera : "" }/>
                </CFormGroup>
                <h3>Datos de Venta</h3>
                <CFormGroup className="mt-4">
                    <CLabel type='text'>Empresa de delivery a domicilio utilizada</CLabel>
                    <CInput id="delivery" placeholder="Ingrese su empresa de delivery a domicilio" required onChange={this.onchange} value={this.state.usuario.idVendedor ? this.state.usuario.idVendedor.delivery : "" }/>
                </CFormGroup>
                <CFormGroup>
                    <CLabel type='text'>Empresa de delivery con recojo en agencia utilizada</CLabel>
                    <CInput id="agencia" placeholder="Ingrese su empresa de delivery en agencia" required onChange={this.onchange} value={this.state.usuario.idVendedor ? this.state.usuario.idVendedor.agencia : "" }/>
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
                <CFormGroup className="mt-4">
                    <CLabel type='number'>Ruc NRUS</CLabel>
                    <CInput id="ruc" placeholder="Ingrese su número de RUC" required onChange={this.onchange} value={this.state.usuario.idVendedor ? this.state.usuario.idVendedor.ruc : "" }/>
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

const mapStateToProps = state => {
  return {
      buyer: state.comprador.buyers,
      user: state.auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
      ...bindActionCreators(Object.assign({},buyerActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InformacionUsuario)