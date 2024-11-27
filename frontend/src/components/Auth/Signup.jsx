/* eslint-disable no-unused-vars */
import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import ParticleRing from "../../pages/ParticleRing";
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return email.endsWith("@gmail.com");
  };

  const validatePassword = (password) => {
    const hasNumber = /\d/.test(password);
    const minLength = password.length >= 8;
    return hasNumber && minLength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Invalid email. Please use an email with '@gmail.com'.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Invalid password. Password must be at least 8 characters long and contain at least one number.");
      return;
    }

    try {
      const response = await axios.post("/api/v1/authentication/signup", {
        email,
        password
      });

      alert("Signup successful! You can now log in.");
      
      navigate("/login");

    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Signup failed");
      } else if (error.request) {
        setError("No response from server. Please try again.");
      } else {
        setError("Error during signup. Please try again.");
      }
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen">
      <div className="h-screen w-1/2 md:block hidden">
        <ParticleRing />
      </div>
      <div className="flex items-center justify-center md:px-4 px-0 md:py-10 py-0 sm:px-6 sm:py-16 lg:px-8 lg:py-24 md:w-1/2 w-screen md:h-full h-screen">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign up</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <NavLink to="/login">
              <span className="font-semibold text-black transition-all duration-200 hover:underline cursor-pointer">
                Sign in
              </span>
            </NavLink>
          </p>
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="space-y-5">
              {error && (
                <div className="text-red-500 text-sm mb-4">
                  {error}
                </div>
              )}
              <div>
                <label htmlFor="email" className="text-base font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="text-base font-medium text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Get started <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;