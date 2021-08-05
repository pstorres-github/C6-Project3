import './AccountTypeIcons.css'

import AuthenticationContext from '../AuthenticationContext'
import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIdCardAlt, faCertificate, faUserAlt } from '@fortawesome/free-solid-svg-icons'

const AccountTypeIcons = () => {
  const authContext = useContext(AuthenticationContext)

  let icon
  // console.log(`account type`, authContext.accountType)
  
  if (authContext.accountType == 'admin') {
      // console.log('admin-icon') 
      // icon = 'admin-icon' 
      icon = <FontAwesomeIcon className="fontawesome-icon-correction" icon={faCertificate} /> 
      return icon
  } else if (authContext.accountType == 'customer') {
      // console.log('customer-icon') 
      // icon = 'customer-icon'
      icon = <FontAwesomeIcon  className="fontawesome-icon-correction" icon={faUserAlt} /> 
      return icon
  } else if (authContext.accountType == 'pilot') {
      // console.log('pilot-icon') 
      // icon = 'pilot-icon'
      icon = <FontAwesomeIcon  className="fontawesome-icon-correction" icon={faIdCardAlt} /> 

      return icon
  } else {
      return icon
  }
}

export default AccountTypeIcons