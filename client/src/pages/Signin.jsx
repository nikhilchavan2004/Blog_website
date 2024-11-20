import { Button, Label, TextInput, Alert, Spinner } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signinStart,
  signinSuccess,
  signinFailure,
} from "../redux/user/userSlice";
import Oauth from "../components/Oauth.jsx";

export default function Signin() {
  const [formd, setForm] = useState({ email: "", password: "" });
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...formd, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!formd.email || !formd.password) {
      return dispatch(signinFailure("All fields are required"));
    }

    try {
      dispatch(signinStart());
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formd),
      });
      const data = await response.json();

      if (!response.ok) {
        return dispatch(signinFailure(data.message || "Signin failed"));
      }

      // Dispatch success and navigate
      dispatch(signinSuccess(data));
      navigate("/home");
    } catch (err) {
      dispatch(signinFailure(err.message || "Something went wrong"));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-12">
          {/* Left Column - Branding */}
          <div className="flex-1 mb-8 md:mb-0">
            <Link to="/" className="inline-block">
              <div className="flex items-center">
                <span className="px-3 py-2 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-xl text-white text-4xl font-bold">
                  N
                </span>
                <span className="ml-2 text-4xl font-bold dark:text-white">
                  blog
                </span>
              </div>
            </Link>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
              Join our community of curious minds and passionate readers! Sign
              up now and become part of the conversation.
            </p>
          </div>

          {/* Right Column - Sign In Form */}
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <Label
                    htmlFor="email"
                    value="Email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  />
                  <TextInput
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="mt-1"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label
                    htmlFor="password"
                    value="Password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  />
                  <TextInput
                    id="password"
                    type="password"
                    placeholder="*********"
                    className="mt-1"
                    required
                    onChange={handleChange}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white font-medium rounded-xl py-2 px-20 hover:opacity-90 transition-opacity"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner size="sm" />
                      <span className="pl-3">Loading...</span>
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
                <Oauth />
              </form>

              <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                Don’t have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-indigo-500 hover:text-indigo-400 transition-colors"
                >
                  Sign-up
                </Link>
              </div>

              {error && (
                <Alert className="mt-5" color="failure">
                  {error}
                </Alert>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
