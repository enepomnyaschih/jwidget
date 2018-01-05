export default interface Reference {

	readonly file?: string;
	readonly symbol?: string;
	readonly member?: string;
	readonly static?: boolean;
	readonly label?: string;
	readonly href?: string;
}
