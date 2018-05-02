import React from 'react';
import "./filter-list.css";

const FilterList = props => {
    const renderOptionList = () => {
        return props.filterList.map((filter, key) => <option key={key} value={filter}>{filter}</option>)
    }
    return (
        <div className="filter-div">
            <label for="rating">Rating:</label>
            <select
                onChange={props.ratingChange}>
                <option value="">All</option>
                {renderOptionList()}
            </select>
        </div>
    );
}

export default FilterList