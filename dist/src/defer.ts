/*
	jWidget 2
	Copyright (C) 2017  Egor Nepomnyaschih
	enepomnyaschih@gmail.com
	https://github.com/enepomnyaschih/jwidget

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.

	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

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
