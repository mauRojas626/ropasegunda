import React from 'react'
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
  CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { toggleSidebar as toggleSidebarAction } from '../services/redux/actions/changeState'

// routes config
import routes from '../routes/routes'

import { 
  TheHeaderDropdown,
  TheHeaderDropdownMssg
}  from './index'

const TheHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.changeState.sidebarShow)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch(toggleSidebarAction(val))
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch(toggleSidebarAction(val))
  }
  
  return (
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
          <CHeaderNavLink to="/perfil">Usuario</CHeaderNavLink>
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
        <TheHeaderDropdownMssg/>
        <TheHeaderDropdown/>
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter 
          className="border-0 c-subheader-nav m-0 px-0 px-md-3" 
          routes={routes} 
        />
      </CSubheader>
    </CHeader>
  )
}

export default TheHeader
