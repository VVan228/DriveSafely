import React from 'react';
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";

const CarsFilter = ({filter, setFilter}) => {
    return (
        <div className="col p-5 d-flex flex-column">
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
        </div>
    );
};

export default CarsFilter;