import Destroyable from './Destroyable';

interface Class extends Destroyable {
	_iid: number;
	own<T extends Destroyable>(obj: T): T;
}

export default Class;
