import React, { Component } from 'react'
import {
    CToast,
    CToaster,
    CToastBody,
    CToastHeader,
} from '@coreui/react'

export default class Notification extends Component {
    render() {
        const { notif } = this.props;
        return (
            <CToaster position='top-center'>
                <CToast color={notif.mode} show={true} autohide={2000} fade={true} >
                    <CToastHeader closeButton={true}>
                        {notif.title}
                    </CToastHeader>
                    <CToastBody>
                        {notif.body}
                    </CToastBody>
                </CToast>
            </CToaster>
        )
    }
}