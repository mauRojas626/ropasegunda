import React, { Component } from 'react'
import { CButton, CCol, CCard, CRow, CCollapse, CCardBody, CCardHeader, CProgress } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as buyerActions from '../../../services/redux/actions/comprador'

class Administrador extends Component {
  constructor(props){
    super(props);
    this.state = {
        collapse: 0,
        isLoading: true,
        failed: false,
        usuarios: []
    }
  }
  async componentDidMount(){
    await this.props.getBuyers();
    this.setState({usuarios: this.props.buyer})

  }

  render() {
    return (
      <CCol xs="12" md="11" className="m-3">
        <h3>Validar RUC</h3>
        {this.state.usuarios.map((usuario,index) => <CCard className="mb-4" key={index}>
            <CCardHeader>
                <CRow>
                    <CCol md="10">
                      <CRow className="m-auto" style={{ justifyContent: 'space-around'}}>
                          <span>Nombre: {usuario.nombre}</span>    
                          <span>DNI: {usuario.dni}</span> 
                          <span>RUC: {1000000000 + usuario.dni + index+13}</span>
                      </CRow>
                    </CCol>
                    <CCol md="2">
                        <CButton color='primary' size='sm' onClick={() => this.setState({calificar: true})}>
                            <CIcon name='cil-check'></CIcon>
                        </CButton>{'  '}
                        <CButton color='danger' size='sm' onClick={() => this.setState({calificar: true})}>
                            <CIcon name='cil-x'></CIcon>
                        </CButton>
                    </CCol>
                </CRow>
            </CCardHeader>
          </CCard>)}
        <h3>Usuarios</h3>
        <CCard className="mb-0">
            <CCardHeader>
                <CRow>
                    <CCol md="10">
                        <CButton 
                            block
                            className="text-left m-0 p-0" 
                            onClick={() => this.setState({collapse: this.state.collapse === 1 ? null : 1})}
                        >
                            <CRow className="m-auto" style={{ justifyContent: 'space-around'}}>
                                <span>Nombre: Sergio Calle</span>    
                                <span>DNI: 10430948</span> 
                                <span>RUC: 1029897849</span>  
                                <span>Reportado: 6 veces</span>
                            </CRow>
                        </CButton>
                    </CCol>
                    <CCol md="2">
                        <CButton color='primary' size='sm' onClick={() => this.setState({calificar: true})}>
                            Bloquear
                        </CButton>
                    </CCol>
                </CRow>
            </CCardHeader>
            <CCollapse show={this.state.collapse === 1}>
                <CCardBody>
                  <div className="progress-group mb-4">
                    <div className="progress-group-header">
                      <span className="title">No presenta boleta</span>
                      <span className="ml-auto font-weight-bold">2(33%)</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="warning" value="33" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-header">
                      <span className="title">No validó el pago</span>
                      <span className="ml-auto font-weight-bold">2(33%)</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="warning" value="33" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-header">
                      <span className="title">No envió el pedido</span>
                      <span className="ml-auto font-weight-bold">2(33%)</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="warning" value="33" />
                    </div>
                  </div>
                </CCardBody>
            </CCollapse>
        </CCard>
</CCol>
    )
  }
}

const mapStateToProps = state => {
  return {
      buyer: state.comprador.buyers
  }
}

const mapDispatchToProps = dispatch => {
  return {
      ...bindActionCreators(Object.assign({},buyerActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Administrador)
