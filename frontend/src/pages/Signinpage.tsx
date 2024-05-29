import { Button } from "@/components/ui/button";
import { Component, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Login = () => {
  const [islogin, setislogin] = useState(true);
  const loginWithGoogle = () => {
    window.location.href = "/auth/google";
  };

  const loginWithFacebook = () => {
    window.location.href = "/auth/facebook";
  };
  let active = "bg-slate-500";

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleSubmitEvent = (event) => {
    event.preventDefault();
    if (input.email !== "" && input.password !== "") {
      // sent through api
    }
    alert("Please enter your email and password");
  };

  const handleInputChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });

    console.log(event.target.value);
  };
  return (
    <>
      <Navbar />
      <div className="flex flex-col  items-center justify-center">
        <div className="flex items-center justify-around bg-white   w-fit p-4">
          <div className="p-5">
            <Button
              onClick={(e) => setislogin(true)}
              className={`${islogin ? "" : active}`}
            >
              Login
            </Button>
          </div>
          <div className="p-5">
            <Button
              onClick={(e) => setislogin(false)}
              className={`${!islogin ? "" : active}`}
            >
              Signup
            </Button>
          </div>
        </div>
        <div>
          {islogin ? (
            <div className="min-h-screen w-full  flex items-center justify-center ">
              <div className="bg-white  p-8 -mt-80 rounded-lg shadow-2xl w-full max-w-md">
                <h1 className=" text-2xl font-bold mb-6 text-center">
                  Login to RentalHUB
                </h1>
                <form onSubmit={handleSubmitEvent}>
                  <div className="mb-4">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email address..."
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div className="mb-6">
                    {/* <label htmlFor="password" className="block text-gray-700">
              Password:
            </label> */}
                    <input
                      type="password"
                      id="password"
                      name="password"
                      onChange={handleInputChange}
                      placeholder="Password..."
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <Button type="submit" className="w-full text-lg">
                    Login
                  </Button>
                  <div className="flex items-center justify-between my-4">
                    <hr className=" w-full border-gray-300" />
                    <span className="px-2 text-gray-600">or</span>
                    <hr className="w-full border-gray-300" />
                  </div>
                  <button
                    type="button"
                    onClick={loginWithGoogle}
                    className="w-full  text-black py-2 rounded-lg hover:bg-blue-300   mb-2"
                  >
                    Continue with Google
                  </button>
                  <button
                    type="button"
                    onClick={loginWithFacebook}
                    className="w-full  text-black py-2 rounded-lg hover:bg-blue-300 "
                  >
                    Continue with Facebook
                  </button>
                </form>
                <p className="mt-6 text-center">
                  Don't have an account?{" "}
                  <a href="/signup" className="text-black-600 hover:underline">
                    Register here
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <div className="min-h-screen flex items-center justify-center ">
              <div className="bg-white p-8 shadow-2xl -mt-60 rounded-lg w-full max-w-md">
                <h1 className=" text-2xl font-bold mb-6 text-center">
                  Signup to RentalHUB
                </h1>
                <form>
                  <div className="mb-4">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Name..."
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div className="mb-4">
                    {/* <label htmlFor="email" className="block text-gray-700">
              Email Address:
            </label> */}
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email address..."
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Create password..."
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      id="Cpassword"
                      name="retype Password"
                      onChange={handleInputChange}
                      placeholder="Confirm password..."
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <Button type="submit" className="w-full text-lg">
                    Signup
                  </Button>
                  <div className="flex items-center justify-between my-4">
                    <hr className=" w-full border-gray-300" />
                    <span className="px-2 text-gray-600">or</span>
                    <hr className="w-full border-gray-300" />
                  </div>
                  <button
                    type="button"
                    onClick={loginWithGoogle}
                    className="w-full  text-black py-2 rounded-lg hover:bg-blue-300   mb-2"
                  >
                    Continue with Google
                  </button>
                  <button
                    type="button"
                    onClick={loginWithFacebook}
                    className="w-full  text-black py-2 rounded-lg hover:bg-blue-300 "
                  >
                    Continue with Facebook
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
