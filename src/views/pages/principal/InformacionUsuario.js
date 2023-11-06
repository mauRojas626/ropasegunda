import { CRow, CCol, CFormGroup, CLabel, CInput, CSelect, CInputFile, CButton, CInputGroup, CInputGroupPrepend } from '@coreui/react'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as buyerActions from '../../../services/redux/actions/comprador'
import * as authActions from '../../../services/redux/actions/auth'
import notification from 'src/services/models/notificacion'
import Notification from '../common/Notification'

class InformacionUsuario extends Component {
  constructor(props){
    super(props);
    this.state = {
        collapse: 0,
        isLoading: true,
        failed: false,
        usuario: [],
        provincia: [],
        departamento: [],
        tipoDoc: 1,
        idDepartamento: 1,
        yape: "",
        plin: "",
        createResults: [],
    }
  }
  
  
  async componentDidMount(){
    this.setState({usuario: this.props.user})
    if(this.props.departamento.length === 0){
      await this.props.getCities()
    }
    this.setState({provincia: this.props.provincia, departamento: this.props.departamento})
    if(!(this.props.user.dni == undefined) && this.props.user.dni.length === 8){
      this.setState({tipoDoc: 1})
    } else {
      this.setState({tipoDoc: 2})
    }

  }

  onSubmit = async () => {
    const formData = new FormData();
    if(this.state.yape !== ""){
      const newFileName = `${Date.now()}_${this.state.yape.name}`
      formData.append('yape', this.state.yape, newFileName)
    }
    if(this.state.plin !== ""){
      const newFileName = `${Date.now()}_${this.state.plin.name}`
      formData.append('plin', this.state.plin, newFileName)
    }
    formData.append('user', JSON.stringify(this.state.usuario));
    let res = await this.props.updateBuyer(formData)
    if(res.type === "UPDATE_BUYER"){
      let newNotification = new notification('success', 'Actualización exitoso', 'Usuario actualizado correctamente')
      this.setState({createResults: [...this.state.createResults, newNotification]})
      this.props.updateUser(this.state.usuario)
      this.setState({usuario: this.props.user})
    }
  }

  onchange = (e) => {
    switch (e.target.id) {
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
        this.setState({usuario: {...this.state.usuario, telefono: e.target.value}})
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
      case 'department':
        this.setState({idDepartamento: e.target.value})
        break;
      case 'provincia':
        this.setState({usuario: {...this.state.usuario, idProvincia: e.target.value}})
        break;
      case 'yape':
        this.setState({yape: e.target.files[0]})
        break;
      case 'plin':
        this.setState({plin: e.target.files[0]})
        break;
      case 'gender':
        this.setState({usuario: {...this.state.usuario, genero: e.target.value}})
      default:
        break;
    }
  }

  onchangeDoc = (e) => {
    this.setState({tipoDoc: e.target.value})
  }
  render() {
    const provincia = this.state.provincia.filter(provincia => provincia.idDepartamento == this.state.idDepartamento)
    const { createResults } = this.state
    return (
      <>
        {createResults.length >= 1 ?  createResults.map((notification, index) => <Notification key={index} notif={notification} />) : <></>}
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
                    <CSelect custom name="departamento" id="department" onChange={this.onchange} value={this.state.idDepartamento}>
                    {this.state.departamento.map((departamento,index) => (
                        <option key={index} value={departamento.idDepartamento}>{departamento.nombre}</option>
                    ))}
                    </CSelect>
                </CFormGroup>
                <CFormGroup>
                    <CLabel>Provincia</CLabel>
                    <CSelect custom name="provincia" id="provincia" onChange={this.onchange} value={this.state.usuario.idProvincia ? this.state.usuario.idProvincia.idProvincia : 0}>
                    {provincia.map((provincia,index) => (
                        <option key={index} value={provincia.idProvincia}>{provincia.nombre}</option>
                    ))}
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
                    <CInput id="celular" placeholder="Ingrese su celular" required onChange={this.onchange} value={this.state.usuario.telefono}/>
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
                    <CInput type="text" id="dni" name="dni" value={this.state.usuario.dni} onChange={this.onchange}/>
                  </CInputGroup>
                </CFormGroup>
            </CCol>
            <CCol md="6" className="mb-4">
                <h3>Medidas</h3>
                <CFormGroup className="mt-3">
                    <CLabel type='number'>Cintura (cm)</CLabel>
                    <CInput id="cintura" placeholder="Ingrese su medida de cintura" required onChange={this.onchange} value={this.state.usuario.idMedida ? this.state.usuario.idMedida.cintura : "" }/>
                </CFormGroup>
                <CFormGroup>
                    <CLabel type='number'>Busto (cm)</CLabel>
                    <CInput id="busto" placeholder="Ingrese su medida de busto" required onChange={this.onchange} value={this.state.usuario.idMedida ? this.state.usuario.idMedida.busto : "" }/>
                </CFormGroup>
                <CFormGroup className="mb-5">
                    <CLabel type='number'>Cadera (cm)</CLabel>
                    <CInput id="cadera" placeholder="Ingrese su medida de cadera" required onChange={this.onchange} value={this.state.usuario.idMedida ? this.state.usuario.idMedida.cadera : "" }/>
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
                    <CInputFile accept='image/*' custom id="yape" onChange={this.onchange}/>
                    <CLabel htmlFor="custom-file-input" variant="custom-file">
                      Elige archivo...
                    </CLabel>
                  </CCol>
                </CFormGroup>
                <CFormGroup>
                  <CLabel>QR plin</CLabel>
                  <CCol>
                    <CInputFile accept='image/*' custom id="plin" onChange={this.onchange}/>
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
                <CButton block color='primary' onClick={this.onSubmit}>
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
      user: state.auth.user,
      provincia: state.provincia.cities.provincia,
      departamento: state.provincia.cities.departamento
  }
}

const mapDispatchToProps = dispatch => {
  return {
      ...bindActionCreators(Object.assign({},buyerActions, authActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InformacionUsuario)