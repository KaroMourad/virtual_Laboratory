import React from "react"
import Layout, {HEADER_WIDTH} from "../components/layout"
import SEO from "../components/seo"
import Car from "../images/car.jpg"
import Info from "../components/BouncingBall/info";
import {AnimationControl} from "../components/BouncingBall/animationControl";
import {style} from "typestyle";

const initialRadius = 25;

const initialCarWidth = 120;
const initialCarHeight = 100;

const border = 100;
let time = 0;

class BouncingBall extends React.Component
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
            initialCircleVel: 16,
            initialCarVel: 7,
            deltaM: 1000,
            width: 0,
            height: 0,
            xCar: 0,
            yCar: 0,
            xCircle: 0,
            yCircle: 0,
            circleDelta: 16,
            carDelta: 7,
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
            if (this.state.deltaM === 1000)
            {
                this.ctx.drawImage(this.image, this.state.xCar, this.state.yCar, initialCarWidth, initialCarHeight);
                this.init();
            }
        };
        this.image.src = Car;
    }

    componentWillUnmount()
    {
        this.init();
        window.removeEventListener("resize", this.updateSize);
    }

    render()
    {
        const {width, height, startClicked, carDelta, circleDelta, deltaM, initialCircleVel, initialCarVel} = this.state;
        return (
            <Layout>
                <SEO title="Отскакивающий мяч"/>
                <div id="canvasContainer" className={styles.canvasContainer}>
                    <canvas
                        id="myCanvas"
                        ref={this.canvasRef}
                        width={width}
                        height={height}
                        style={styles.canvas}
                    >
                        CANVAS DOES NOT SUPPORTED!
                    </canvas>
                    {width && height ? (
                        <>
                            <AnimationControl
                                circleDelta={circleDelta}
                                carDelta={carDelta}
                                startClicked={startClicked}
                                handleChangeRange={this.handleChangeRange}
                                handleStart={this.handleStart}
                                deltaM={deltaM}
                                onChangeDeltaM={this.onChangeDeltaM}
                                initialCarVel={initialCarVel}
                                initialCircleVel={initialCircleVel}
                            />
                            <Info height={height}/>
                        </>
                    ) : null}
                </div>
            </Layout>
        )
    };

    onChangeDeltaM = (e) =>
    {
        this.setState({
            deltaM: +e.target.value
        }, () =>
        {
            this.setWidthHeight();
            this.init();
        });
    };

    start = () =>
    {
        const {xCar, xCircle, circleDelta, carDelta, deltaM} = this.state;
        let xCarOrCircle = deltaM === 1000 ? xCar : xCar - (deltaM === 1 ? initialRadius : Math.pow(1.15, deltaM) * initialRadius);
        if (xCarOrCircle - (xCircle + initialRadius) > 0 && circleDelta >= 0)
        {
            this.update(circleDelta, carDelta)
        } else
        {
            const {v1, V1} = this.getValues();
            this.update(v1, V1);
        }
    };

    getValues = () =>
    {
        const m = 5;
        const M = m * this.state.deltaM;
        const v = this.state.initialCircleVel;
        const V = this.state.initialCarVel;
        const Vc = (m * v + M * V) / (m + M);

        const v1 = -v + 2 * Vc;
        const V1 = -V + 2 * Vc;
        return {v1: Math.round(v1), V1: Math.round(V1)};
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
                if (this.state.deltaM === 1000 && this.image)
                {
                    this.ctx.drawImage(this.image, this.state.xCar, this.state.yCar, initialCarWidth, initialCarHeight);
                } else
                {
                    this.circle(this.state.xCar, this.state.yCar, this.state.deltaM === 1 ? initialRadius : Math.pow(1.15, this.state.deltaM) * initialRadius, "red");
                }
                this.start();
            }, 20);
        })
    };

    handleChangeRange = (e) =>
    {
        const val = +e.target.value;
        if (e.target.id === "ball")
        {
            this.setState({
                initialCircleVel: val,
                circleDelta: val
            })
        } else
        {
            this.setState({
                initialCarVel: val,
                carDelta: val
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
            initialCircleVel: 16,
            initialCarVel: 7,
            circleDelta: 16,
            carDelta: 7,
        }, () =>
        {
            this.my_clearRect();
            this.line(this.state.width, this.state.height, border);
            this.circle(this.state.xCircle, this.state.yCircle, initialRadius);
            if (this.state.deltaM === 1000 && this.image)
            {
                this.ctx.drawImage(this.image, this.state.xCar, this.state.yCar, initialCarWidth, initialCarHeight);
            } else
            {
                this.circle(this.state.xCar, this.state.yCar, this.state.deltaM === 1 ? initialRadius : Math.pow(1.15, this.state.deltaM) * initialRadius, "red");
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

    circle = (x, y, radius, color) =>
    {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = color || "green";
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
            this.initialHeight = (window_height * 2 / 5);

            this.initialWidth = this.initialWidth < 780 ? 780 : this.initialWidth;

            /*car coordinates*/
            this.initial_X_Car = this.initialWidth / 3;
            this.initial_Y_Car = this.initialHeight / 2;

            /*ball coordinates*/
            this.initial_X_Circle = this.initialWidth / 5;
            this.initial_Y_Circle = this.initialHeight / 2 + (this.state.deltaM === 1000 ? initialCarHeight / 2 : 0);
        }
    };

    updateSize = () =>
    {
        this.setWidthHeight();
        this.init();
    };
}

export default BouncingBall;

const styles = {
    canvasContainer: style({
        width: "100%",
        height: "100%",
        background: "#3c5a8c1f",
    }),
    canvas: {
        boxShadow: "inset 0px 0px 3px 0px #888888",
        marginLeft: 10,
        borderRadius: 2,
        background: "white",
    }
};