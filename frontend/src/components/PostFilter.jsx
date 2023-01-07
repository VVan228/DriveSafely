import React from 'react';
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";

const PostFilter = ({filter, setFilter, limit, setLimit}) => {
    return (
        <div>
            <MyInput
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
                placeholder="Поиск"
            />
            <MySelect
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                defaultValue="Сортировать по..."
                options={[
                    {value: 'title', name: 'По заголовку'},
                    {value: 'body', name: 'По содержимому'},
                ]}/>
            <MySelect
                value={limit}
                onChange={selectedSort => setLimit(selectedSort)}
                defaultValue="Отображать на странице..."
                options={[
                    {value: '1', name: '1'},
                    {value: '5', name: '5'},
                    {value: '10', name: '10'},
                    {value: '20', name: '20'},
                    {value: '-1', name: 'Все'},
                ]}/>
        </div>
    );
};

export default PostFilter;