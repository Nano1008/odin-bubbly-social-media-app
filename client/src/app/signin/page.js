"use client";

import GithubIcon from "@/components/GithubIcon";

function SignInPage() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const handleSignIn = () => {
    // Redirect to the GitHub OAuth URL
    window.location.href = `${API_BASE_URL}/auth/github`;
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

        <button
          onClick={handleSignIn}
          className="w-full p-4 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white font-semibold rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <GithubIcon />
          <span>Sign in with GitHub</span>
        </button>
      </div>
    </div>
  );
}

export default SignInPage;
