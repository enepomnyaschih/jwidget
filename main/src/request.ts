/*
MIT License

Copyright (c) 2021 Egor Nepomnyaschih

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
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
export default function request(xhr: JQueryXHR, cancelToken?: CancelToken): Promise<any> {
	let aborted = false;
	return runAsync<any>(
		(resolve: (value?: (Promise<any> | any)) => void, reject: (error?: any) => void) => {
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
