declare module "to-case" {
	interface ToCase {
		pascal(str: string): string;
		slug(str: string): string;
		camel(str: string): string;
		snake(str: string): string;
		dot(str: string): string;
		space(str: string): string;
		upper(str: string): string;
		lower(str: string): string;
	}
	const to: ToCase;
	export default to;
}
