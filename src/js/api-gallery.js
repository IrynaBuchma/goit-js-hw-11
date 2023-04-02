import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/'; // Aдрес вказаний над ключем в полі   Search Images на сторінці https://pixabay.com/api/docs/#api_search_images
const API_KEY = '34731135-6d68099f6d308706ad328c34f'; // Зареєструвалася на Pixabay і отримала свій унікальний ключ доступу

// Клас запиту для бекенду API сервісу Pixabay https://pixabay.com/api/docs/#api_search_images
export default class ApiImageService {
    constructor() {
        this.searchQuery = ''; // name в input в index.html ="searchQuery" 
        this.page = 1;
        this.PER_PAGE = 40;
    }
    async fetchGallery() {
        const axiosOptions = {
            method: 'GET',
            url: BASE_URL,
            params: {
            //Список параметрів 
                key: API_KEY,
                q: `${this.searchQuery}`, // Те, що буде вводити користувач
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: 'true',
                page: `${this.page}`,
                per_page: `${this.PER_PAGE}`,
            }
        }
        try {
            const response = await axios(axiosOptions);

            const data = response.data;
            console.log(data);
            return data;

        } catch (error) {
            console.error(error);
        }
    }

    resetPage() {
        this.page = 1;
    }


    incrementPage() {
        this.page += 1;
    }

    resetEndOfHits() {
        this.endOfHits = false;
    } 

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}