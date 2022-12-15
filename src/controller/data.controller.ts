import mementoes from '../store';
import type {IMemoryObject} from '../interface/global';


export default {
	addMemento(object: IMemoryObject) {
		//add object to state
		mementoes.update(memento => [...memento, object]);
	},

}
