import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CFormGroup,
  CLabel,
  CInput,
  CCardImg,
  CModalFooter,
  CButton
} from '@coreui/react'
import { useDispatch } from 'react-redux'
import CIcon from '@coreui/icons-react'
import { updateQuestion } from 'src/services/redux/actions/consulta'

const TheHeaderDropdownMssg = ({ user }) => {
  const dispatch = useDispatch()
  const itemsCount = user && user.idVendedor !== 0 && user.idVendedor.consultas != null ? user.idVendedor.consultas.length : 0
  const [modal, setModal] = React.useState(false)
  const [consulta, setConsulta] = React.useState('')
  const [respuesta, setRespuesta] = React.useState('')
  const responder = (consulta) => {
    setModal(!modal)
    setConsulta(consulta)
  }

  const submit = async () => {
    setConsulta({...consulta, respuesta: respuesta})
    await dispatch(updateQuestion({...consulta, respuesta: respuesta}))
    setModal(!modal)
  }

  return (
    <>
    <CModal show={modal}
            onClose={() => setModal(!modal)}>
      <CModalHeader closeButton>
        <CModalTitle>Responder</CModalTitle>
      </CModalHeader>
      <CModalBody>
      <CCardImg src={consulta.foto}></CCardImg>
        <CFormGroup>
          <CLabel>{consulta.Pregunta}</CLabel>
          <CInput id="respuesta" placeholder="Respuesta" required onChange={(e) => setRespuesta(e.target.value)} value={respuesta}/>
        </CFormGroup>
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={() => submit()}>Responder</CButton>
      </CModalFooter>
    </CModal>
    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-bell" />{itemsCount > 0 ? <CBadge shape="pill" color="danger">{itemsCount}</CBadge> : <></>}
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
        >
          <strong>Consultas</strong>
        </CDropdownItem>
        {user && user.idVendedor && user.idVendedor.consultas != null ? user.idVendedor.consultas.map((consulta, index) => 
          <CDropdownItem key={index} onClick={() => responder(consulta)}>
            <div className="message">
              <div className="pt-3 mr-3 float-left">
                <div className="c-avatar">
                  <CImg
                    src={consulta.foto}
                    className="c-avatar-img"
                    alt="foto prenda"
                  />
                  <span className="c-avatar-status bg-success"></span>
                </div>
              </div>
              <div>
                <small className="text-muted">{consulta.nombre}</small>
              </div>
              <div className="font-weight-bold">
                <span className="fa fa-exclamation text-danger"></span> Consulta sobre prenda
              </div>
              <div className="small text-muted ">
                {consulta.Pregunta}
              </div>
            </div>
          </CDropdownItem>
            
        ) : <></>}
        <CDropdownItem href="#">
          <div className="message">
            <div className="pt-3 mr-3 float-left">
              <div className="c-avatar">
                <CImg
                  src="https://http2.mlstatic.com/D_NQ_NP_720832-MPE48261251804_112021-O.webp"
                  className="c-avatar-img"
                  alt="saco rojo"
                />
                <span className="c-avatar-status bg-success"></span>
              </div>
            </div>
            <div>
              <small className="text-muted">Saco Zara</small>
            </div>
            <div className="text-truncate font-weight-bold">
              <span className="fa fa-exclamation text-danger"></span> Consulta sobre prenda
            </div>
            <div className="small text-muted text-truncate">
              Haz click aqui para ver el estado de tu prenda. Recuerda que tienes 30 dias para cotizar el envío
            </div>
          </div>
        </CDropdownItem>

        <CDropdownItem href="#">
          <div className="message">
            <div className="pt-3 mr-3 float-left">
              <div className="c-avatar">
                <CImg
                  src="https://lastraperas-public.imgix.net/items/64b8762b22ce520008503ff8/WhatsApp-Image-2023-08-25-at-1.19.34-PM_clipped_rev_1.png?h=345&auto=format"
                  className="c-avatar-img"
                  alt="admin@bootstrapmaster.com"
                />
                <span className="c-avatar-status bg-warning"></span>
              </div>
            </div>
            <div>
              <small className="text-muted">Ocasi.on</small>
            </div>
            <div className="font-weight-bold">Envío Cotizado</div>
            <div className="small text-muted text-truncate">Haz click aquí para ver la cotización del envío. Recuerda que solo tienes 48 horas para realizar el pago
            </div>
          </div>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
    </>
  )
}

export default TheHeaderDropdownMssg