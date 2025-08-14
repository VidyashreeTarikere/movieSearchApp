import React, { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Background from "../assets/CineAIbg.jpg";
import Header from "../Components/Header";

const SignIn = ({ supabase, setExploreType, setExplore, setCountryCode }) => {
  const [background, setBackground] = useState([]);

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
            <div className="w-full max-w-md px-6 py-4 bg-black/30 backdrop-blur-sm border border-gray-100 rounded-md text-white text-center">
              <p className="mb-2 font-bold">Demo Account:</p>
              <p>
                Email: <span className="font-mono">{demoEmail}</span>
              </p>
              <p>
                Password: <span className="font-mono">{demoPassword}</span>
              </p>
            </div>

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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
