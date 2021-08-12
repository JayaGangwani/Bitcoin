import { useState, useEffect, useRef } from 'react'
import { displayOrderBook } from '../Store/Actions/Action';
import { connect } from 'react-redux';


function OrderBook(props) {
    const [isPaused, setPause] = useState(false);

    var [count, setCount] = useState(0);
    const ws = useRef(null);
    console.log(props.orderBook);

    useEffect(() => {

        ws.current = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
        let prescion = "P".concat(count);
        ws.current.onopen = ('message', () => {

            console.log(prescion);
            if (ws.current.readyState == 1) {
                ws.current.send(JSON.stringify({
                    event: 'subscribe',
                    channel: 'Book',
                    symbol: 'tBTCUSD',
                    prec: prescion

                }))
            }
        })

    })

    useEffect(() => {
        if (ws.current != null && ws.current.readyState == 1) {
            ws.current.onmessage = function (str) {
                if (!isPaused) return;
                var msg = JSON.parse(str.data);
                const [channelId, result] = msg;
                if (result instanceof Array) {
                    const [PRICE, COUNT, AMOUNT] = result;
                    var obj = {};
                    obj["price"] = PRICE;
                    obj["count"] = COUNT;
                    obj["amount"] = AMOUNT;
                    props.displayOrderBook(obj);
                }
            }
        }
    }, [isPaused])

    function increasePrescion() {
        setCount(count + 1);
    }

    function decreasePrescion() {
        setCount(count - 1);

    }

    return (
        <div>
            <div class="navbar">
                <span><input type='button' title="increase prescion" onClick={() => increasePrescion()} value='+'></input></span>
                <span><input type='button' title="decrease prescion" value='-' onClick={() => decreasePrescion()}></input></span>
            </div>
            <table bordered>
                <tr>
                    <th >COUNT</th>
                    <th>AMOUNT</th>
                    <th>PRICE</th>
                </tr>
                {props.orderBook.map((order, keyIndex) =>
                (
                    <tr key={keyIndex}>
                        <td>{order.count}</td>
                        <td>{order.amount}</td>
                        <td>{order.price}</td>
                    </tr>
                ))}
            </table>
            <button onClick={() => setPause(!isPaused)}>
                {isPaused ? "Connected" : "Disconnected"}
            </button>
        </div >


    )
}
const mapDispatchToProps = {
    displayOrderBook
}

const mapStateToProps = (state) => ({ orderBook: state.orderBook });



export default connect(mapStateToProps, mapDispatchToProps)(OrderBook);