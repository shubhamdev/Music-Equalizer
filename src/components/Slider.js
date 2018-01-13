import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import '../css/musicStyle.css';
import ReactAudioPlayer from 'react-audio-player';


class Slider extends React.Component {

	constructor(){
		super();
		this.changeSlider = this.changeSlider.bind(this);
	}

	componentDidMount(){
		this.updateSliderColor();
	}

	componentDidUpdate(){
		this.updateSliderColor();
	}

	updateSliderColor(){
		let x = document.getElementsByClassName('slider');
		this.props.items.map((slider, index) => x[index].style.backgroundColor = `rgba(255, ${slider.currentValue} , 0,0.7 )`
			);
	}

	changeColor(event){
		let x = document.getElementsByClassName('slider');
		x[event.target.id].style.backgroundColor = `rgba(255, ${event.target.value}, 0,0.7 )`;
	}

	changeSlider(event){
		let sliderData = Object.assign([], this.props.items);
		const updatedItems = sliderData.map(item => {
			if(item.name === event.target.dataset.key){
				let updatedList = {
					name: item.name,
					currentValue: event.target.value,
					rangevalue: item.rangevalue
				};
				item = updatedList;
			}
			return item;
		});
		this.props.changeEqualizer(updatedItems);
		this.changeColor(event);
	}

	render(){
		return(
			<div>
				<div className="row">
						<div className="col-md-2 col-sm-2 col-xs-1">
							<ul>
								<li className="frequency"> -12 db</li>
								<li className="frequency">0</li>
								<li> +12 db </li>
							</ul>
						</div>
						{this.props.items.map((slider, index) => (
							<div className="col-md-2 col-sm-2 col-xs-1" key={index}>
									<input type="range" id={index} min="1"
										max="255" data-key={slider.name}
										onChange={this.changeSlider} value={slider.currentValue}  
										className="slider slider-color round range" /> 
									<span className="range-value">{slider.rangevalue}</span>
								</div>
						))}
					</div>
					<div className="row">
						<div className="col-md-4 col-sm-4 col-xs-1 col-md-offset-5 col-xs-offset-2 audio-bg">
						<ReactAudioPlayer src="http://api.audiotool.com/track/volution/play.mp3"
							controls
					/>
						</div>
						
				</div>
			</div>
		);
	}
}

const mapStateToProps = store => {
	return {
		items: store.musicData.sliderData
	};
};

const mapDispatchToProps = dispatch => {
	return {
		changeEqualizer: (campaigns) => dispatch(Actions.changeEqualizer(campaigns))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Slider);