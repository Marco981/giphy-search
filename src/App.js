import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import Range from "./component/range/range"
import Search from './component/search/search'
import FilterList from './component/filter-list/filter-list'

const API_URL = "http://api.giphy.com/v1/gifs/search?"
const API_KEY = "74kCblNsHK9mSqTjNIX083FCh6tzBC1u"
class App extends Component {
  state = {
    list:[],
    searchTerm:"",
    rating:[],
    currentRating:'',
    limit:1
  }
  componentDidUpdate() {
    this.getData();
  }
  getData() {
    axios
      .get(`${API_URL}q=${this.state.searchTerm}&api_key=${API_KEY}&limit=${this.state.limit}`)
      .then(({data}) => {
        this.setState({
          list:data.data,
          rating: [...new Set(data.data.map(x => x.rating))]
        })
      })
  }

  ratingChange = e => {
    this.setState({
      currentRating : e.target.value
    });
  }

  renderList = () => {
    return this.state.list
      .filter(item => this.state.currentRating.trim().length === 0 ? true : (this.state.currentRating === item.rating) ? true: false)
      .map((item,key) => 
        <li key={item.id}>
          <h2>{item.title} ({item.rating})</h2>
          <img 
            src={item.images.fixed_height.url}
            alt={item.title}
            width={item.images.fixed_height.width}
            height={item.images.fixed_height.height}
            />
        </li>)
  } 

  updateLimit = e => {
    this.setState({
      limit:e.target.value
    })
  }

  searchIt = (event, element) => {
    event.preventDefault();
    this.setState({searchTerm: element.value.replace(/\s/, '+')});
    this.getData();
  }

  render() {
    return (
      <div className="App">
        <h1>SAY IT WITH A GIF!</h1>
        <Search searchIt={this.searchIt} />
        <FilterList
          ratingChange={this.ratingChange}
          filterList={this.state.rating}/>
          <span>{this.state.limit}</span>
          <Range limit={this.state.limit} 
          updateLimit={this.updateLimit}/>
        <ul className="result-list">
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

export default App;
