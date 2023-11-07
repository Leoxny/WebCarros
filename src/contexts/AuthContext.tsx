import { ReactNode, createContext, useState, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebaseConnection";

type AuthContextData = {
    signed: boolean,
    loadingAuth: boolean
    handleInfoUser: ({ name, email, uid }: UserProps) => void
    user: UserProps | null
}

interface AuthProviderProps {
    children: ReactNode
}

interface UserProps {
    uid: string;
    name: string | null;
    email: string | null;
}

export const AuthContext = createContext({} as AuthContextData)

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [user, setUser] = useState<UserProps | null>(null) //signed false
    const [loadingAuth, setLoadingAuth] = useState(true)

    useEffect(() => {
        unsub()

        return () => {
            unsub()
        }

    }, [])

    const unsub = onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser({
                uid: user.uid,
                name: user?.displayName,
                email: user?.email
            })
            setLoadingAuth(false)
        } else {
            setUser(null)
            setLoadingAuth(false)
        }
    })

    const handleInfoUser = ({ name, email, uid }: UserProps) => {
        setUser({
            name,
            email,
            uid
        })
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, loadingAuth, handleInfoUser, user }}>
            {children}
        </AuthContext.Provider>
    )
}