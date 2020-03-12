import React from "react"
import Layout, {HEADER_WIDTH} from "../components/layout"
import SEO from "../components/seo"
import Car from "../images/car.jpg"
import {style} from "typestyle";

const initialCircleVel = 14;
const initialCarVel = 3;

const initialRadius = 25;

const initialCarWidth = 120;
const initialCarHeight = 100;

/*car coordinates*/
let initial_X_Car = (window.innerWidth - HEADER_WIDTH - 20) / 2;
let initial_Y_Car = (window.innerHeight * 7 / 10) / 2;

/*ball coordinates*/
let initial_Y_Circle = (window.innerHeight * 7 / 10) / 2 + initialCarHeight / 2;
let initial_X_Circle = (window.innerWidth - HEADER_WIDTH - 20) / 4;

/*width height canvas*/
let initialHeight = (window.innerHeight * 7 / 10);
let initialWidth = (window.innerWidth - HEADER_WIDTH - 20);

const border = 100;
let time = 0;

class SecondPage extends React.Component
{
    canvasRef;
    ctx;
    image;

    constructor(props)
    {
        super(props);
        this.state = {
            startClicked: false,
            width: initialWidth,
            height: initialHeight,
            xCar: initial_X_Car,
            yCar: initial_Y_Car,
            xCircle: initial_X_Circle,
            yCircle: initial_Y_Circle,
            circleDelta: initialCircleVel,
            carDelta: initialCarVel,
        };
        this.canvasRef = React.createRef();
    }


    componentDidMount()
    {
        window.addEventListener("resize", this.updateSize);
        this.ctx = this.canvasRef.current.getContext("2d");
        this.image = new Image();
        this.image.onload = () =>
        {
            this.ctx.drawImage(this.image, this.state.xCar, this.state.yCar, initialCarWidth, initialCarHeight);
            this.init();
        };
        this.image.src = Car;
    }

    componentWillUnmount()
    {
        window.removeEventListener("resize", this.updateSize);
    }

    render()
    {
        return (
            <Layout>
                <SEO title="Page two"/>
                <div id="canvasContainer" style={styles.canvasContainer}>
                    <canvas
                        id="myCanvas"
                        ref={this.canvasRef}
                        width={this.state.width}
                        height={this.state.height}
                        style={{border: "1px solid #000000"}}
                    >
                        CANVAS DOES NOT SUPPORTED!
                    </canvas>
                    <div style={{
                        height: window.innerHeight - this.state.height - 10 + "px",
                        padding: 10,
                    }}>
                        <div style={{padding: 10, display: "inline-flex"}}>
                            <div>
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <label htmlFor="ball">ball: </label>
                                    <input
                                        id="ball"
                                        type="range"
                                        min="1"
                                        max="20"
                                        step="1"
                                        style={{margin: "0 10px"}}
                                        onChange={this.handleChangeRange}
                                        value={this.state.circleDelta}
                                    />
                                    {this.state.circleDelta}
                                </div>
                                <div style={{display: "flex", alignItems: "center", paddingTop: 10}}>
                                    <label htmlFor="car">car: </label>
                                    <input
                                        id="car"
                                        type="range"
                                        min="0"
                                        max="20"
                                        step="1"
                                        style={{margin: "0 10px"}}
                                        onChange={this.handleChangeRange}
                                        value={this.state.carDelta}
                                    />
                                    {this.state.carDelta}
                                </div>
                            </div>
                            <button style={{marginLeft: 20, width: 80, height: 30}} onClick={this.handleStart}>
                                {this.state.startClicked ? "Init" : "Start"}
                            </button>
                            <div className={styles.about}>
                                <div>
                                    <span>before crash:</span>
                                    <span>Vb = V0 {this.state.circleDelta > 0 ? ` = ${this.state.circleDelta}` : ""}</span>
                                </div>
                                <div>
                                    <span>after crash:</span>
                                    <span>Vb = - (V0 - 2*Vc) {this.state.circleDelta > 0 ? "" : ` = ${this.state.circleDelta}`}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>

        )
    };

