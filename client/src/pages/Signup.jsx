import { Button, Label, TextInput, Alert, Spinner } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "../components/Oauth.jsx"
export default function Signup() {
  const [formd, setform] = useState({});
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setform({ ...formd, [e.target.id]: e.target.value.trim() });
  };
  console.log(formd);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formd.username||!formd.email||!formd.password){
      setError("Please fill all the fields");
    }
    console.log(formd);
    try {
      setloading(true)

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formd),
      });
      const data = await response.json();
      console.log(data);
      if(data.success===false){
        setError(data.message);
      

      }
      setloading(false)
      if(response.ok){
  
        navigate("/signin")
      }

     
    } catch (err) {
      console.log(err);
      setloading(false)
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

          {/* Right Column - Sign Up Form */}
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <Label
                    htmlFor="username"
                    value="Username"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  />
                  <TextInput
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    className="mt-1"
                    required
                    onChange={handleChange}
                  />
                </div>

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
                    placeholder="Create a password"
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
                 {
                  loading ?(
                    <>
                     <Spinner size="sm" />
                     <span className="pl-3">Loading...</span>
                    
                    
                    </>
                   
                 
                   ) : 'Sign Up'
                  
                 }
                </Button>
                <Oauth/>
              </form>

              <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="font-medium text-indigo-500 hover:text-indigo-400 transition-colors"
                >
                  Sign in
                </Link>
              </div>
              {
                error && (
                  <Alert className="mt-5 "
                  color="failure">
{error}
                  </Alert>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
