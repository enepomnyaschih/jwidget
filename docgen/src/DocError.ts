export default class DocError extends Error {
	constructor(message: string) {
		super(message);
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, DocError);
		}
	}
}
