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

import CancelToken, {runAsync} from "./CancelToken";

/**
 * Promise wrapper over jQuery AJAX API functions with CancelToken support. Resolves the promise with request result on its
 * successful completion. Rejects the promise with XMLHttpRequest on request failure. If the operation gets
 * cancelled via the token, the promise never gets resolved or rejected.
 * @param xhr jQuery XML HTTP request wrapper object.
 * @param cancelToken Cancellation token to bind the operation to.
 * @returns Promise object representing the request.
 */
export default function request(xhr: JQueryXHR, cancelToken?: CancelToken) {
	let aborted = false;
	return runAsync<any>(
		(resolve: (value?: (Thenable<any> | any)) => void, reject: (error?: any) => void) => {
			xhr.then(resolve, request => {
				if (!aborted) {
					reject(request);
				}
			});
		},
		() => {
			aborted = true;
			xhr.abort();
		},
		cancelToken
	);
}
