import React, { Component } from 'react';

class DailyWeather extends Component {
	constructor(props){
		super(props);
		this.state = {
			filterButtons: [{
				days: 1,
				title: 'Tomorrow'
			}, {
				days: 7,
				title: 'Next week'
			}, {
				days: 14,
				title: 'Next 2 weeks'
			}]
		}
	}
	render(){
	    let today = new Date();

		let weather = this.props.weather.list.map((item, index) => {
			let currentDay = new Date();
			currentDay.setDate(today.getDate()+index);
			let [ weekDay, month, day, year ]  = currentDay.toDateString().split(' ');
			return {
				weekDay,
				month,
				year,
				day,
				temp: item.temp,
				info: item.weather[0],
				ico: `http://openweathermap.org/img/w/${item.weather[0].icon}.png`
			}
		});
		
		return (
	            <div className="weather-description">
	              <ul className="weather-daily list-unstyled">         
	                { weather.map((daily, index) => <li key={index} className="weather-day">
                  										<p className="weather-day-type">
									                      {daily.info.description}
									                      <img src={daily.ico} alt={daily.info.description} />
									                  </p>
									                  <strong className="weather-day-t">
									                    {Math.round(daily.temp.day - 273)} °C
									                  </strong>
									                  <span className="weather-day-time">
									                   {daily.day} {daily.weekDay}, {daily.month}, {daily.year}
									                  </span>
	                							   </li>
								  ) 
	            	}
	              </ul>
	              <div className="weather-filter">
	              	{ this.state.filterButtons.map((btn, index) => 
	              		<button key={index} 
						   onClick={this.props.filterBy.bind(this, btn.days)}
						   className={this.props.activeFilter === btn.days ? 'filter-btn active': 'filter-btn'}
						> 
						   	{btn.title} 
					   </button> 												   )
	              	}
	              </div>
	            </div>
			)
	}
}

export default DailyWeather;