import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { checkLoginStatus, logoutUser } from "../../services/userService"
import { AppContext } from "../../context/AppContext"
import { useContext } from "react"

const Management = ()=>{
    const [userData, setUserData] = useState()
    const navigate = useNavigate();
    const {authToken, removeAuthToken} = useContext(AppContext);

    useEffect(()=>{
        if(authToken)
        {
            checkLoginStatus(authToken).then(data => setUserData(data.data))
        }
    }, [authToken])

    const handleLogout = () =>{
        logoutUser(authToken)
        removeAuthToken()
        setUserData('')
    }

    return(
        <>
        {
        userData?
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Valdymas</a>
                <ul className="dropdown-menu">
                    <li><p className="dropdown-item"> Jūsų vartotojo vardas: <span className="text-primary">{userData.name}</span></p></li>
                  <li><Link className="dropdown-item" to="/userproducts/1">Mano produktų valdymas</Link></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>Atsijungti</button></li>
                </ul>
            </li>
        :
            <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/login">Produktų administravimas</Link>
            </li>
        }
        </>
    )
}

export default Management