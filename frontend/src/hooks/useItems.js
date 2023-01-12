import {useMemo} from "react";

// Отсортированный массив
export const useSortedItems = (items, sort) => {
    return useMemo(() => {
        // console.log('Айтемы отсортированы')
        if (sort) {
            return [...items.sort((a, b) => a[sort].localeCompare(b[sort]))]
        } else {
            return items;
        }
    }, [sort, items]);
}

// Отсортированный и отфильтрованный массив
export const useItems = (items, sort, query) => {

    const sortedItems = useSortedItems(items, sort);

    return useMemo(() => {
        return sortedItems.filter(item => {
            item.model && item.model.toLowerCase().includes(query.toLowerCase()) || item.id.toString().toLowerCase().includes(query.toLowerCase())
        })
    }, [query, sortedItems]);
}