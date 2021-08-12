const initialState = {
    tickerObj: { },
    orderBook: []
    
}

export default function (state=initialState, action) {
    console.log(action.type);
    switch (action.type){
    case "ADD_TICKER":
        return {...state, tickerObj : action.payload};
    case "Display_Order_Book":
    
        let newData = [...state.orderBook];
        newData.push(action.payload);
        newData = newData.slice(-10);
        return  {...state, orderBook :[...newData] }
        
        
    default:
        return state;
    }
}