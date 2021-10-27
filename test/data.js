const expectedSASSContent = `
#my-test-component {
	// TODO - put styling information here
}`;

const expectedSASSContentWithCustomCSS = (customCSS) => `
#my-test-component {
	${customCSS}
}`;

const expectedComponentContentWithDom = (customDom, nextjsSassSupport) => {
	// eslint-disable-next-line
	let id = `'my-test-component'`;
	let nextjsStylesVariable = '';
	let mod = '';

	if (nextjsSassSupport) {
		// eslint-disable-next-line
		id = `{styles['my-test-component']}`;
		nextjsStylesVariable = 'styles from ';
		mod = 'module.';
	}
	let endDiv = ' />';
	if (customDom) {
		endDiv = `>${customDom}</div>`;
	}
	return `
import ${nextjsStylesVariable}'./MyTestComponent.${mod}scss';

const MyTestComponent = () => (<div id=${id}${endDiv});
			
export default MyTestComponent;`;
};

const expectedComponentContent = `
import './MyTestComponent.scss';

const MyTestComponent = () => (<div id='my-test-component' />);
			
export default MyTestComponent;`;

const expectedTestContent = `
import MyTestComponent from './MyTestComponent';

describe('MyTestComponent', () => {
	MyTestComponent;
	test.todo('should do something');
});`;

module.exports = {
	expectedSASSContent,
	expectedSASSContentWithCustomCSS,
	expectedComponentContent,
	expectedComponentContentWithDom,
	expectedTestContent,
};
