import { useForgetPassword } from "@/api/userQueriesAndMutation";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Countdown from "react-countdown";
import useIsLoggedin from "@/hooks/useIsLoggedin";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSendClicked, setIsSendClicked] = useState(false);

  const { mutate: hndlForgetPassword, isPending } = useForgetPassword();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSendClicked(true);
    hndlForgetPassword(email, {
      onError: (err) => {
        //TODO show toast here instead of alert
        setError(err.message);
      },
      onSuccess: () => {
        setMessage(
          "Please check your email for the link to reset your password"
        );
      },
    });
  };

  const countDownRenderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      setIsSendClicked(false);
      return <span>You are good to go!</span>;
    } else {
      return (
        <span className="text-blue-400 ml-1">
          {minutes}:{seconds}
        </span>
      );
    }
  };
  const isLoggedin = useIsLoggedin();
  if (isLoggedin) return <Navigate to="/" replace />;

  return (
    <>
      <div className="flex flex-row items-center ml-4 min-h-96 mb-36">
        <img
          src="/images/fgtpass2.png"
          alt="fgtpassimg"
          className="hidden h-80 object-contain 2xl:block"
        />

        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Forget Password</h1>
          <p className="text-sm">
            Enter your email address and we will send you a link to reset your
            password.
          </p>
          <form className="mt-4 flex flex-row gap-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              disabled={isSendClicked}
              className={`bg-black text-white py-2 px-4 rounded flex flex-row disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isPending && <Loader2 />}Send
            </button>
          </form>
          {error && (
            <p className="my-2 ml-3">
              <span className="text-red-500 mr-1">Error:</span>
              {error}
              {error === "User not found" && (
                <p>
                  {" "}
                  Please check your email address and try again or try{" "}
                  <Link to={"/signin"} className="text-blue-500 underline">
                    {" "}
                    Signing Up
                  </Link>{" "}
                </p>
              )}
            </p>
          )}
          {message && isSendClicked && (
            <>
              <h2 className="text-lg font-bold my-2">{message}</h2>
              <div className="flex">
                Didn't receive the email? Resend again in :{" "}
                <Countdown
                  date={Date.now() + 60000}
                  renderer={countDownRenderer}
                  className="text-blue-500 ml-1"
                />
              </div>
            </>
          )}
        </div>

        <img
          src="/images/fgtpass.png"
          alt="fgtpass"
          className="hidden sm:block w-96 h-80 "
        />
      </div>
    </>
  );
};

export default ForgetPassword;
