import React, { useCallback, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import Input from "@/components/Input";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // states for login and signup
  const [variant, setVariant] = useState("register");
  //function for toggling between login and signup
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  // functions to handle login and registration
  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", { username, email, password });

      //after registration, go to login
      login();
    } catch (error: any) {
      console.log(error);
    }
  }, [username, email, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpeg')] bg-cover bg-fixed bg-no-repeat">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12" />
        </nav>

        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 p-16 self-center mt-3 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign In" : "Register"}
            </h2>

            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  label="Username"
                  id="username"
                  value={username}
                  onChange={(ev: any) => setUsername(ev.target.value)}
                />
              )}
              <Input
                label="Email"
                id="email"
                type="email"
                value={email}
                onChange={(ev: any) => setEmail(ev.target.value)}
              />
              <Input
                label="Password"
                id="password"
                type="password"
                value={password}
                onChange={(ev: any) => setPassword(ev.target.value)}
              />
            </div>

            <button
              onClick={variant === "login" ? login : register}
              className="bg-red-600 hover:bg-red-700 transition duration-500 py-3 text-white mt-10 rounded-md w-full">
              {variant === "login" ? "Login" : "Sign Up"}
            </button>

            <div className="flex flex-row gap-4 justify-center items-center mt-8">
              <div
                onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                className="bg-white h-10 w-10 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                className="bg-white h-10 w-10 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FaGithub size={30} />
              </div>
            </div>

            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer">
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
