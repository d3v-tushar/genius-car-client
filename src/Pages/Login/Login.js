import React from "react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import image from '../../assets/images/login/login.svg';
import { AuthContext } from "../../context/AuthProvider";
import { setJsonToken } from "../../utlities/AuthToken";


const Login = () => {
    const {login} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    const handleLogin = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        login(email, password)
        .then(result =>{
            const user = result.user;

            //Alternative way to set jwt in localStorage
            setJsonToken(user);
            alert('Login Successfull', user?.displayName);
            navigate(from, {replace: true});

            // const currentUser = {
            //   email: user?.email
            // };
            // console.log(currentUser);

            // //Get JWT Token
            // fetch('https://genius-car-server-three-snowy.vercel.app/jwt', {
            //   method: 'POST',
            //   headers: {
            //     'content-type': 'application/json'
            //   },
            //   body: JSON.stringify(currentUser)
            // })
            // .then(res => res.json())
            // .then(data =>{
            //   console.log(data);
            //   //Local Storage is easiest but not the best place to store jwt token.
            //   localStorage.setItem('genius-Token', data.token);
            //   alert('Login Successfull', user?.displayName);
            //   navigate(from, {replace: true});
            // })
        })
        .catch(error => console.error(error.message))
    }
  return (
    <div className="hero w-full my-20">
      <div className="hero-content grid gap-10 md:grid-cols-2 flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <img className="w-3/4" src={image} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-20">
        <h1 className="text-5xl font-bold text-center">Login!</h1>
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                name="email"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered"
                name="password"
                required
              />
              <label className="label">
                <a href="/" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>
          <p className="text-center">New to Genius Car? <Link className="text-orange-600 font-bold" to='/signup'>Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
