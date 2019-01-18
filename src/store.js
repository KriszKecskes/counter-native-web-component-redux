import { createStore } from 'redux';

export const INCREASE_COUNTER = 'INCREASE_COUNTE';

const initState = [
  {uid:1, counter: 0},
  {uid:2, counter: 0},
  {uid:3, counter: 0}
];

const reducer = (state = initState, action) => {
  switch(action.type) {
    case INCREASE_COUNTER:
      return state.map((counterItem)=>{
        if(counterItem.uid === action.uid) {
          return { ...counterItem, counter: counterItem.counter + 1 };
        }
        return counterItem;
      });
    default:
      return state;
  }
}

export default createStore(reducer);