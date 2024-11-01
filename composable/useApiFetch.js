import { useRequestHeaders, useCookie, useFetch } from "nuxt/app";


export function useApiFetch(path, options = {}) {
    let headers = {};
    const token = useCookie('XSRF-TOKEN');
    const authToken = useCookie('auth_token'); // Assuming the auth token is stored in a cookie

    if (token.value) {
        headers['X-XSRF-TOKEN'] = token.value;
    }
    if (authToken.value) {
        headers['Authorization'] = `Bearer ${authToken.value}`;
    }
    if (process.server) {
        headers = {
            ...headers,
            ...useRequestHeaders(["referer", "cookie"]),
        };
    }
    // return useFetch("http://localhost:8000/" + path, {
        return useFetch("https://ctgshomaj.com/" + path, {
        credentials: 'include',
        watch: false,
        ...options,
        headers: {
            ...headers,
            ...options?.headers,
        },
    });
}
