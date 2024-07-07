import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Eye, Loader2 } from "lucide-react";
import { EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useIsLoggedin from "@/hooks/useIsLoggedin";
import { useLogin, useSignup } from "@/api/userQueriesAndMutation";

//type definitions for Error handling
type ErrorType = {
  error: string;
  errorMessage: string;
};

//signup component
const Signup = ({
  signupWithGoogle,
  setIsLogin,
}: {
  signupWithGoogle: () => void;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState<ErrorType[]>([]);
  const [nameError, setNameError] = useState<ErrorType[]>([]);
  const [passwordError, setPasswordError] = useState<ErrorType[]>([]);
  const [confPasswordError, setConfPasswordError] = useState<ErrorType[]>([]);

  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const signupuser = useSignup();

  const regEx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!regEx.test(signupInput.email) && signupInput.email.length > 0) {
        console.log(regEx.test(signupInput.email));

        setEmailError([{ error: "Email", errorMessage: "Email is not valid" }]);
      } else {
        setEmailError([]);
      }
      if (
        signupInput.password.length < 6 &&
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
      if (signupInput.password === signupInput.confirmPassword) {
        setConfPasswordError([]);
      } else {
        console.log("Password");
        console.log(signupInput);
        setConfPasswordError([
          {
            error: "Password",
            errorMessage: "Passwords do not match",
          },
        ]);
        console.log(confPasswordError);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [signupInput]);

  const handleSignupInputChange = (event) => {
    setSignupInput({
      ...signupInput,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitEvent = async (event) => {
    event.preventDefault();

    if (signupInput.name === "") {
      setNameError([
        {
          error: "Name ",
          errorMessage: "Name must be provided",
        },
      ]);
      // console.log(nameError);
    }
    if (signupInput.email === "") {
      setEmailError([
        {
          error: "Email ",
          errorMessage: "Email field must be provided",
        },
      ]);
      console.log(emailError);
    }
    if (emailError.length === 0 && passwordError.length === 0) {
      signupuser.mutate(signupInput);
    }
  };

  return (
    <div className=" flex items-center justify-center w-96">
      <div className="bg-white p-8 shadow-2xl  rounded-lg w-full max-w-md">
        <h1 className=" text-2xl font-bold mb-6 text-center">
          Signup to RentHUB
        </h1>
        <form onSubmit={handleSubmitEvent}>
          <div className="mb-4">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Full Name..."
              onChange={handleSignupInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {nameError.length > 0 && (
              <p className="text-red-700">{nameError[0].errorMessage}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email address..."
              onChange={handleSignupInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {emailError.length > 0 && (
              <p className="text-red-700">{emailError[0].errorMessage}</p>
            )}
          </div>
          <div className=" relative mb-6 border rounded-lg">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Create password..."
              onChange={handleSignupInputChange}
              required
              className="w-full px-4 py-2 focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <span
              className="absolute right-[8px] top-[8px] cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </span>

            {passwordError.length > 0 && (
              <p className="text-red-700">{passwordError[0].errorMessage}</p>
            )}
          </div>
          <div className="relative mb-6 border  rounded-lg ">
            <input
              type={showPassword ? "text" : "password"}
              id="Cpassword"
              name="confirmPassword"
              onChange={handleSignupInputChange}
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
            {confPasswordError[0]?.errorMessage && (
              <p className="text-red-700">
                {confPasswordError[0].errorMessage}
              </p>
            )}
          </div>
          {signupuser.isError && (
            <p className="text-red-700 text-center">
              {signupuser.error.message}
            </p>
          )}
          <Button type="submit" className="w-full text-lg">
            Signup
          </Button>
          <div className="flex items-center justify-between my-4">
            <hr className=" w-full border-gray-300" />
            <span className="px-2 text-gray-600">or</span>
            <hr className="w-full border-gray-300" />
          </div>{" "}
          <Button
            type="button"
            onClick={() => signupWithGoogle()}
            className="w-full text-lg bg-red-500"
          >
            Continue with Google
          </Button>
        </form>
        <p className="mt-6 text-center flex">
          Already have an account?{" "}
          <p
            onClick={() => setIsLogin(true)}
            className="text-black-600 hover:underline"
          >
            Login here
          </p>
        </p>
      </div>
    </div>
  );
};

//login component
const Login = ({
  setIsLogin,
  loginWithGoogle,
}: {
  loginWithGoogle: () => void;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [emailError, setEmailError] = useState<ErrorType[]>([]);
  const [passwordError, setPasswordError] = useState<ErrorType[]>([]);

  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const loginuser = useLogin();

  const regEx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!regEx.test(loginInput.email) && loginInput.email.length > 0) {
        console.log(regEx.test(loginInput.email));

        setEmailError([{ error: "Email", errorMessage: "Email is not valid" }]);
      } else {
        setEmailError([]);
      }
      if (
        loginInput.password.length < 6 &&
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
    }, 300);
    return () => clearTimeout(timeout);
  }, [loginInput]);

  const handleSubmitEvent = async (event) => {
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
    if (loginInput.password === "") {
      setPasswordError([
        {
          error: "Password",
          errorMessage: "Password field must be provided",
        },
      ]);
    }
    if (emailError.length === 0 && passwordError.length === 0) {
      loginuser.mutate(loginInput);
    }
  };

  const handleloginInputChange = (event) => {
    setLoginInput({
      ...loginInput,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className=" w-96 flex items-center justify-center ">
      <div className="bg-white  p-8  rounded-lg shadow-2xl w-full max-w-md">
        <h1 className=" text-2xl font-bold mb-6 text-center">
          Login to RentHub
        </h1>
        <form onSubmit={handleSubmitEvent}>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email address..."
              onChange={handleloginInputChange}
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
              onChange={handleloginInputChange}
              placeholder="Password..."
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <span
              className="absolute right-[8px] top-[8px]
               cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </span>
            <Link to={"/forgetpassword"}>
              <p className="text-xs ml-2 hover:underline hover:text-blue-700 text-right">
                Forgot Password
              </p>
            </Link>

            {passwordError.length > 0 && (
              <p className="text-red-700">{passwordError[0].errorMessage}</p>
            )}
          </div>
          {loginuser.isError && (
            <p className="text-red-700 text-center ">
              {loginuser.error.message}
            </p>
          )}
          <Button
            type="submit"
            className="w-full text-lg"
            disabled={loginuser.isPending}
          >
            Login {loginuser.isPending && <Loader2 />}
          </Button>
          <div className="flex items-center justify-between my-4">
            <hr className=" w-full border-gray-300" />
            <span className="px-2 text-gray-600">or</span>
            <hr className="w-full border-gray-300" />
          </div>
          <Button
            type="button"
            onClick={() => loginWithGoogle()}
            className="w-full text-lg bg-transparent border-2 text-black hover:text-white"
          >
            Continue with Google
          </Button>
        </form>
        <p className="mt-6 text-center flex">
          Don't have an account?{" "}
          <p
            onClick={() => setIsLogin(false)}
            className="text-black-600 hover:underline"
          >
            Register here
          </p>
        </p>
      </div>
    </div>
  );
};

//signin page as parent for the signup and login
const Signinpage = () => {
  const isLoggedIn = useIsLoggedin();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const active = "bg-slate-500";
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const loginWithGoogle = () => {
    window.location.href = `${
      import.meta.env.VITE_BACKEND_URL as string
    }/user/googleoauth`;
    // window.location.href =
    //   "https://rental-backend-five.vercel.app/user/googleoauth";
  };

  return isLoggedIn ? (
    ""
  ) : (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-around w-96 h-16 rounded-sm mb-4">
          <div className="w-1/2 mx-1">
            <Button
              onClick={() => setIsLogin(true)}
              className={`${isLogin ? "" : active} w-full`}
            >
              Login
            </Button>
          </div>
          <div className="w-1/2 mx-1">
            <Button
              onClick={() => setIsLogin(false)}
              className={`${!isLogin ? "" : active} w-full `}
            >
              Signup
            </Button>
          </div>
        </div>
        <div>
          {isLogin ? (
            <Login loginWithGoogle={loginWithGoogle} setIsLogin={setIsLogin} />
          ) : (
            <Signup
              signupWithGoogle={loginWithGoogle}
              setIsLogin={setIsLogin}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Signinpage;
