import React from "react"
import Layout, {HEADER_WIDTH} from "../components/layout"
import SEO from "../components/seo"
import Car from "../images/car.jpg"
import Info from "../components/page2/info";
import Control from "../components/page2/control";

const initialCircleVel = 16;
const initialCarVel = 7;

const initialRadius = 25;

const initialCarWidth = 120;
const initialCarHeight = 100;

const border = 100;
let time = 0;

class SecondPage extends React.Component
{
    canvasRef;
    ctx;
    image;
    initial_X_Car;
    initial_Y_Car;
    initial_Y_Circle;
    initial_X_Circle;
    initialHeight;
    initialWidth;

    constructor(props)
    {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            xCar: 0,
            yCar: 0,
            xCircle: 0,
            yCircle: 0,
            circleDelta: initialCircleVel,
            carDelta: initialCarVel,
            startClicked: false,
        };
        this.canvasRef = React.createRef();
    }


    componentDidMount()
    {
        this.setWidthHeight();

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
        const {width, height, startClicked, carDelta, circleDelta} = this.state;
        return (
            <Layout>
                <SEO title="Page two"/>
                <div id="canvasContainer" style={styles.canvasContainer}>
                    <canvas
                        id="myCanvas"
                        ref={this.canvasRef}
                        width={width}
                        height={height}
                        style={{border: "1px solid #000000"}}
                    >
                        CANVAS DOES NOT SUPPORTED!
                    </canvas>
                    {width && height ? (
                        <>
                            <Control
                                height={height}
                                circleDelta={circleDelta}
                                carDelta={carDelta}
                                startClicked={startClicked}
                                handleChangeRange={this.handleChangeRange}
                                handleStart={this.handleStart}
                            />
                            <Info circleDelta={circleDelta}/>
                        </>
                    ) : null}
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
                this.start();
            }, 20);
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
            width: this.initialWidth,
            height: this.initialHeight,
            xCar: this.initial_X_Car,
            yCar: this.initial_Y_Car,
            xCircle: this.initial_X_Circle,
            yCircle: this.initial_Y_Circle,
            circleDelta: initialCircleVel,
            carDelta: initialCarVel,
        }, () =>
        {
            this.my_clearRect();
            if (this.image)
            {
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

    setWidthHeight = () =>
    {
        if (window)
        {
            let window_width = window.innerWidth;
            let window_height = window.innerHeight;

            if (window_height < 600)
            {
                window_height = 600;
            }
            /*width height canvas*/
            this.initialWidth = (window_width - HEADER_WIDTH - 20);
            this.initialHeight = (window_height * 7 / 10);

            this.initialWidth = this.initialWidth < 800 ? 780 : this.initialWidth;

            /*car coordinates*/
            this.initial_X_Car = this.initialWidth / 2;
            this.initial_Y_Car = this.initialHeight / 2;

            /*ball coordinates*/
            this.initial_X_Circle = this.initialWidth / 4;
            this.initial_Y_Circle = this.initialHeight / 2 + initialCarHeight / 2;
        }
    };

    updateSize = () =>
    {
        this.setWidthHeight();
        this.init();
    };
}

export default SecondPage;

const styles = {
    canvasContainer: {
        position: "relative",
        width: "100%",
        height: "100%",
    }
};