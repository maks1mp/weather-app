import React, { Component } from 'react';

class Search extends Component {
    render(){
        return (
            <div className="weather-search">
                <form className="weather-search-form" action="" onSubmit={this.props.onSearch}>
                    <input className="weather-search-field" 
                           type="text" 
                           value={this.props.search} 
                           onChange={this.props.handleInput}
                           placeholder="Search here ..."
                    />
                    <button className="weather-search-button" type="submit"> search </button>
                </form>
            </div>
        )
    }
}

export default Search;