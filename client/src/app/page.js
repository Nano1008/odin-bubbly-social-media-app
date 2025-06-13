"use client";

import GithubIcon from "@/components/GithubIcon";
import GoogleIcon from "@/components/GoogleIcon";

function SignInPage() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const handleSignIn = () => {
    // Redirect to the GitHub OAuth URL
    window.location.href = `${API_BASE_URL}/auth/github`;
  };
  const handleSignInGoogle = () => {
    // Redirect to the Google OAuth URL
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-2xl max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🫧</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent mb-2">
            Bubbly
          </h1>
          <p className="text-gray-500 text-sm">Connect with gentle souls</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleSignIn}
            className="w-full p-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold rounded-2xl border border-gray-200 shadow-sm transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <GithubIcon />
            <span>Sign in with GitHub</span>
          </button>
          <button
            onClick={handleSignInGoogle}
            className="w-full p-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold rounded-2xl border border-gray-200 shadow-sm transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <GoogleIcon />
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
