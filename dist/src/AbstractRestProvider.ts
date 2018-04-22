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

import CancelToken from "./CancelToken";
import Dictionary from "./Dictionary";
import {isNil} from "./index";
import request from "./request";

abstract class AbstractRestProvider<C> {

	private mock: Dictionary<string>;
	private url: string;
	private urlBuilder: (action: string) => string;
	private settings: JQueryAjaxSettings;

	constructor(config?: AbstractRestProvider.Config) {
		config = config || {};
		this.mock = config.mock || {};
		this.url = config.url || "${action}";
		this.urlBuilder = config.urlBuilder;
		this.settings = config.settings;
	}

	abstract getHeaders(context: C): Dictionary<string>;

	abstract getContentType(context: C): string;

	getUrl(action: string | string[], type: string = "GET") {
		if (typeof action !== 'string') {
			if (action.some(isNil)) {
				console.error("URL ", action, " contains blank parts - it may cause improper API request to be sent. Rejecting the request.");
				return null;
			}
			action = action.map(encodeURIComponent).join('/');
		}
		return this.mock[type + ' ' + action] || this.mock[action] ||
			(this.urlBuilder ? this.urlBuilder(action) : this.url.replace("${action}", action));
	}

	get<T>(action: string | string[], config?: AbstractRestProvider.DataConfig<C, T>) {
		return this.send("GET", action, config);
	}

	post<T>(action: string | string[], config?: AbstractRestProvider.DataConfig<C, T>) {
		return this.send("POST", action, config);
	}

	put<T>(action: string | string[], config?: AbstractRestProvider.DataConfig<C, T>) {
		return this.send("PUT", action, config);
	}

	patch<T>(action: string | string[], config?: AbstractRestProvider.DataConfig<C, T>) {
		return this.send("PATCH", action, config);
	}

	del<T>(action: string | string[], config?: AbstractRestProvider.DataConfig<C, T>) {
		return this.send("DELETE", action, config);
	}

	upload<T>(action: string | string[], config?: AbstractRestProvider.UploadConfig<C, T>) {
		return this.send("POST", action, config, {
			processData: false,
			contentType: false
		});
	}

	private send<T>(type: string, action: string | string[], config: AbstractRestProvider.DataConfig<C, T> = {}, settings?: JQueryAjaxSettings): Promise<T> {
		const url = this.getUrl(action, type);
		if (url === null) {
			return request<T>();
		}
		const data = config.data,
			contentType = (settings && settings.contentType != null) ?
				settings.contentType : this.getContentType(config.context);
		settings = $.extend({}, this.settings, settings, {
			url: url,
			type: type,
			headers: this.getHeaders(config.context),
			contentType: contentType,
			data: (type !== "GET" && type !== "DELETE" && contentType === "application/json" && data != null) ?
				JSON.stringify(data) : data
		});
		return request<T>($.ajax(settings), config.factory, config.cancelToken);
	}
}

export default AbstractRestProvider;

namespace AbstractRestProvider {
	export interface Config {
		url?: string;
		urlBuilder?: (action: string) => string;
		mock?: Dictionary<string>;
		settings?: JQueryAjaxSettings;
	}

	export interface BaseConfig<C, T> {
		readonly cancelToken?: CancelToken;
		readonly context?: C;
		readonly factory?: (response: any) => T;
	}

	export interface DataConfig<C, T> extends BaseConfig<C, T> {
		readonly data?: any;
	}

	export interface UploadConfig<C, T> extends BaseConfig<C, T> {
		readonly data?: File;
	}
}
