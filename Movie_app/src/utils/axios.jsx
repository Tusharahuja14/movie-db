import React from 'react';
import axios from 'axios';
const instance=axios.create({
  baseURL:"https://api.themoviedb.org/3/",
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTEwYWY4OWIxOTBmZTI3MmZkODg1MDA3NjU0NzJkYiIsIm5iZiI6MTcyNDA0NTQxMS41MjM3NDYsInN1YiI6IjY2YzIyZWE4NWI5OTkyNjgwOTA3ZDhjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FVBrCFFGJ9AFlBn4V-v5P_D311WFJuZOaPbrOuofWsU'
  }
});


export default instance;