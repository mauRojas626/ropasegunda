import React, { Component } from 'react'
import { CButton, CCol, CImg, CRow, CSwitch, CCard, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CCardBody } from '@coreui/react';
import FileUpload from 'src/views/dropzone/FileUpload';
import PrendasCardHorizontal from './PrendaCardHorizontal';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as sellActions from '../../../services/redux/actions/venta'
import * as clothesActions from '../../../services/redux/actions/prenda'
import { Link } from 'react-router-dom';

class Pago extends Component {
    constructor(props){
        super(props);
        this.state = {
            showQrYape: true,
            photo: false,
            time: 600,
            modal: false,
            modal2: false,
            comprado: false
        }
    }

    onChangeQr = () => {
        this.setState({showQrYape: !this.state.showQrYape})
    }

    onAddPhoto = (photo) => {
        this.setState({photo: photo})
    }

    async componentDidMount() {
        this.setState({comprado: false})
        this.countdown = setInterval(async () => {
          if (this.state.time > 0) {
            this.setState((prevState) => ({ time: prevState.time - 1 }));
          } else {
            clearInterval(this.countdown);
            this.setState({modal2: !this.state.modal2})
            await this.props.unBlockCothes(this.props.location.state.prenda.idPrenda)
          }
        }, 1000);
    }

    async componentWillUnmount() {
        clearInterval(this.countdown);
        if(!this.state.comprado) await this.props.unBlockClothes(this.props.location.state.prenda.idPrenda)
    }

    onSubmit = async () => {
        const formData = new FormData();
        const newFileName = `${Date.now()}_${this.state.photo.name}`
        formData.append('files', this.state.photo, newFileName)
        if(this.props.location.state.prenda !== undefined){
            const venta = { total: this.props.location.state.prenda.precio, idComprador: this.props.user.idUsuario, idVendedor: this.props.location.state.prenda.idVendedor.idUsuario, idPrenda: this.props.location.state.prenda.idPrenda}
            formData.append('venta', JSON.stringify(venta));
            await this.props.createSell(formData)
        }
        else {
            const venta = this.props.location.state.sell
            formData.append('venta', JSON.stringify(venta));
            await this.props.payShip(formData)
        }
        this.setState({modal: !this.state.modal, comprado: true})
    }

    formatTimeRemaining(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
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
                        <CCardBody>
                            <CCol className='m-auto'>
                                <h4>Tiempo para culminar la transacción: {this.formatTimeRemaining(this.state.time)}</h4>
                            </CCol>
                        </CCardBody>
                    </CCard>
                    {this.props.location.state.prenda ? <CCard>
                            <PrendasCardHorizontal prenda={this.props.location.state.prenda} modo="enviar"></PrendasCardHorizontal>
                        </CCard>
                    : <CCard>
                        <CCardBody>
                            <CCol>
                                <span><strong>Vendedor:</strong> {this.props.location.state.sell[0].idVendedor.nombre + " " + this.props.location.state.sell[0].idVendedor.apellido}</span>
                                <br/>
                                <span><strong>Dirección:</strong> {this.props.location.state.sell[0].idEnvio.direccion}</span>
                                <br/>
                                <span><strong>Precio Envio:</strong> S/ {this.props.location.state.sell[0].idEnvio.precioEnvio}</span>
                                <br/>
                                <span><strong>Número de Prendas: </strong>{this.props.location.state.sell.length}</span>
                            </CCol> 
                        </CCardBody>
                        
                    </CCard>}
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
                            {this.props.location.state.prenda ? "Recuerda que el pago es únicamente por la prenda y no por el envío. El envío será cotizado después de confirmar el pago": ""}
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
                <CModalHeader>
                <CModalTitle>Compra Exitosa</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    Su pago fue realizado de manera exitosa. Puede ver el estado de su compra en la sección de ropa comprada
                </CModalBody>
                <CModalFooter>
                <Link to="/comprados">
                    <CButton color="primary" onClick={() => this.setState({modal: !this.state.modal})}>Aceptar</CButton>
                </Link>
                </CModalFooter>
            </CModal>
            <CModal 
                show={this.state.modal2} 
                onClose={() => this.setState({modal2: !this.state.modal2})}
                size="sm"
            >
                <CModalHeader>
                <CModalTitle>Tiempo agotado</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    Se agotó el tiempo de espera para la realización del pago. Por favor vuelva a intentarlo
                </CModalBody>
                <CModalFooter>
                <Link to="/prendas">
                    <CButton color="primary" onClick={() => this.setState({modal2: !this.state.modal2})}>Aceptar</CButton>
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
        ...bindActionCreators(Object.assign({},sellActions, clothesActions), dispatch)
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Pago)