import { useState, useEffect, useRef } from 'react'
import { addTicker } from '../Store/Actions/Action';
import { connect } from 'react-redux';
import "./Ticker.css";

function Ticker(props) {
    // const [disconnected, setDisconnected] = useState(false);
    const [isPaused, setPause] = useState(false);
    const ws = useRef(null);
    console.log(props.ticker);

    useEffect(() => {
        ws.current = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
        ws.current.onopen = ('message', () => {

            if (ws.current.readyState == 1) {
                ws.current.send(JSON.stringify({
                    event: 'subscribe',
                    channel: 'ticker',
                    symbol: 'tBTCUSD'

                }))
            }
        })
    }, [])

    useEffect(() => {
        if (ws.current != null && ws.current.readyState == 1) {
            console.log(isPaused);
            ws.current.onmessage = function (str) {

                if (!isPaused) return;
                //  console.log(str.data[1][1]);
                var msg = JSON.parse(str.data);
                console.log(msg);
                const [channelId, info] = msg;
                if (info instanceof Array) {
                    const [, , , , DAILY_CHANGE_RELATIVE, LAST_PRICE, VOLUME, HIGH, LOW] = info;
                    var obj = {};
                    obj["volume"] = VOLUME;
                    obj["high"] = HIGH;
                    obj["low"] = LOW;
                    obj["lastPrice"] = LAST_PRICE;
                    obj["valueChange"] = DAILY_CHANGE_RELATIVE;
                    console.log(obj);
                    props.addTicker(obj);
                }

            }
        }
    }, [isPaused])






    return (
        <div>
            <div class="display">
                <div class="leftPanel">
                    <div><img class="margin-icon" height="50px" width="50px" src={process.env.PUBLIC_URL + "/bitcoin.png"} alt="Logo" /></div>
                    <div>

                        <div class="ticker-info">BTC/USD</div>
                        <div class="ticker-info">VOL {props.ticker.volume} BTC</div>
                        <div class="ticker-info">LOW {props.ticker.low}</div>
                    </div>
                </div>
                <div class="rightPanel">
                    <div class="ticker-info align-right">{props.ticker.lastPrice}</div>
                    <div class="ticker-info align-right">{props.ticker.valueChange} {Math.round(props.ticker.valueChange)}</div>
                    <div class="ticker-info align-right">HIGH {props.ticker.low}</div>

                </div>
            </div >
            <button onClick={() => setPause(!isPaused)}>
                {isPaused ? "Connected" : "Disconnected"}
            </button>
        </div>


    )
}
const mapDispatchToProps = {
    addTicker
}

const mapStateToProps = (state) => ({ ticker: state.tickerObj });



export default connect(mapStateToProps, mapDispatchToProps)(Ticker);