import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Signup() {
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
              Join our community of curious minds and passionate readers! Sign up now and become part of the conversation.
            </p>
          </div>

          {/* Right Column - Sign Up Form */}
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <form className="space-y-6">
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
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white font-medium rounded-xl py-2 px-20 hover:opacity-90 transition-opacity"
                >
                  Sign up
                </Button>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}