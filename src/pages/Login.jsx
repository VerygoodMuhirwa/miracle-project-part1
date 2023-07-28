import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {
  AiFillGithub,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { signInWithFacebook, signInWithGithub, signInWithGoogle } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useLogin } from "../helpers/useLogin";
import { loggedActions } from "../store/slices/LoggedInSlice";
import { formDataActions } from "../store/slices/formData";
import { aboutActions } from "../store/slices/aboutSlice";

// schema fro data
const schema = yup.object().shape({
  email: yup.string().email().required("this field is required"),
  password: yup
    .string()
    .min(4, "password must have minimum 4 characters")
    .required("password is required"),
});

const Login = () => {
  // form handling
  const dispatch=useDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error,setError]=useState(false)
  const {
    handleSubmit,
    register,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleInputChange = () => {
    setError(false)
    clearErrors(); // Clear all errors when the user interacts with the inputs
  };
 
  const handleSubmission =async (data) => {
    setIsSubmitting(true)
    const res = await useLogin({
      email: data.email,
      password: data.password,
    });

    setIsSubmitting(false);

    if (res.success) {
      dispatch(loggedActions.loggedUser({username:res.data.user.name,userData:res.data}))

 
      dispatch(aboutActions.setAbout(res.data.profile.about?{description:about.description,slectedTime:about.slectedTime}:{description:"",selctedTime:[]}))
    } else {
     setError(true)
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };



  //login with platform

//   sign up with difference platform
const handleWithGoogle=async()=>{
  const ress=await signInWithGoogle()
  setIsSubmitting(true)
  const res = await useLogin({
    email: ress.user.email,
    password:"1234567890",
  });

  setIsSubmitting(false);

  if (res.success) {
    dispatch(loggedActions.loggedUser({username:res.data.user.name,userData:res.data}))
  } else {
   setError(true)
  }
}
const handleWithFacebook=async()=>{
  const ress = await signInWithFacebook();
  setIsSubmitting(true);
  console.log(ress);
  const res = await useLogin({
    email: ress.user.email,
    password: "1234567890",
  });

  setIsSubmitting(false);

  if (res.success) {
    dispatch(
      loggedActions.loggedUser({
        username: res.data.user.name,
        userData: res.data,
      })
    );
  } else {
    setError(true);
  }
}
const handleWithGithub=async()=>{
  const ress = await signInWithGithub();
  console.log(ress.user.providerData[0].email);
  setIsSubmitting(true);
  const res = await useLogin({
    email: ress.user.providerData[0].email,
    password: "1234567890",
  });

  setIsSubmitting(false);

  if (res.success) {
    console.log(res.data.user);
    dispatch(
      loggedActions.loggedUser({
        username: res.data.user.name,
        userData: res.data,
      })
    );
  } else {
    setError(true);
  }
}


const isLoggedIn = useSelector((state) => state.logged.loggedIn);
  return (
    <>
    {!isLoggedIn && (
      <div>
      <div className="bg-[#D9D9D9]  flex justify-center items-center py-16">
            <div className="bg-white flex      gap-5   rounded-lg border-2  flex-col md:px-16  sm:px-16 md:py-[4.8em] ss:py-[5%] ss:px-[5%]    ss:w-[95%] sm:w-[95%] md:w-[60%] ss:px-15 ss:py-30 ">
              <h1 className="text-2xl  font-medium  ss:ml-[5%]">Log in</h1>
          <form
                className="flex flex-col gap-5  ss:ml-[1%]"
            onSubmit={handleSubmit(handleSubmission)}
          >
            <div className="flex flex-col">
              <label htmlFor="email" className="text-[#666666]">
                {" "}
                Email address 
              </label>
              <input
                type="email"
                id="email"
                className={`border-2 rounded-lg h-12 focus:outline-none px-5 ${
                  error || errors?.email?.message ? "border-red-500" : ""
                }`}
                {...register("email")}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row justify-between">
                <label htmlFor="password" className="text-[#666666]">
                  Password
                </label>
                {/* Step 3: Use the state variable to conditionally set input type */}
                <div
                      className="flex flex-row items-center gap-2  mr-[2%] cursor-pointer"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? (
                    <AiOutlineEye size={22} />
                  ) : (
                    <AiOutlineEyeInvisible size={22} />
                  )}
                  <p className="text-[#666666]  ">
                    {showPassword ? "Hide" : "Show"}
                  </p>
                </div>
              </div>
              <input
                type={showPassword ? "text" : "password"} // Use showPassword state to toggle the input type
                id="password"
                className={`border-2 rounded-lg h-12 focus:outline-none px-5 ${
                 error || errors?.password?.message ? "border-red-500" : ""
                }`}
                {...register("password")}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-row gap-3">
              <input type="checkbox" name="rememberMe" id="" />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <div className="flex flex-col gap-3">
              <p>
                By continuing, you agree to the{" "}
                <span className="underline cursor-pointer">
                  Terms of use and Privacy Policy.
                </span>
              </p>
              <input
                type="submit"
                value="Log in"
                className={` text-white w-full rounded-3xl h-12 font-bold  hover:cursor-pointer  ${isSubmitting ?"bg-[#222222]" :"bg-[#C4C4C4]"}`}
                disabled={isSubmitting}
              />
            </div>
            <div className="flex flex-1 justify-center items-center">
              <p className="underline font-bold hover:cursor-pointer">
                Forget your password
              </p>
            </div>
                <div className="gap-3 justify-center items-center ss:flex ss:flex-col sm:flex sm:flex-row">
              <p>Don’t have an acount? </p>
              <Link to="/signUp" className="underline font-bold">
                Sign up{" "}
              </Link>
            </div>
            <div>
              <img
                src="/assets/continue.png"
                alt=" continue with"
                className="object-contain"
              />
            </div>
            <div className="flex flex-row items-center  justify-center gap-5">
              <div onClick={handleWithGoogle} className="hover:cursor-pointer">
                <FcGoogle  size={24}/>
              </div>
              <div onClick={handleWithFacebook} className="hover:cursor-pointer">
                <img
                  src="/assets/Facebook.png"
                  alt="facebook"
                  className="object-contain"
                />
              </div>
              <div onClick={()=>{}} className="hover:cursor-pointer">
                <img
                  src="/assets/LinkedIn.png"
                  alt=" linkedIn "
                  className="object-contain"
                />
              </div>
              <div onClick={handleWithGithub} className="hover:cursor-pointer">
                <AiFillGithub  size={24}/>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    )}
    </>
    
  );
};

export default Login;
