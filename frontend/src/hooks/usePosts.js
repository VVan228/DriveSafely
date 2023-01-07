import {useMemo} from "react";

// Отсортированный массив
export const useSortedPosts = (posts, sort) => {
    const sortedPosts = useMemo(() => {
        console.log('Посты отсортированы')
        if (sort) {
            return [...posts.sort((a, b) => a[sort].localeCompare(b[sort]))]
        } else {
            return posts;
        }
    }, [sort, posts])

    return sortedPosts;
}

// Отсортированный и отфильтрованный массив
export const usePosts = (posts, sort, query) => {

    const sortedPosts = useSortedPosts(posts, sort);

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()) || post.body.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedPosts])

    return sortedAndSearchedPosts;
}