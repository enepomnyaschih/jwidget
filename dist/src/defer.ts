import CancelToken, {AsyncOperation} from "./CancelToken";

class DeferOperation extends AsyncOperation<void> {

	private timeout: number;

	constructor(private ms: number, cancelToken: CancelToken) {
		super(cancelToken);
	}

	protected run(resolve: (value?: (Thenable<void> | void)) => void, _reject: (error?: any) => void): void {
		this.timeout = setTimeout(() => {
			resolve();
		}, this.ms);
	}

	protected cancel(): void {
		clearTimeout(this.timeout);
	}
}

export default function (ms?: number, cancelToken?: CancelToken) {
	return new DeferOperation(ms, cancelToken).getPromise();
}
