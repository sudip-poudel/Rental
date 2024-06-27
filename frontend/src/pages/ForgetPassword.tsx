import { useForgetPassword } from "@/api/userQueriesAndMutation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const { mutate: hndlForgetPassword, isPending } = useForgetPassword();

  return (
    <div>
      <Navbar />
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
            password
          </p>
          <form className="mt-4 flex flex-row gap-4">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="button"
              className="bg-black text-white py-2 px-4 rounded"
              onClick={() => hndlForgetPassword(email)}
            >
              {isPending && <Loader2 />}Send
            </button>
          </form>
        </div>
        <img
          src="/images/fgtpass.png"
          alt="fgtpass"
          className="hidden sm:block w-96 h-80 "
        />
      </div>
      <Footer />
    </div>
  );
};

export default ForgetPassword;
