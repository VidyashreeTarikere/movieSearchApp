import "./App.css";
import { useEffect, useState } from "react";
import { supabase } from "./Utils/SupabaseClient";
import SignIn from "./Pages/SignIn";
import Header from "./Components/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Movies from "./Pages/MoviesPage";
import TVsPage from "./Pages/TVsPage";
import MyListPage from "./Pages/MyListPage";
import MovieDetails from "./Components/MovieDetails";

export default function App() {
  const [session, setSession] = useState(null);
  const [explore, setExplore] = useState(false);
  const [exploreType, setExploreType] = useState(null);
  const [countryCode, setCountryCode] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div>
        <SignIn supabase={supabase} />
      </div>
    );
  } else {
    return (
      <div className="w-full flex flex-col min-h-screen justify-between bg-[#040720] text-white">
        <div className="sticky top-0 z-50 bg-white shadow-sm">
          <Header
            supabase={supabase}
            setExploreType={setExploreType}
            setExplore={setExplore}
            setCountryCode={setCountryCode}
          />
        </div>

        <div className="flex-grow">
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    exploreType={exploreType}
                    setExploreType={setExploreType}
                    explore={explore}
                    setExplore={setExplore}
                    countryCode={countryCode}
                  />
                }
              />
              <Route
                path="/shows"
                element={
                  <TVsPage
                    exploreType={exploreType}
                    setExploreType={setExploreType}
                    explore={explore}
                    setExplore={setExplore}
                  />
                }
              />
              <Route
                path="/movies"
                element={
                  <Movies
                    exploreType={exploreType}
                    setExploreType={setExploreType}
                    explore={explore}
                    setExplore={setExplore}
                  />
                }
              />
              <Route
                path="/mylist"
                element={
                  session ? (
                    <MyListPage
                      exploreType={exploreType}
                      setExploreType={setExploreType}
                      explore={explore}
                      setExplore={setExplore}
                    />
                  ) : (
                    <Navigate to={"/signin"} />
                  )
                }
              />

              <Route path="/signin" element={<SignIn supabase={supabase} />} />

              <Route
                path="/details/:type/:id"
                element={<MovieDetails countryCode={countryCode} />}
              />
            </Routes>
          </main>
        </div>

        <div className="sticky bottom-0 z-50 bg-white shadow-sm">
          <Footer supabase={supabase} />
        </div>
      </div>
    );
  }
}
