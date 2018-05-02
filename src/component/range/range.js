import React from "react";
import "./range.css";

const Range = props => {
    return (
        <input
          onChange={props.updateLimit} 
          type="range" 
          min="1" 
          max="100" 
          defaultValue={props.limit} />
    )
}

export default Range

