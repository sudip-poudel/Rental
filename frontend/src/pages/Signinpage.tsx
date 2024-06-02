import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";

//type definitions for Error handling
type ErrorType = {
  error: string;
  errorMessage: string;
};

// const Signup = () => {
//   const [emailError, setEmailError] = useState<ErrorType[]>([]);
//   const [passwordError, setPasswordError] = useState<ErrorType[]>([]);
//   const [signupInput, setSignupInput] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const signupWithGoogle = () => {
//     window.location.href = "/auth/google";
//   };

//   const signupWithFacebook = () => {
//     window.location.href = "/auth/facebook";
//   };
//   const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

//   useEffect(() => {
//     setTimeout(() => {
//       // if (input.email === "" ) {
//       //   setEmailError([
//       //     {
//       //       error: "Email ",
//       //       errorMessage: "Email field must be provided",
//       //     },
//       //   ]);
//       //   console.log(emailError);
//       // }
//       if (!regEx.test(signupInput.email) && signupInput.email.length > 0) {
//         console.log(regEx.test(signupInput.email));

//         setEmailError([{ error: "Email", errorMessage: "Email is not valid" }]);
//       } else {
//         setEmailError([]);
//       }
//       // if (input.password === "") {
//       //   setPasswordError([
//       //     {
//       //       error: "Password",
//       //       errorMessage: "Password field must be provided",
//       //     },
//       //   ]);
//       // }
//       if (
//         signupInput.password.length <= 6 &&
//         !(signupInput.password.length == 0)
//       ) {
//         setPasswordError([
//           {
//             error: "Password",
//             errorMessage: "Password must be at least 6 characters",
//           },
//         ]);
//       } else {
//         setPasswordError([]);
//       }
//     }, 2000);
//   }, [signupInput]);
// };

const Signup = ({ loginWithFacebook, loginWithGoogle }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState<ErrorType[]>([]);
  const [passwordError, setPasswordError] = useState<ErrorType[]>([]);

  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const signupWithGoogle = () => {
    window.location.href = "/auth/google";
  };
  const signupWithFacebook = () => {
    window.location.href = "/auth/facebook";
  };

  const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  useEffect(() => {
    setTimeout(() => {
      if (signupInput.name === "") {
        setEmailError([
          {
            error: "Name ",
            errorMessage: "Name must be provided",
          },
        ]);
        console.log(emailError);
      }
      if (!regEx.test(signupInput.email) && signupInput.email.length > 0) {
        console.log(regEx.test(signupInput.email));

        setEmailError([{ error: "Email", errorMessage: "Email is not valid" }]);
      } else {
        setEmailError([]);
      }
      // if (input.password === "") {
      //   setPasswordError([
      //     {
      //       error: "Password",
      //       errorMessage: "Password field must be provided",
      //     },
      //   ]);
      // }
      if (
        signupInput.password.length <= 6 &&
        !(signupInput.password.length == 0)
      ) {
        setPasswordError([
          {
            error: "Password",
            errorMessage: "Password must be at least 6 characters",
          },
        ]);
      } else {
        setPasswordError([]);
      }
    }, 2000);
  }, [signupInput]);

  return (
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
              placeholder="Full Name..."
              // onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email address..."
              // onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className=" relative flex flex-row items-center mb-4 border rounded-lg">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Create password..."
              // onChange={handleInputChange}
              required
              className="w-full px-4 py-2 focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </span>
          </div>
          <div className=" relative flex flex-row items-center mb-4 border rounded-lg ">
            <input
              type={showPassword ? "text" : "password"}
              id="Cpassword"
              name="retype Password"
              // onChange={handleInputChange}
              placeholder="Confirm password..."
              required
              className="w-full px-4 py-2  focus:outline-none focus:ring-2 focus:ring-blue-600 focus:rounded-lg"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </span>
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
            onClick={signupWithGoogle}
            className="w-full  text-black py-2 rounded-lg hover:bg-blue-300   mb-2"
          >
            Continue with Google
          </button>
          <button
            type="button"
            onClick={signupWithFacebook}
            className="w-full  text-black py-2 rounded-lg hover:bg-blue-300 "
          >
            Continue with Facebook
          </button>
        </form>
      </div>
    </div>
  );
};

const Login = ({ loginWithFacebook, loginWithGoogle }) => {
  const [emailError, setEmailError] = useState<ErrorType[]>([]);
  const [passwordError, setPasswordError] = useState<ErrorType[]>([]);

  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  useEffect(() => {
    setTimeout(() => {
      // if (input.email === "" ) {
      //   setEmailError([
      //     {
      //       error: "Email ",
      //       errorMessage: "Email field must be provided",
      //     },
      //   ]);
      //   console.log(emailError);
      // }
      if (!regEx.test(loginInput.email) && loginInput.email.length > 0) {
        console.log(regEx.test(loginInput.email));

        setEmailError([{ error: "Email", errorMessage: "Email is not valid" }]);
      } else {
        setEmailError([]);
      }
      // if (input.password === "") {
      //   setPasswordError([
      //     {
      //       error: "Password",
      //       errorMessage: "Password field must be provided",
      //     },
      //   ]);
      // }
      if (
        loginInput.password.length <= 6 &&
        !(loginInput.password.length == 0)
      ) {
        setPasswordError([
          {
            error: "Password",
            errorMessage: "Password must be at least 6 characters",
          },
        ]);
      } else {
        setPasswordError([]);
      }
    }, 2000);
  }, [loginInput]);

  const handleSubmitEvent = (event) => {
    event.preventDefault();
    if (loginInput.email === "") {
      setEmailError([
        {
          error: "Email ",
          errorMessage: "Email field must be provided",
        },
      ]);
      console.log(emailError);
    }
    if (emailError.length === 0 && passwordError.length === 0) {
      // sent through api
    }
  };

  const handlelginInputChange = (event) => {
    setLoginInput({
      ...loginInput,
      [event.target.name]: event.target.value,
    });
  };

  return (
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
              onChange={handlelginInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {emailError.length > 0 && (
              <p className="text-red-700">{emailError[0].errorMessage}</p>
            )}
          </div>
          <div className=" relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              onChange={handlelginInputChange}
              placeholder="Password..."
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </span>

            {passwordError.length > 0 && (
              <p className="text-red-700">{passwordError[0].errorMessage}</p>
            )}
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
  );
};

const Signinpage = () => {
  const [isLogin, setIsLogin] = useState(true);
  let active = "bg-slate-500";

  const loginWithGoogle = () => {
    window.location.href = "/auth/google";
  };

  const loginWithFacebook = () => {
    window.location.href = "/auth/facebook";
  };

  return (
    <div className="bg-gray-700">
      <Navbar />
      <div className="flex flex-col  items-center justify-center">
        <div className="flex items-center justify-around bg-white   w-fit p-4">
          <div className="p-5">
            <Button
              onClick={() => setIsLogin(true)}
              className={`${isLogin ? "" : active} w-20 `}
            >
              Login
            </Button>
          </div>
          <div className="p-5">
            <Button
              onClick={() => setIsLogin(false)}
              className={`${!isLogin ? "" : active} w-20`}
            >
              Signup
            </Button>
          </div>
        </div>
        <div>
          {isLogin ? (
            <Login
              loginWithFacebook={loginWithFacebook}
              loginWithGoogle={loginWithGoogle}
            />
          ) : (
            <Signup
              loginWithFacebook={loginWithFacebook}
              loginWithGoogle={loginWithGoogle}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signinpage;
