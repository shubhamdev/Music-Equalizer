import React, { PropTypes } from 'react';
import Slider from './Slider';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import '../css/musicStyle.css';

class App extends React.Component {
	constructor(){
		super();
		this.state= {
			buttonGroup: [
			{
				name: 'Preset',
				isActive: true
			},{
				name: 'Rock',
				isActive: false
			},
			{
				name: 'Pop',
				isActive: false
			},
			{
				name: 'Jazz',
				isActive: false
			},
			{
				name: 'Classical',
				isActive: false
			}]
		};
		this.changeEqualizerSettings = this.changeEqualizerSettings.bind(this);
	}

	changeEqualizervalue(name, s1, s2, s3, s4, s5){
		let value;
		return value = name === 'slider_60' ? s1 :  name === 'slider_310' ? s2 : name === 'slider_1k' ? s3 : name === 'slider_6k' ? s4 : name === 'slider_16k' ? s5 : 125; 
	}

	getUpdatedSlider(list, key){
		let result ={
			name : list.name,
			currentValue: list.currentValue,
			rangevalue: list.rangevalue
		};
		let activeBtn = Object.assign([], this.state.buttonGroup);
		activeBtn.map((btn) => {
			btn.isActive = false;
			if(btn.name === key){
				btn.isActive = true;
			}
		});
		this.setState({
			buttonGroup : activeBtn
		});
		switch(key){
				case 'Rock':
					result.currentValue = this.changeEqualizervalue(result.name, 180, 150, 125, 90, 180);
					break;
				case 'Pop':
					result.currentValue = this.changeEqualizervalue(result.name, 130, 80, 125, 110, 130);
					break;
				case 'Jazz':
					result.currentValue = this.changeEqualizervalue(result.name, 125, 125, 90, 125, 125);
					break;
				case 'Classical':
					result.currentValue = this.changeEqualizervalue(result.name, 125, 125, 180, 200, 220);
					break;
				default:
					result.currentValue = 125;
					break;
			}
		return result;
	}

	changeEqualizerSettings(event){
		const key = event.target.dataset.key;
		let sliderData = Object.assign([], this.props.items);
		const updatedItems = sliderData.map(item => {
			return item = this.getUpdatedSlider(item, key);
		});
		this.props.changeEqualizer(updatedItems);
	}

  render() {
    return(
		<div>
			<nav className="navbar navbar-default">
				<div className="container-fluid">
					<div className="navbar-header">
						<a className="navbar-brand" href="#">
							Shubham Music Equalizer
							</a>
					</div>
				</div>
			</nav>
			<div className="row main-bg">
				<div className="col-md-7">
					<Slider />
				</div>
				<div className="col-md-3  col-md-offset-1">
					{this.state.buttonGroup.map((btn, index) => (
						<button type="button" key={index} data-key={btn.name} className={btn.isActive ? 'btn-primary btn btn-lg btn-block' : 'btn-default btn btn-lg btn-block'}  onClick={this.changeEqualizerSettings}>{btn.name}</button>
					))}
				</div>
			</div>
			<footer> 
				<div className="footer-left">&copy; 2018 
					<a href="mailto:shubham1838@gmail.com" title="shubham1838@gmail.com">
						Email me : shubham1838@gmail.com
					</a>
					<a href="tel:18002081028">
						| Contact me : +91-814-784-9902 
					</a>
					<span > | Full name : Shubham Chaturvedi</span>
				</div>
			</footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
 