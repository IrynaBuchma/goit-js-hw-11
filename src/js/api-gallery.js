import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34731135-6d68099f6d308706ad328c34f';
const OPTIONS = {
    headers: {
        Authorization: API_KEY,
    }
}

export class ApiImageService {
    constructor() {
        searchQuery = '';
    }
    async fetchGallery() {
        const axiosOptions = {
            method: 'GET',
            url: BASE_URL,
            params: {
                key: API_KEY,
                q: `${searchQuery}`,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: 'true',
                page: 1,
                per_page: 40,
            }
        }
        try {
            const response = await axios(axiosOptions);

            const data = response.data;

            incrementPage();
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    incrementPage() {
        page += 1;
    }

    resetPage() {
        page = 1;
    }

    resetEndOfHits() {
        endOfHits = false;
    }

    get query() {
        return searchQuery;
    }

    set query(newQuery) {
        searchQuery = newQuery;
    }
}