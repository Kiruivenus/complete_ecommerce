import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    }).finally(() => setIsLoading(false));
  }

  return (
    <div>
      <div className="w-full max-w-md space-y-3 p-11 bg-indigo-300 rounded-lg shadow-lg">
        {/* Logo */}
        <div className="text-center">
          <img src="https://i.im.ge/2025/01/16/zGPIVr.1001529478.png"  className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-3xl font-extrabold text-gray-800">
            Sign in to your account
          </h1>
          <p className="mt-2 text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/auth/register"
              className="text-indigo-600 hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </div>

        {/* Form */}
        <CommonForm
          formControls={loginFormControls}
          buttonText={isLoading ? "Signing In..." : "Sign In"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-4">
          By logging in, you agree to our{" "}
          <Link to="" className="underline text-indigo-600">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="" className="underline text-indigo-600">
            Privacy Policy
          </Link>.
        </div>
      </div>
    </div>
  );
}

export default AuthLogin;
