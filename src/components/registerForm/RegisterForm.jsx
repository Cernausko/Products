import { useState } from "react";
import { registerUser } from "../../services/userService";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";


const RegisterForm = ()=>{
    const [regData, setRegData] = useState({
        name:'',
        email:'',
        password:'',
        password_confirmation:''
    })

    const [errorMessages, setErrorMessages] = useState()
    const {setAuthToken, authToken} = useContext(AppContext);

    const handleChange = (event) =>{
        const { value } = event.target;
        setRegData({
            ...regData,
            [event.target.name]:value
        })
    }

    const submitHandler = (e)=>{
      e.preventDefault();
      registerUser(regData).then(data=>data.status?setAuthToken(data.data.access_token):setErrorMessages(data.errors))
    }

    const navigate = useNavigate();
    useEffect(()=>{
      if(authToken) navigate('/products/1')
    },[authToken])

    return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4 offset-md-4">
             <form onSubmit={submitHandler} className="text-center bg-default mb-3">
              <h1>REGISTRACIJA</h1>
              <input onChange={handleChange} type="text" id="name" name="name" className="form-control input-sm chat-input" placeholder="Jūsų vartotojo vardas" />
              <input onChange={handleChange} type="text" id="email" name="email" className="form-control input-sm chat-input mt-3" placeholder="Jūsų el. pašto adresas" />
              <input onChange={handleChange} type="password" id="password" name="password" className="form-control input-sm chat-input mt-3" placeholder="Jūsų slaptažodis" />
              <input onChange={handleChange} type="password" id="password_confirmation" name="password_confirmation" className="form-control input-sm chat-input mt-3" placeholder="Pakartoti slaptažodi" />
              <button type="submit" className="btn btn-primary mt-2 w-100">Užsiregistruoti</button>
              <div className="mt-2">
                {errorMessages?
                  Object.entries(errorMessages).map(([field, message]) =>(
                    <p key={field} className="text-start text-danger">{message}</p>
                  ))         
                  :<></>}
              </div>
              <div><span>Jau turite paskyrą?</span><Link to="/login"> Prisijunkite!</Link></div>
              </form>
            </div>
           </div>
        </div>
    )
}


export default RegisterForm