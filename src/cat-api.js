import axios from "axios";
import SlimSelect from 'slim-select';
import '/node_modules/slim-select/dist/slimselect.css';


axios.defaults.headers.common["x-api-key"] = 'live_RxxcXFlBeqjOkTiYkNVckZxgXzlzKDCgj4zalQdqDKbqibMfv0AfMjx7UWYhseaD';
const BASE_URL = 'https://api.thecatapi.com/v1';


export function fetchBreeds() {
    const catUrl = `${BASE_URL}/breeds`;
    return axios
        .get(catUrl)
        .then(resp => resp.data
    )
        .catch(error => {
          //  console.log(err)
        throw error
        })
};

export function fetchCatByBreed(breedId) {
    
     return axios
        .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
        .then(resp => resp.data
        )
        .catch(error => {
      //   console.log(err)
         throw error
        })

}
