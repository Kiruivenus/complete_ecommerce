import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function validateInputs() {
    const { userName, email, password } = formData;
    if (!userName || !email || !password) {
      toast({
        title: "All fields are required.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  }

  function onSubmit(event) {
    event.preventDefault();
    if (!validateInputs()) return;
    setIsLoading(true);
    dispatch(registerUser(formData))
      .then((data) => {
        if (data?.payload?.success) {
          toast({ title: data?.payload?.message });
          navigate("/auth/login");
        } else {
          toast({
            title: data?.payload?.message,
            variant: "destructive",
          });
        }
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-100 via-white to-indigo-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-lg">
        {/* Logo */}
        <div className="text-center">
          <img src="https://i.im.ge/2025/01/16/zGPIVr.1001529478.png" className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-2xl font-extrabold text-gray-800">
            Create a New Account
          </h1>
          <p className="mt-2 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-indigo-600 hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Form */}
        <CommonForm
          formControls={registerFormControls}
          buttonText={isLoading ? "Signing Up..." : "Sign Up"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          By signing up, you agree to our{" "}
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

export default AuthRegister;
