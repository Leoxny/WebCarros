import { ReactNode, useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Navigate } from "react-router-dom"

interface PrivateProps {
    children: ReactNode
}
export const Private = ({ children }: PrivateProps) => {

    const { signed, loadingAuth } = useContext(AuthContext)

    if (loadingAuth) {
        return <div></div>
    } // quando estiver logado

    if (!signed) {
        return <Navigate to="/login" />
    } // se nao estiver logado

    return children 
}