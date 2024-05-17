import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { userInfo } from '../slices/authSlice'
import { toast } from 'react-toastify'

const PrivateRoute = () => {
    const credentials = useSelector(userInfo)
    return credentials ? <Outlet /> : <Navigate to='/login' replace />
}

export default PrivateRoute