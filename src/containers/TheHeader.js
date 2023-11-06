import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CForm,
  CInput,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CLabel,
  CFormGroup, 
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { toggleSidebar as toggleSidebarAction } from '../services/redux/actions/changeState'
import { login, logout } from '../services/redux/actions/auth';
import { useHistory } from 'react-router-dom';
import { createBuyer } from '../services/redux/actions/comprador';
import Notification from 'src/views/pages/common/Notification';
import notification from 'src/services/models/notificacion';

// routes config
import routes from '../routes/routes'

import { 
  TheHeaderDropdown,
  TheHeaderDropdownMssg
}  from './index'

const TheHeader = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const sidebarShow = useSelector(state => state.changeState.sidebarShow)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const [usuario, setUsuario] = React.useState('')
  const [clave, setClave] = React.useState('')
  const [error, setError] = React.useState(false)
  const [confirmacion, setConfirmacion] = React.useState(false)
  const [registrarse, setRegistrarse] = React.useState(false)
  const [createResults, setCreateResults] = React.useState([])

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch(toggleSidebarAction(val))
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch(toggleSidebarAction(val))
  }

  const cambioModal = () => {
    setConfirmacion(!confirmacion)
    setRegistrarse(!registrarse)
    setClave('')
    setUsuario('')
  }

  const onChange = (key) => (e) => {
    switch (key) {
      case 'usuario':
        setUsuario(e.target.value)
        break;
      case 'clave':
        setClave(e.target.value)
        break;
      default:
        break;
    }
  }
  const onSubmit =  async () => {
    let user1 = { correo: usuario, clave: clave }   
    if(confirmacion) {
      await dispatch(login(user1)) 
      if(!isAuthenticated) setError(true)
      else setError(false)
    }
    else {
      let res = await dispatch(createBuyer(user1))
      if(res.type === 'CREATE_BUYER') {
        let newNotification = new notification('success', 'Registro exitoso', 'Usuario registrado correctamente')
        setCreateResults([...createResults, newNotification])
      }
      setRegistrarse(false)
      setError(false);
    }
    
  }

  useEffect(() => {
    if (isAuthenticated) {
      setConfirmacion(false);
    } else {
      setError(false);
    }
  }, [isAuthenticated, user]);

  const loginAuth = () => {
    if(isAuthenticated){
      dispatch(logout());
      history.push('/prendas');
    }
    else setConfirmacion(true)
  }
  
  return (
    
    <>
    
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="" height="48" alt="Logo"/>
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        
        <CHeaderNavItem  className="px-3">
          <CHeaderNavLink to="/perfil">{user ?  "Bienvenido " + (user.nombre ? user.nombre : "") : "Iniciar Sesión"}</CHeaderNavLink>
        </CHeaderNavItem>
        
      </CHeaderNav>
      <CHeaderNav className="d-md-down-none mr-auto">
        
        <CHeaderNavItem>
          <CForm inline>
            <CInput
              className="mr-2"
              placeholder="Buscar"
              size="md"
            />
            <CButton color="light" className="my-2 my-sm-0" type="submit">Buscar</CButton>
          </CForm>
        </CHeaderNavItem>
        
      </CHeaderNav>

      <CHeaderNav className="px-3">
        {user ? <TheHeaderDropdownMssg user={user}/> : <></>}
        <TheHeaderDropdown loginAuth={loginAuth}/>
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter 
          className="border-0 c-subheader-nav m-0 px-0 px-md-3" 
          routes={routes} 
        />
      </CSubheader>
    </CHeader>
    <CModal 
      show={confirmacion} 
      onClose={() => setConfirmacion(!confirmacion)}
      size="sm"
    >
      <CModalHeader closeButton>
        <CModalTitle>Login</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CFormGroup>
              <CLabel>Correo</CLabel>
              <CInput id="user" placeholder="Ingrese su correo" required onChange={onChange('usuario')} value={usuario}/>
          </CFormGroup>
          <CFormGroup>
              <CLabel>Contraseña</CLabel>
              <CInput type='password' id="password" placeholder="Ingrese su clave" required onChange={onChange('clave')} value={clave}/>
          </CFormGroup>
        </CForm>
        {error && <p style={{color: 'red'}}>Correo o contraseña incorrectos</p>}
      </CModalBody>
      <CModalFooter>
        <CButton  onClick={() => cambioModal()}>
          Registrarse
        </CButton>
        <CButton color="primary" onClick={() => onSubmit()}>
          Iniciar sesión
        </CButton>
      </CModalFooter>
    </CModal>
    <CModal 
      show={registrarse} 
      onClose={() => setRegistrarse(!registrarse)}
      size="sm"
    >
      <CModalHeader closeButton>
        <CModalTitle>Registrarse</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CFormGroup>
              <CLabel>Correo</CLabel>
              <CInput id="user1" placeholder="Ingrese su correo" required onChange={onChange('usuario')} value={usuario}/>
          </CFormGroup>
          <CFormGroup>
              <CLabel>Contraseña</CLabel>
              <CInput type='password' id="password1" placeholder="Ingrese su clave" required onChange={onChange('clave')} value={clave}/>
          </CFormGroup>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton  onClick={() => cambioModal()}>
          Ya tengo cuenta
        </CButton>
        <CButton color="primary" onClick={() => onSubmit()}>
          Registrarse
        </CButton>
      </CModalFooter>
    </CModal>
    {createResults.length >= 1 ?  createResults.map((notification, index) => <Notification key={index} notif={notification} />) : <></>}
  </>
  )
}

export default TheHeader
