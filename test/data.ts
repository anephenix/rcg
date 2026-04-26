const expectedSASSContent = `
#my-test-component {
	// TODO - put styling information here
}`;

const expectedSASSContentWithCustomCSS = (customCSS: string): string => `
#my-test-component {
	${customCSS}
}`;

const expectedComponentContentWithDom = (
	customDom: string | null,
	nextjsSassSupport: boolean,
): string => {
	let id = `'my-test-component'`;
	let nextjsStylesVariable = "";
	let mod = "";

	if (nextjsSassSupport) {
		id = `{styles['my-test-component']}`;
		nextjsStylesVariable = "styles from ";
		mod = "module.";
	}
	let endDiv = " />";
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

interface PropDefinition {
	name: string;
	type: string;
}

const expectedComponentContentWithProps = (
	props: PropDefinition[],
	isTypeScript: boolean,
): string => {
	const propNames = props.map((p) => p.name).join(", ");
	const propsArg = isTypeScript
		? `{ ${propNames} }: MyTestComponentProps`
		: `{ ${propNames} }`;
	const propsInterface = isTypeScript
		? `\ninterface MyTestComponentProps {\n${props.map((p) => `\t${p.name}: ${p.type};`).join("\n")}\n}\n`
		: "";
	return `
import './MyTestComponent.scss';
${propsInterface}
const MyTestComponent = (${propsArg}) => (<div id='my-test-component' />);

export default MyTestComponent;`;
};

export {
	expectedComponentContent,
	expectedComponentContentWithDom,
	expectedComponentContentWithProps,
	expectedSASSContent,
	expectedSASSContentWithCustomCSS,
	expectedTestContent,
};
