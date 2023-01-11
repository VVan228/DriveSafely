import axios from "axios";

export default class PostService {

    static async getAll(limit = 10, page = 1) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
                _limit: limit,
                _page: page,
            }
        });
        return response;
    }

    static async getById(id) {
        const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
        console.log(url)
        const response = await axios.get(url);
        return response;
    }

    static async getCommentsByPostId(id) {
        const url = `https://jsonplaceholder.typicode.com/posts/${id}/comments`;
        console.log(url)
        const response = await axios.get(url);
        return response;
    }
}