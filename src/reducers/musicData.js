const defaultState = {
	sliderData: [{
		name: 'slider_60',
		currentValue: 125,
		rangevalue: '60k'
	},{
		name: 'slider_310',
		currentValue: 125,
		rangevalue: '310k'
	},{
		name: 'slider_1k',
		currentValue: 125,
		rangevalue: '1k'
	},{
		name: 'slider_6k',
		currentValue: 125,
		rangevalue: '6k'	
	},{
		name: 'slider_16k',
		currentValue: 125,
		rangevalue: '16k'
	}]
};

const musicData = (state = defaultState, action) => {
	const sliderData = state.sliderData.slice();
		switch (action.type) {
			case 'CHANGE_EQUALIZER':
				return Object.assign([], sliderData, { sliderData : action.payload});
			default:
				return state;
	}
};

export default musicData;