    start = () =>
    {
        const {xCar, xCircle, circleDelta, carDelta} = this.state;

        if (xCar - (xCircle + initialRadius) > 0 && circleDelta >= 0)
        {
            this.update(circleDelta, carDelta)
        } else
        {
            let x = circleDelta < 0 ? circleDelta : -(Math.abs(circleDelta) - 2 * carDelta);
            this.update(x, carDelta);
        }
    };

    update = (circleDelta, carDelta) =>
    {
        this.setState(state => ({
            circleDelta,
            carDelta,
            xCircle: state.xCircle + circleDelta,
            xCar: state.xCar + carDelta,
        }), () =>
        {
            clearTimeout(time);
            time = setTimeout(() =>
            {
                this.my_clearRect();
                this.line(this.state.width, this.state.height, border);
                this.circle(this.state.xCircle, this.state.yCircle, initialRadius);
                this.ctx.drawImage(this.image, this.state.xCar, this.state.yCar, initialCarWidth, initialCarHeight);
                this.start()
            }, 20)
        })
    };

    handleChangeRange = (e) =>
    {
        if (e.target.id === "ball")
        {
            this.setState({
                circleDelta: +e.target.value,
            })
        } else
        {
            this.setState({
                carDelta: +e.target.value,
            })
        }
    };

    handleStart = () =>
    {
        if (this.state.startClicked)
        {
            this.setState({
                startClicked: false,
            }, this.init)
        } else
        {
            this.setState({
                startClicked: true,
            }, this.start)
        }
    };

    init = () =>
    {
        clearTimeout(time);
        this.setState({
            width: initialWidth,
            height: initialHeight,
            xCar: initial_X_Car,
            yCar: initial_Y_Car,
            xCircle: initial_X_Circle,
            yCircle: initial_Y_Circle,
            circleDelta: initialCircleVel,
            carDelta: initialCarVel,
        }, () =>
        {
            this.my_clearRect();
            if (this.image)
            {
                console.log("mtav");
                this.line(this.state.width, this.state.height, border);
                this.circle(this.state.xCircle, this.state.yCircle, initialRadius);
                this.ctx.drawImage(this.image, this.state.xCar, this.state.yCar, initialCarWidth, initialCarHeight);
            }
        })
    };

    line = (width, height, border) =>
    {
        this.ctx.beginPath();
        this.ctx.moveTo(border, height / 2 + border);
        this.ctx.lineTo(width - border, height / 2 + border);
        this.ctx.stroke();
        this.ctx.closePath();
    };

    circle = (x, y, radius) =>
    {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = "green";
        this.ctx.fill();
        this.ctx.closePath();
    };

    my_clearRect = () =>
    {
        this.ctx.beginPath();
        this.ctx.clearRect(0, 0, this.state.width, this.state.height);
        this.ctx.closePath();
    };

    updateSize = () =>
    {
        const height = window.innerHeight;
        const width = window.innerWidth;

        /*car coordinates*/
        initial_X_Car = (width - HEADER_WIDTH - 20) / 2;
        initial_Y_Car = (height * 7 / 10) / 2;

        /*ball coordinates*/
        initial_Y_Circle = (height * 7 / 10) / 2 + initialCarHeight / 2;
        initial_X_Circle = (width - HEADER_WIDTH - 20) / 4;

        /*width height canvas*/
        initialHeight = (height * 7 / 10);
        initialWidth = (width - HEADER_WIDTH - 20);
        this.init();
    };
}

export default SecondPage;

const styles = {
    canvasContainer: {
        width: "100%",
        height: "100%",
    },
    about: style({
        marginLeft: 20,
        "$nest": {
            "& > div": {
                display: "flex"
            },
            "& > div > span:first-child": {
                textAlign: "right",
                width: 150
            },
            "& > div > span:last-child": {
                textAlign: "left",
                marginLeft: 20,
                width: 300
            }
        }
    })
};