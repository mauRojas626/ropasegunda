import { CRow, CCol, CFormGroup, CLabel, CInput, CSelect, CInputFile, CButton } from '@coreui/react'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as buyerActions from '../../../services/redux/actions/comprador'
import * as authActions from '../../../services/redux/actions/auth'
import * as provinciaActions from '../../../services/redux/actions/provincia'
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
        error: {}
    }
  }
  
  
  async componentDidMount(){
    let user = this.props.user
    if(user.idVendedor !== undefined && user.idVendedor !== 0){
      user.idVendedor.ruc = user.idVendedor.RUC
      this.setState({yape: {name: user.idVendedor.qrYape}, plin: {name: user.idVendedor.qrPlin}})
    }
    this.setState({usuario: user})
    if(this.props.departamento === undefined){
      await this.props.getCities()
    }
    this.setState({provincia: this.props.provincia, departamento: this.props.departamento})
  }

  onSubmit = async () => {
    //validar
    let pattern = /^[A-Za-z]+$/;
    let error = {}
    if(this.state.usuario.nombre !== null && !pattern.test(this.state.usuario.nombre)){
      error.nombre = "El nombre solo puede contener letras"
    }
    if(this.state.usuario.apellido !== null && !pattern.test(this.state.usuario.apellido)){
      error.apellido = "El apellido solo puede contener letras"
    }
    pattern = /^\d{8}$/
    if(this.state.usuario.dni !== null && !pattern.test(this.state.usuario.dni)){
      error.dni = "El DNI debe contener 8 dígitos"
    }
    pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    if(this.state.usuario.correo !== null && !pattern.test(this.state.usuario.correo)){
      error.correo = "El correo no es válido"
    }
    pattern = /^\d{9}$/
    if(this.state.usuario.telefono !== null && !pattern.test(this.state.usuario.telefono)){
      error.telefono = "El celular debe contener 9 dígitos"
    }
    if(this.state.usuario.idMedida !== 0){
      if(isNaN(parseInt(this.state.usuario.idMedida.cintura))){
        error.cintura = "La cintura debe ser un número"
      }
      if(isNaN(parseInt(this.state.usuario.idMedida.busto))){
        error.busto = "El busto debe ser un número"
      }
      if(isNaN(parseInt(this.state.usuario.idMedida.cadera))){
        error.cadera = "La cadera debe ser un número"
      }
    }
    if(this.state.usuario.idVendedor !== 0){
      pattern = /^\d{11}$/
      if(!pattern.test(this.state.usuario.idVendedor.ruc)){
        error.ruc = "El RUC debe contener 11 dígitos"
      }
      if(this.state.usuario.idVendedor.delivery === null){
        error.delivery = "Ingrese su empresa de delivery a domicilio"
      }
      if(this.state.usuario.idVendedor.agencia === null){
        error.agencia = "Ingrese su empresa de delivery en agencia"
      }
      if(this.state.yape === ""){
        error.yape = "Ingrese su QR de yape"
      }
      if(this.state.plin === ""){
        error.plin = "Ingrese su QR de plin"
      }
    }
    this.setState({error: error})
    if(Object.keys(error).length === 0){
      const formData = new FormData();
      if(this.state.yape !== "" && this.state.yape.data !== undefined){
        const newFileName = `${Date.now()}_${this.state.yape.name}`
        formData.append('yape', this.state.yape, newFileName)
      }
      if(this.state.plin !== "" && this.state.plin.data !== undefined){
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
        this.setState({error: error})
      }
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
        break;
      default:
        break;
    }
  }

  onchangeDoc = (e) => {
    this.setState({tipoDoc: e.target.value})
  }
  render() {
    const provincia = this.state.provincia.filter(provincia => parseInt(provincia.idDepartamento) === parseInt(this.state.idDepartamento))
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
                    <p className="text-danger">{this.state.error.nombre}</p>
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="lastname">Apellido</CLabel>
                    <CInput id="apellido" placeholder="Ingrese su apellido" required onChange={this.onchange} value={this.state.usuario.apellido}/>
                    <p className="text-danger">{this.state.error.apellido}</p>
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="email">Correo Electrónico</CLabel>
                    <CInput id="email" placeholder="Ingrese su correo" required onChange={this.onchange} value={this.state.usuario.correo}/>
                    <p className="text-danger">{this.state.error.correo}</p>
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
                    <p className="text-danger">{this.state.error.telefono}</p>
                </CFormGroup>
                <CFormGroup>
                    <CLabel type='number'>DNI</CLabel>
                    <CInput type="text" id="dni" name="dni" value={this.state.usuario.dni} onChange={this.onchange}/>
                    <p className="text-danger">{this.state.error.dni}</p>
                </CFormGroup>
            </CCol>
            <CCol md="6" className="mb-4">
                <h3>Medidas</h3>
                <CFormGroup className="mt-3">
                    <CLabel type='number'>Cintura (cm)</CLabel>
                    <CInput id="cintura" placeholder="Ingrese su medida de cintura" required onChange={this.onchange} value={this.state.usuario.idMedida ? this.state.usuario.idMedida.cintura : "" }/>
                    <p className="text-danger">{this.state.error.cintura}</p>
                </CFormGroup>
                <CFormGroup>
                    <CLabel type='number'>Busto (cm)</CLabel>
                    <CInput id="busto" placeholder="Ingrese su medida de busto" required onChange={this.onchange} value={this.state.usuario.idMedida ? this.state.usuario.idMedida.busto : "" }/>
                    <p className="text-danger">{this.state.error.busto}</p>
                </CFormGroup>
                <CFormGroup className="mb-5">
                    <CLabel type='number'>Cadera (cm)</CLabel>
                    <CInput id="cadera" placeholder="Ingrese su medida de cadera" required onChange={this.onchange} value={this.state.usuario.idMedida ? this.state.usuario.idMedida.cadera : "" }/>
                    <p className="text-danger">{this.state.error.cadera}</p>
                </CFormGroup>
                <h3>Datos de Venta</h3>
                <CFormGroup className="mt-4">
                    <CLabel type='text'>Empresa de delivery a domicilio utilizada</CLabel>
                    <CInput id="delivery" placeholder="Ingrese su empresa de delivery a domicilio" required onChange={this.onchange} value={this.state.usuario.idVendedor ? this.state.usuario.idVendedor.delivery : "" }/>
                    <p className="text-danger">{this.state.error.delivery}</p>
                </CFormGroup>
                <CFormGroup>
                    <CLabel type='text'>Empresa de delivery con recojo en agencia utilizada</CLabel>
                    <CInput id="agencia" placeholder="Ingrese su empresa de delivery en agencia" required onChange={this.onchange} value={this.state.usuario.idVendedor ? this.state.usuario.idVendedor.agencia : "" }/>
                    <p className="text-danger">{this.state.error.agencia}</p>
                </CFormGroup>
                <CFormGroup>
                  <CLabel>QR yape</CLabel>
                  <CCol>
                    <CInputFile accept='image/*' custom id="yape" onChange={this.onchange}/>
                    <CLabel htmlFor="custom-file-input" variant="custom-file">
                      {this.state.yape !== "" ? this.state.yape.name : "Elige archivo..."}
                    </CLabel>
                    <p className="text-danger">{this.state.error.yape}</p>
                  </CCol>
                </CFormGroup>
                <CFormGroup>
                  <CLabel>QR plin</CLabel>
                  <CCol>
                    <CInputFile accept='image/*' custom id="plin" onChange={this.onchange}/>
                    <CLabel htmlFor="custom-file-input" variant="custom-file">
                    {this.state.plin !== "" ? this.state.plin.name : "Elige archivo..."}
                    </CLabel>
                    <p className="text-danger">{this.state.error.plin}</p>
                  </CCol>
                </CFormGroup>
                <CFormGroup className="mt-4">
                    <CLabel type='number'>Ruc NRUS</CLabel>
                    <CInput id="ruc" placeholder="Ingrese su número de RUC" required onChange={this.onchange} value={this.state.usuario.idVendedor ? this.state.usuario.idVendedor.ruc : "" }/>
                    <p className="text-danger">{this.state.error.ruc}</p>
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
      ...bindActionCreators(Object.assign({},buyerActions, authActions, provinciaActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InformacionUsuario)