import React, { Component } from 'react'
import { CButton, CCol, CCard, CRow, CCollapse, CCardBody, CCardHeader, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as buyerActions from '../../../services/redux/actions/comprador'
import * as ventaActions from '../../../services/redux/actions/venta'
import notification from 'src/services/models/notificacion';
import Notification from '../common/Notification';
import PrendasCardHorizontal from './PrendaCardHorizontal';

class Administrador extends Component {
  constructor(props){
    super(props);
    this.state = {
        collapse: 0,
        isLoading: true,
        failed: false,
        usuarios: [],
        createResults: [],
        quejas: [],
        comprador: false,
        vendedor: false,
        queja: false,
        envio: false,
    }
  }
  async componentDidMount(){
    await this.props.getBuyers();
    await this.props.getQuejas();
    const ventas = this.props.quejas
    const quejas = [...new Set(ventas.map((sell) => sell.idQueja.idQueja))]
    let ventaByQueja = []
    quejas.forEach((queja, index) => {
      ventaByQueja[index] = ventas.filter((sell) => sell.idQueja.idQueja === queja)
    })
    this.setState({usuarios: this.props.buyer.filter(item => item.idVendedor !== undefined && item.idVendedor.aprobado === 0), quejas: ventaByQueja})
  }

  onAccept = async (usuario) => {
    usuario.idVendedor.aprobado = 1
    let res = await this.props.validateRuc(usuario)
    if(res && res.type === 'VALIDATE_RUC'){
      this.setState({usuarios: this.state.usuarios.filter(item => item.idVendedor.RUC !== usuario.idVendedor.RUC)})
      let notificacion = new notification('success', 'Aprobación exitosa', 'RUC aprobado correctamente');
      this.setState({createResults: [...this.state.createResults, notificacion]})
    }
  }

  onDecline = async (usuario) => {
    usuario.idVendedor.aprobado = 2
    let res = await this.props.validateRuc(usuario)
    if(res && res.type === 'VALIDATE_RUC'){
      this.setState({usuarios: this.state.usuarios.filter(item => item.idVendedor.RUC !== usuario.idVendedor.RUC)})
      let notificacion = new notification('success', 'RUC rechazado', 'Se envió una notificación al usuario');
      this.setState({createResults: [...this.state.createResults, notificacion]})
    }
  }

  resolver = async (id) => {
    let res = await this.props.resolverQueja(id)
    if(res && res.type === 'RESOLVER_QUEJA'){
      let notificacion = new notification('success', 'Queja resuelta', 'Se envió una notificación al usuario');
      this.setState({createResults: [...this.state.createResults, notificacion]})
      this.setState({quejas: this.state.quejas.filter(item => item[0].idQueja.idQueja !== id)})
    }
  }

  bloquear = async (usuario) => {
    let res = await this.props.blockUser(usuario)
    if(res && res.type === 'BLOCK_USER'){
      let notificacion = new notification('success', 'Usuario bloqueado', 'Se envió una notificación al usuario');
      this.setState({createResults: [...this.state.createResults, notificacion]})
      this.setState({comprador: false, vendedor: false})
    }
  }

  render() {
    return (
      <>
      {this.state.createResults.map((notificacion, index) => <Notification key={index} notif={notificacion}></Notification>)}
      <CModal show={this.state.comprador !== false} onClose={() => this.setState({comprador: false})}>
        <CModalHeader closeButton>
          <CModalTitle>
            Comprador
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md="12">
              <span>Nombre: {this.state.comprador.nombre + " " + this.state.comprador.apellido}</span><br/>
              <span>Correo: {this.state.comprador.correo}</span><br/>
              <span>DNI: {this.state.comprador.dni}</span><br/>
              <span>telefono: {this.state.comprador.telefono}</span><br/>
              <span>Veces reportado: {this.state.comprador.reportado}</span><br/>
              <span>Bloqueado: {this.state.comprador.bloqueado === 1 ? "Si" : "No"}</span>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => this.setState({comprador: false})}>Cerrar</CButton>{"  "}
          <CButton color="danger" onClick={() => this.bloquear(this.state.comprador)}>Bloquear</CButton>
        </CModalFooter>
      </CModal>
      <CModal show={this.state.vendedor !== false} onClose={() => this.setState({vendedor: false})}>
        <CModalHeader closeButton>
          <CModalTitle>
            Vendedor
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md="12">
              <span>Nombre: {this.state.vendedor.nombre + " " + this.state.vendedor.apellido}</span><br/>
              <span>Correo: {this.state.vendedor.correo}</span><br/>
              <span>DNI: {this.state.vendedor.dni}</span><br/>
              <span>telefono: {this.state.vendedor.telefono}</span><br/>
              <span>RUC: {this.state.vendedor.RUC}</span><br/>
              <span>Veces reportado: {this.state.vendedor.reportado}</span><br/>
              <span>Bloqueado: {this.state.vendedor.bloqueado === 1 ? "Si" : "No"}</span>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => this.setState({vendedor: false})}>Cerrar</CButton>{"  "}
          <CButton color="danger" onClick={() => this.bloquear(this.state.vendedor)}>Bloquear</CButton>
        </CModalFooter>
      </CModal>
      {this.state.envio !== false ? <CModal show={this.state.envio !== false} onClose={() => this.setState({envio: false})}>
        <CModalHeader closeButton>
          <CModalTitle>
            Envío
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md="12">
              {this.state.envio.fechaEntrega === null ? null : <span>Fecha Entrega: {this.state.envio.fechaEntrega.toString().slice(0,10)}</span>}<br/>
              {this.state.envio.fechaSolicitud === null ? null : <span>Fecha Solicitud Envío: {this.state.envio.fechaSolicitud.toString().slice(0,10)}</span>}<br/>
              {this.state.envio.fechaPago === null ? null : <span>Fecha Pago Envío: {this.state.envio.fechaPago.toString().slice(0,10)}</span>}<br/>
              <span>ComprobanteCliente: {this.state.envio.comprobanteCliente}</span><br/>
              <span>Dirección: {this.state.envio.direccion}</span><br/>
              <span>telefono: {this.state.envio.telefono}</span><br/>
              <span>Tipo de entrega: {this.state.envio.tipoEntrega === 1 ? "En agencia" : "A domicilio"}</span>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => this.setState({envio: false})}>Cerrar</CButton>
        </CModalFooter>
      </CModal>: null}
      <CModal show={this.state.queja !== false} onClose={() => this.setState({queja: false})}>
        <CModalHeader closeButton>
          <CModalTitle>
            Queja
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md="12">
              <span>Comentario: {this.state.queja.comentario}</span><br/>
              <CButton color='primary' size='sm' href={this.state.queja.evidencia}>Descargar evidencia</CButton>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => this.setState({queja: false})}>Cerrar</CButton>
        </CModalFooter>
      </CModal>
      <CCol xs="12" md="11" className="m-3">
        <h3>Validar RUC</h3>
        {this.state.usuarios.map((usuario,index) => <CCard className="mb-4" key={index}>
            <CCardHeader>
                <CRow>
                    <CCol md="10">
                      <CRow className="m-auto" style={{ justifyContent: 'space-around'}}>
                          <span>Nombre: {usuario.nombre + " " + usuario.apellido}</span>    
                          <span>DNI: {usuario.dni}</span> 
                          <span>RUC: {usuario.idVendedor.RUC}</span>
                      </CRow>
                    </CCol>
                    <CCol md="2">
                        <CButton color='primary' size='sm' onClick={() => this.onAccept(usuario)}>
                            <CIcon name='cil-check'></CIcon>
                        </CButton>{'  '}
                        <CButton color='danger' size='sm' onClick={() => this.onDecline(usuario)}>
                            <CIcon name='cil-x'></CIcon>
                        </CButton>
                    </CCol>
                </CRow>
            </CCardHeader>
          </CCard>)}
        <h3>Quejas</h3>
        {
          this.state.quejas.map((queja, index) => <CCard className="mb-0" key={index}>
            <CCardHeader>
                <CRow>
                    <CCol md="10">
                        <CButton
                            block
                            className="text-left m-0 p-0" 
                            onClick={() => this.setState({collapse: this.state.collapse === index+20 ? null : index+20})}
                        >
                            <CRow className="m-auto" style={{ justifyContent: 'space-around'}}>
                              <span>Queja: {queja[0].idQueja.tipo}</span>
                              <span>Fecha: {queja[0].idQueja.fecha.toString().slice(0,10)}</span>
                            </CRow>
                        </CButton>
                    </CCol>
                    <CCol md="2">
                        <CButton color='primary' size='sm' onClick={() => this.resolver(queja[0].idQueja.idQueja)}>
                            Resuelto
                        </CButton>
                    </CCol>
                </CRow>
            </CCardHeader>
            <CCollapse show={this.state.collapse === index+20}>
                <CCardBody>
                  <CRow className="m-auto" style={{ justifyContent: 'space-around'}}>
                    <CButton color='primary' onClick={() => this.setState({ comprador: queja[0].idComprador })}>Ver Comprador</CButton>
                    <CButton color='danger' onClick={() => this.setState({ vendedor: queja[0].idVendedor })}>Ver Vendedor</CButton>
                    <CButton color='info' onClick={() => this.setState({ queja: queja[0].idQueja })}>Ver Queja</CButton>
                    {queja[0].idEnvio !== null ? <CButton color='warning' onClick={() => this.setState({ envio: queja[0].idEnvio })}>Ver Envío</CButton> : null}
                  </CRow>
                  <CRow className="g-1 mt-2">
                      {queja.map((venta, index) => (
                          <CCol className="m-0" key={index}>
                            <CRow className="g-0">
                              <PrendasCardHorizontal venta={venta} modo='admin'></PrendasCardHorizontal>
                            </CRow>
                          </CCol>   
                      ))}
                  </CRow>
                </CCardBody>
            </CCollapse>
          </CCard>
        )}
      </CCol>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
      buyer: state.comprador.buyers,
      quejas: state.venta.quejas,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      ...bindActionCreators(Object.assign({},buyerActions, ventaActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Administrador)
