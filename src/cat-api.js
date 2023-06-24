const urlHost = `https://api.thecatapi.com/v1`;
const apiKey = 'live_Sp5v6emKEIvR1gjqxotPiqkbZLCmuPxMih75Cr8p2TPl7bLTd34uS3dHI4QBX3tc';

export function fetchCatByBreed(id) {

    return fetch(`${urlHost}/images/search?breed_ids=${id}&api_key=${apiKey}`)
        .then(response => {
            if (!response.ok) {
  
                throw new Error(response.statusText || response.status)}
                return response.json()
  
            })
   }