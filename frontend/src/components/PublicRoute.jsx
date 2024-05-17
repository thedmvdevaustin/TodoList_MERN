import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { userInfo } from '../slices/authSlice'
import { toast } from 'react-toastify'

const PublicRoute = () => {
    const credentials = useSelector(userInfo)
    return credentials ? <Navigate to='/dashboard' replace /> : <Outlet />
    
}

export default PublicRoute