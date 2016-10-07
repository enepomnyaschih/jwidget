import {Destroyable} from './Destroyable';

export interface IClass extends Destroyable {
	_iid: number;
	own<T extends Destroyable>(obj: T): T;
}
