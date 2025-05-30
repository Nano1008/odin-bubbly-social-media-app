"use client";

function SignInPage() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const handleSignIn = () => {
    // Redirect to the GitHub OAuth URL
    window.location.href = `${API_BASE_URL}/auth/github`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome to Bubbly</h1>
        <button
          onClick={handleSignIn}
          className="bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-800 transition"
        >
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
}

export default SignInPage;
