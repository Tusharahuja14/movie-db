import axios from "../../utils/axios";
import { loadmovie } from "../reducers/movieSlice";


export const asyncloadmovie = (id) => async (dispatch, getState) => {
  try {
  
    if (!id) {
      console.error("Movie ID is undefined or null");
      return;
    }


    const detail = await axios.get(`/movie/${id}`);
    const externalid = await axios.get(`/movie/${id}/external_ids`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const watchproviders = await axios.get(`/movie/${id}/watch/providers`);

 
    console.log("Watch Providers Data:", watchproviders.data);

   
    const watchProvidersIN = watchproviders.data.results?.IN || null;


    const theultimateproviders = {
      detail: detail.data,
      externalid: externalid.data,
      recommendations: recommendations.data.results || [],
      similar: similar.data.results || [],
      videos: videos.data.results.find(m => m.type === "Trailer") || [],
      watchproviders: watchProvidersIN, 
    };


    dispatch(loadmovie(theultimateproviders));

    console.log("Final Movie Data:", theultimateproviders);
  } catch (error) {

    console.error("Error loading movie data:", error.response ? error.response.data : error.message);
  }
};
