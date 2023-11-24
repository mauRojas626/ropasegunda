import React, { Component } from 'react'
import {
    CCol,
    CContainer,
    CRow
} from '@coreui/react'
  
export default class ErrorConnection extends Component {
    render() {
        return (
            <div className="c-default-layout flex-row align-items-center">
            <CContainer>
              <CRow className="justify-content-center">
                <CCol md="8">
                  <span className="clearfix">
                    <h1 className="float-left display-3 mr-4">Error</h1>
                    <h4 className="pt-3">¡Houston, tenemos un problema!</h4>
                    <p className="mb-0 mr-1 text-muted float-left">No pudimos conectarnos con el servidor.</p>
                    <p className="mb-0 text-muted float-left">Verifica tu conexión a internet o inténtalo más tarde.</p>                
                  </span>
                </CCol>
              </CRow>
            </CContainer>
          </div>
        )
    }
}