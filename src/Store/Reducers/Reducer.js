const initialState = {
    tickerObj: {},
    orderBook: []

}

export default function (state = initialState, action) {
    console.log(action.type);
    switch (action.type) {
        case "ADD_TICKER":
            return { ...state, tickerObj: action.payload };
        case "Display_Order_Book":
            let orderData = [...state.orderBook];
            orderData.push(action.payload);
            orderData = orderData.slice(-10);
            return { ...state, orderBook: [...orderData] }
        default:
            return state;
    }
}