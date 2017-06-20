import React, { Component } from 'react';
import { WEATHER_IMAGES } from './../utils';

class Board extends Component {
    render(){
        let  now  = this.props.weather,
             currentWeather = now.weather[0];
        
        let date = (new Date()).toDateString().split(' '),
            currentBg,
            [ weekDay, month, day, year ] = date,
            city = now.name,
            country = now.sys.country,
            weatherDescription = currentWeather.description,
            temperature = Math.round(now.main.temp - 273);
            

        
        for ( let i = WEATHER_IMAGES.length - 1; i > 0 ; i-- ) {
            let { img, id } = WEATHER_IMAGES[i];
            if ( id <= currentWeather.id ) {
                currentBg = img;
                break;
            }
        }
   
        return (
            <div className="weather-content-bg" style={{backgroundImage: 'url('+currentBg+')'}}>
                <div className="weather-info">
                    <div className="weather-date">
                        <span className="day">{ weekDay }, { day }</span> <br />
                        <span className="month">{ month }</span>,
                        <span className="year"> { year }</span>
                    </div>
                    <h2 className="weather-info-type">
                        {weatherDescription}
                    </h2>
                    <div className="weather-temperature">
                        <strong className="temperature-q">
                            {temperature}  &#176;C
                        </strong>
                        <br />
                        <p className="weather-location">{city}, {country}</p>
                    </div>
                    </div>
                <div className="weather-close" onClick={this.props.close}>+</div>
            </div>
            
        )
    }
}

export default Board;