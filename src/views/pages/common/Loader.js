import React, { Component } from 'react'
import {
    CCol,
    CSpinner
} from '@coreui/react'

export default class Loader extends Component {
    render() {
        return (
            <CCol sm="4" className="m-auto" style={{display: 'flex', justifyContent: 'center'}}>
                <CSpinner color="info" size="lg"></CSpinner>
            </CCol>
        )
    }
}