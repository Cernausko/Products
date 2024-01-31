import { useState, useContext, useEffect } from "react";
import { loginUser } from "../../services/userService";
import { AppContext } from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";


const LoginForm = ()=>{
    const [credentials, setCredentials] = useState({
        email:'',
        password:''
    })

    const [errorMessages, setErrorMessages] = useState()
    const {setAuthToken, authToken} = useContext(AppContext);

    const handleChange = (event) =>{
        const { value } = event.target;
        setCredentials({
            ...credentials,
            [event.target.name]:value
        })
    }

    const submitHandler = (e)=>{
        e.preventDefault();
        loginUser(credentials).then(data=>data.status?setAuthToken(data.data.access_token):setErrorMessages({"message": data.message , "errors": data.errors}))
    }
    
    const navigate = useNavigate();
    useEffect(()=>{
      if(authToken) navigate('/products/1')
    },[authToken])

    return (
        <div className="container-fluid">
    <div className="row">
        <div className="col-md-4 offset-md-4">
        <form onSubmit={submitHandler} className=" text-center  bg-default mb-3">
            <h1>PRISIJUNGIMAS</h1>
            <input onChange={handleChange} type="text" id="email" name="email" className="form-control input-sm chat-input" placeholder="Jūsų el.pašto adresas" />
            <input onChange={handleChange} type="password" id="password" name="password" className="form-control input-sm chat-input mt-3" placeholder="Jūsų slaptažodis" />
            <button type="submit" className="btn btn-primary mt-2 w-100">Prisijungti</button>
            <div className="mt-2">
            {errorMessages?
              errorMessages.errors?
                Object.entries(errorMessages.errors).map(([field, errorMessage]) =>(
                  <p key={field} className="text-start text-danger">{errorMessage}</p>
                ))
                : <p className="text-start text-danger">{errorMessages.message}</p>     
              :<></>} 
            </div>
            <div><span>Neturite paskyros?</span><Link to="/register"> Užsiregistruokite!</Link></div>
        </form>
    </div>
    </div>
</div>
    )
}


export default LoginForm