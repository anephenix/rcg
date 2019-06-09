const expectedSASSContent = `
#my-test-component {
	// TODO - put styling information here
}`;

const expectedComponentContentWithDom = customDom => {
	return `
import './MyTestComponent.scss';

const MyTestComponent = () => (<div id='my-test-component'>${customDom}</div>);
			
export default MyTestComponent;`;
};

const expectedComponentContent = `
import './MyTestComponent.scss';

const MyTestComponent = () => (<div id='my-test-component' />);
			
export default MyTestComponent;`;

const expectedTestContent = `
import MyTestComponent from './MyTestComponent';

describe('MyTestComponent', () => {
	it('should do something');
});`;

module.exports = {
	expectedSASSContent,
	expectedComponentContent,
	expectedComponentContentWithDom,
	expectedTestContent
};
