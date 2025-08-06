import React from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Background from "../assets/CineAIbg.jpg";
import AppLogo from "../assets/default.svg";

const SignIn = ({ supabase }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={AppLogo}
          alt="CineAI Logo"
          style={{ width: "300px", height: "auto", marginBottom: "2rem" }}
        />

        <div style={{ width: "100%", maxWidth: "400px" }}>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "blue",
                    brandAccent: "green",
                  },
                },
              },
            }}
            providers={["google", "github"]}
          />
        </div>
      </div>
    </>
  );
};

export default SignIn;
