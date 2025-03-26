import { USER_ROLE } from 'constants.js';
import React from 'react'
import { useSelector } from 'react-redux'

const dashboard = () => {
  const {currentUser} = useSelector((state)=> state.auth);
  return (
    <div>{currentUser?.role === USER_ROLE.Admin ? 'Admin Dashboard' : 'Customer Dashboard'}</div>
  )
}

export default dashboard