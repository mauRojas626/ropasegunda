import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom';

const TheHeaderDropdown = ({ loginAuth }) => {

  const user = useSelector(state => state.auth.user);
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
          <CIcon name="cil-user" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem>
          <Link className="link" to="/perfil">
            <CIcon name="cil-user" className="mfe-2" />
            Perfil
          </Link>
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={() => loginAuth()}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          {user ? 'Cerrar Sesión' : 'Iniciar Sesión'}
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
