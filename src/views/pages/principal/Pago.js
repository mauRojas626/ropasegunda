import React, { Component } from 'react'
import { CButton, CCol, CImg, CRow, CSwitch, CCard } from '@coreui/react';
import FileUpload from 'src/views/dropzone/FileUpload';
import PrendasCardHorizontal from './PrendaCardHorizontal';

export default class Pago extends Component {
    constructor(props){
        super(props);
        this.state = {
            showQrYape: true 
        }
    }

    onChangeQr = () => {
        this.setState({showQrYape: !this.state.showQrYape})
    }

    render() {
        const qr = this.state.showQrYape ? 'https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcSh-wrQu254qFaRcoYktJ5QmUhmuUedlbeMaQeaozAVD4lh4ICsGdBNubZ8UlMvWjKC' : 'https://es.mailpro.com/blog/image.axd?picture=/QRCODES.png'
        const colorQr = this.state.showQrYape ? '#741993' : '#13CDD0'
        return (
            <CCol xs="12" sm="12" className="m-auto">
                <CRow>
                    <CCol xs="12" sm="12" className="m-auto">
                        <CCard>
                            <PrendasCardHorizontal prenda={this.props.location.state.prenda}></PrendasCardHorizontal>
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
                        <FileUpload ></FileUpload>
                    </CCol>
                    <CCol xs="12" sm="4" className="m-auto" >
                        
                        <span>Recuerda que subir documentos que no sean el comprobante de pago, generarán el bloqueo de su cuenta</span>
                        <CButton className="mt-4" size="lg" block color='primary' >Confirmar Pago</CButton>
                    </CCol>
                </CRow>
                
            </CCol>
        )
    }
}
