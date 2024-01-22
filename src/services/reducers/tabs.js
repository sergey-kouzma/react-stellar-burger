import {    
    SET_INGREDIENTS_TAB,
    SET_TAB_REF
} from '../actions/tabs';

const initialTabs = {
    tabs: [
        {
          id: 'bun',
          category: 'Булки',
          ratio: 0,
          refToList: null,
          active: true
        },
        {
          id: 'sauce',
          category: 'Соусы',
          ratio: 0,
          refToList: null,
          active: false
        },
        {
          id: 'main',
          category: 'Начинки',
          ratio: 0,
          refToList: null,
          active: false
        },
    ]
}

const tabsReducer =  (state = initialTabs, action) => {
    switch (action.type) {
        case SET_INGREDIENTS_TAB: {
            return {
                ...state,
                tabs: state.tabs.map(tab => {
                    if (action.move && tab.id === action.id) {
                        tab.refToList.current.scrollIntoView({ behavior: "smooth" })
                    }
                    return tab.id === action.id 
                        ? {...tab, active: true} 
                        : {...tab, active: false}
                })         
            }
        }
        case SET_TAB_REF: {
            return {
                ...state,
                tabs: state.tabs.map(tab => {
                    return tab.category === action.category ? {...tab, refToList: action.refToList} : tab         
                })
            }
        }
        default: return state;
    }
}

export default tabsReducer;