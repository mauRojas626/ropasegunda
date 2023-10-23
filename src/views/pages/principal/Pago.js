import React, { Component } from 'react'
import { CButton, CCol, CImg, CRow, CSwitch, CCard, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import FileUpload from 'src/views/dropzone/FileUpload';
import PrendasCardHorizontal from './PrendaCardHorizontal';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as sellActions from '../../../services/redux/actions/venta'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class Pago extends Component {
    constructor(props){
        super(props);
        this.state = {
            showQrYape: true,
            photo: false
        }
    }

    onChangeQr = () => {
        this.setState({showQrYape: !this.state.showQrYape})
    }

    onAddPhoto = (photo) => {
        this.setState({photo: photo})
    }

    onSubmit = () => {
        const formData = new FormData();
        const newFileName = `${Date.now()}_${this.state.photo.name}`
        formData.append('files', this.state.photo, newFileName)
        const venta = { total: this.props.location.state.prenda.precio, idComprador: this.props.user.idUsuario, idVendedor: this.props.location.state.prenda.idVendedor.idUsuario, idPrenda: this.props.location.state.prenda.idPrenda}
        formData.append('venta', JSON.stringify(venta));
        this.props.createSell(formData)
    }

    render() {
        const qr = this.state.showQrYape ? 'https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcSh-wrQu254qFaRcoYktJ5QmUhmuUedlbeMaQeaozAVD4lh4ICsGdBNubZ8UlMvWjKC' : 'https://es.mailpro.com/blog/image.axd?picture=/QRCODES.png'
        const colorQr = this.state.showQrYape ? '#741993' : '#13CDD0'
        return (
            <>
            <CCol xs="12" sm="12" className="m-auto">
                <CRow>
                    <CCol xs="12" sm="12" className="m-auto">
                        <CCard>
                            <PrendasCardHorizontal prenda={this.props.location.state.prenda} modo="enviar"></PrendasCardHorizontal>
                        </CCard>
                    </CCol>
                </CRow>
                <CRow className="mt-5">
                    <CCol xs="12" sm="4" className="m-auto">
                        <h4 style={{"textAlign": "center"}}>1</h4>
                        <h5 style={{"textAlign": "center"}}>Realiza el Pago</h5>
                    </CCol>
                    <CCol xs="12" sm="4" className="m-auto">
                        <h4 style={{"textAlign": "center"}}>2</h4>
                        <h5 style={{"textAlign": "center"}}>Sube tu comprobante</h5>
                    </CCol>
                    <CCol xs="12" sm="4" className="m-auto">
                        <h4 style={{"textAlign": "center"}}>3</h4>
                        <h5 style={{"textAlign": "center"}}>Confirma tu pago</h5>
                    </CCol>
                </CRow>
                <CRow className="mt-1">
                    <CCol xs="12" sm="4" className="m-auto" >
                        <CRow>
                            <CCol xs="12" sm="12">
                                <div style={{ "backgroundColor": colorQr, "borderRadius": "25px",}}>

                                    <CImg className="mt-3" src={qr}></CImg>
                                    <CRow className="m-auto">
                                        <CCol sm="12" className="m-1">
                                            <CRow className="m-1 d-flex justify-content-center align-items-center">
                                                <CCol>
                                                <span style={{"color": "white"}}>Elige tu medio de pago</span>
                                                </CCol>
                                                <CCol>
                                                    <CSwitch onChange={this.onChangeQr} size='lg' shape='pill' className={''} color={'dark'} labelOn={'yape'} labelOff={'plin'} checked={this.state.showQrYape} />
                                                </CCol>
                                            </CRow>
                                            
                                        </CCol>
                                    </CRow>
                                </div>
                            </CCol>  
                        </CRow>
                        <CRow className="m-3" md="10">
                            Recuerda que el pago es únicamente por la prenda y no por el envío. El envío será cotizado después de confirmar el pago
                        </CRow>
                    </CCol>
                    <CCol xs="12" sm="4" className="m-auto">
                        <FileUpload newPhoto={this.onAddPhoto}></FileUpload>
                    </CCol>
                    <CCol xs="12" sm="4" className="m-auto" >
                        
                        <span>Recuerda que subir documentos que no sean el comprobante de pago, generarán el bloqueo de su cuenta</span>
                        <CButton className="mt-4" size="lg" block color='primary' onClick={this.onSubmit} disabled={!this.state.photo}>Confirmar Pago</CButton>
                    </CCol>
                </CRow>
                
            </CCol>
            <CModal 
                show={this.state.modal} 
                onClose={() => this.setState({modal: !this.state.modal})}
                size="sm"
            >
            <CModalHeader closeButton>
            <CModalTitle>Compra Exitosa</CModalTitle>
            </CModalHeader>
            <CModalBody>
                Su compra fue realizada de manera exitosa. Puede ver el estado de su compra en la sección de ropa comprada
            </CModalBody>
            <CModalFooter>
            <Link to="/comprados">
                <CButton color="primary" onClick={() => this.setState({validarPago: !this.state.validarPago})}>Confirmar Pago</CButton>
            </Link>
            </CModalFooter>
        </CModal>
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
        ...bindActionCreators(Object.assign({},sellActions), dispatch)
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Pago)