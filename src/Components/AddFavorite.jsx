import React from "react";
import { supabase } from "../Utils/SupabaseClient";

const AddFavorite = async (userId, movieId, movieType, isFavorite) => {
  console.log(userId, movieId, isFavorite);

  try {
    if (isFavorite) {
      // ADD to favorites
      const { error } = await supabase.from("favorites").insert([
        {
          user_id: userId,
          movie_id: movieId,
          type: movieType,
        },
      ]);

      if (error) throw error;
      console.log("✅ Added to favorites");
    }
    //Delete favorite
    else {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", userId)
        .eq("movie_id", movieId);

      if (error) throw error;
      console.log("❌ Removed from favorites");
    }
  } catch (err) {
    console.error("Supabase error:", err.message);
  }

  return;
};

export default AddFavorite;
