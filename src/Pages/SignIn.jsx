import React, { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Background from "../assets/CineAIbg.jpg";
import Header from "../Components/Header";

const SignIn = ({ supabase, setExploreType, setExplore, setCountryCode }) => {
  const [background, setBackground] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const demoEmail = "demo@example.com";
  const demoPassword = "demopassword";

  const backgroundApi = `https://api.themoviedb.org/3/movie/top_rated`;
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  useEffect(() => {
    const handleBackground = async () => {
      const response = await fetch(backgroundApi, options);
      const data = await response.json();

      let items = [];
      if (Array.isArray(data.results)) {
        items = data.results;
      } else if (typeof data.results === "object" && data.results !== null) {
        items = Object.values(data.results);
      }

      const topThreeWithPosters = items
        .filter((item) => item.poster_path)
        .slice(0, 3);
      setBackground(topThreeWithPosters);
    };

    handleBackground();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Demo login handler
  const handleDemoLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: demoEmail,
        password: demoPassword,
      });
      if (error) throw error;
      console.log("Demo login successful!");
      console.log("User:", data.user.email);
      console.log("Session:", data.session);
    } catch (err) {
      setError(err.message);
      console.error("Demo login failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="absolute inset-0 -z-10 h-full w-full items-center 
                [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"
    >
      <div className="relative w-full h-screen overflow-hidden">
        <div className="flex w-full h-full ">
          {background.map((item, index) => (
            <img
              key={index}
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={`Background poster ${index + 1}`}
              className="object-cover w-1/3 h-full "
            />
          ))}
          <div className="absolute inset-0 backdrop-blur-sm"></div>
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center">
        <Header
          supabase={supabase}
          setExploreType={setExploreType}
          setExplore={setExplore}
          setCountryCode={setCountryCode}
        />

        <div className="flex items-center justify-center min-h-screen w-full ">
          <div className="w-full max-w-md px-10 py-10 font-bold bg-gray-700  rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ">
            <button
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full py-3 px-4 mb-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>🚀</span>
              {loading ? "Logging in..." : "Try Demo Account"}
            </button>

            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-md text-white text-sm">
                <p className="font-medium">Login failed:</p>
                <p className="font-normal">{error}</p>
              </div>
            )}

            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: "black",
                      brandAccent: "green",
                      defaultText: "white",
                      inputText: "white",
                      messageText: "white",
                      inputPlaceholder: "white",
                      inputLabelText: "white",
                    },
                  },
                },
              }}
              providers={["google", "github"]}
              redirectTo={import.meta.env.VITE_REDIRECT_URI}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
