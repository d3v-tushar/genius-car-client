import React from "react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import image from "../../assets/images/login/login.svg";
import { AuthContext } from "../../context/AuthProvider";
import useTitle from "../../CustomHook/useTitle";
import { setJsonToken } from "../../utlities/AuthToken";

const SignUp = () => {
  useTitle('Signup');
    const {craeteUser, googleSignIn, updateUserProfile} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, email, password);
    craeteUser(email, password)
    .then(result =>{
        const user = result.user;
        console.log(user);

        //Alternative way to set jwt in localStorage
        setJsonToken(user);
        alert('Signup Successfull', user?.displayName);
        navigate(from, {replace: true});
        updateUserProfile(name);
    })
    .catch(error => console.error(error));
  };

  //Google Signin
  const handleGoogleSignIn = () =>{
    googleSignIn()
    .then(result =>{
        const user = result.user;
        console.log(user);

        //Alternative way to set jwt in localStorage
        setJsonToken(user);
        alert('Successfull', user?.displayName);
        navigate(from, {replace: true});
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
          <h1 className="text-5xl font-bold text-center">Sign Up!</h1>
          <form onSubmit={handleSignUp} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered"
                name="name"
                required
              />
            </div>
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
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
          </form>
          <p className="text-center">
            Already have an account?{" "}
            <Link className="text-orange-600 font-bold" to="/login">
              Login
            </Link>
          </p>
          <button onClick={handleGoogleSignIn} className="btn btn-outline my-3">Google Signin</button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
