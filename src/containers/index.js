import React, { Component } from 'react';
import { connect } from 'react-redux';

import { onUpdateSearchValue, onShowSearch, fetchWeatherTerms, fetchWeatherNow } from './../actions';

import Board from './../components/board';
import DailyWeather from './../components/daily_weather';
import Search from './../components/search';

const fetchAllWeather = (city, period) => dispatch => {
    dispatch(fetchWeatherNow(city));
    dispatch(fetchWeatherTerms(city, period));
}

class App extends Component {
    componentDidMount(){
        let { dispatch, query, period } = this.props;

        if (query) { 
            dispatch(fetchAllWeather(query, period));
        }
    }
    onChangeSearchValue(e){
        let value = e.target.value,
            { dispatch } = this.props;

        dispatch(onUpdateSearchValue(value));
    }
    onStartSearch(e){
        e.preventDefault();
        let { dispatch, query, period } = this.props;
        if (query) {
            dispatch(fetchAllWeather(query, period)) 
        }
    }
    backToSearch(){
        let { dispatch } = this.props;
        dispatch(onShowSearch());
    }
    filterWeatherTerms(days){
        let { dispatch, query } = this.props;
        dispatch(fetchWeatherTerms(query, days));
    }
    render(){

        let showBoard = (!!this.props.weatherNow && !!this.props.weatherTerms),
            isSuccess = this.props.success;
        
        return (
            <div> 
                {   isSuccess ?
                        showBoard ?
                        <div className="weather-content">
                           <Board  weather={this.props.weatherNow}
                                   close={this.backToSearch.bind(this)} 
                           /> 
                           
                           <DailyWeather activeFilter={this.props.period} 
                                         weather={this.props.weatherTerms}
                                         filterBy={this.filterWeatherTerms.bind(this)}
                           />
                        </div>                         
                        :
                        <Search search={this.props.query} 
                                handleInput={this.onChangeSearchValue.bind(this)}
                                onSearch={this.onStartSearch.bind(this)}                
                        />  
                    : 
                    <div className="weather-error text-center">
                        <h2>Oops!</h2>
                        <p>Something goes wrong!</p>
                        <span className="weather-error-back" onClick={this.backToSearch.bind(this)}>back to search</span>
                     </div>
                }
            </div>   
        )
    }
}

function mapStateToProps(state) {
    let { now, term, days } = state.weather;
    return {
        query: state.query,
        success: state.status,
        weatherNow: now,
        weatherTerms: term,
        period: days
    };
}

export default connect(mapStateToProps)(App);