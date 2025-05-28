"use client";

function SignInPage() {
  const handleSignIn = () => {
    // Redirect to the GitHub OAuth URL
    window.location.href = "http://localhost:3001/auth/github";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome to Bubbly</h1>
        <p className="text-gray-500">Sign in to continue</p>
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
