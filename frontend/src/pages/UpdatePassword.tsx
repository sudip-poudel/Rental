import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useUpdatePassword } from "@/api/userQueriesAndMutation";
import { Loader2 } from "lucide-react";

const UpdatePassword = () => {
  const [searchParam] = useSearchParams();
  const token = searchParam.get("token");
  const [error, setError] = useState("");
  const { mutate: updatePassword, isPending } = useUpdatePassword();
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      handleSubmit();
      setIsSubmitted(false);
    }
  }, [isSubmitted]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  if (!token) {
    return <Navigate to={"/"} replace />;
  }
  const handleSubmit = () => {
    updatePassword(
      { password, token },
      { onError: (error) => setError(error.message) }
    );
    console.log("test in");
  };

  return (
    <>
      <div className="flex justify-center flex-col items-center mt-14">
        <h2 className="font-bold text-lg my-4">
          Please enter your new password:{" "}
        </h2>
        {error && <p>{error}</p>}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              New Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <AlertDialog>
              <AlertDialogTrigger>
                <Button
                  type="button"
                  className=" text-white font-bold py-2 px-4 rounded flex items-center focus:outline-none focus:shadow-outline"
                >
                  {isPending && <Loader2 />} Update Password
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will change your
                    password.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button type="button" onClick={() => setIsSubmitted(true)}>
                      Continue
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdatePassword;
