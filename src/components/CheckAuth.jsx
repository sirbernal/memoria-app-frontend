import { createContext } from "react"

const AuthContext = createContext()

function CheckAuth(auth, fallback, children) {
    return (
        <AuthContext.Provider value={ {auth, children, fallback} } >
            {auth && children}
            {!auth && fallback}
        </AuthContext.Provider>
    )

}

export {CheckAuth}