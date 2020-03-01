import React from "react"
import Car from "../images/car1.png";
import Layout, { HEADER_WIDTH } from "../components/layout"
import SEO from "../components/seo"

const initialCircleVel = 18;
const initialCarVel = 3;

const initialRadius = 25;

const initialCarWidth = 100;
const initialCarHeight = 100;

/*car coordinates*/
const initialxCar = (window.innerWidth - HEADER_WIDTH - 20) / 2;
const initialyCar = (window.innerHeight * 7 / 10) / 2;

/*ball coordinates*/
const initialyCircle = (window.innerHeight * 7 / 10) / 2 + initialCarHeight / 2;
const initialxCircle = (window.innerWidth - HEADER_WIDTH - 20) / 4;

/*width height canvas*/
let intialHeight = (window.innerHeight * 7 / 10);
let intialWidth = (window.innerWidth - HEADER_WIDTH - 20);
const border = 100;
let time = 0;

class SecondPage extends React.Component
{
	canvasRef;
	ctx;
	imageRef;

	constructor(props) 
	{
		super(props);
		this.state = {
			startClicked: false,
			width: intialWidth,
			height: intialHeight,
			xCar: initialxCar,
			yCar: initialyCar,
			xCircle: initialxCircle,
			yCircle: initialyCircle,
			circleDelta: initialCircleVel,
			carDelta: initialCarVel
		};
		this.canvasRef = React.createRef(null);
		this.imageRef = React.createRef(null);
	}


	componentDidMount()
	{
		window.addEventListener("resize", () => this.updateSize());
		this.ctx = this.canvasRef.current.getContext('2d');
		this.init();
	}

	componentWillUnmount() 
	{
		window.removeEventListener('resize', () => this.updateSize());
	}

	render()
	{
		return (
			<Layout>
				<img src={Car} alt="car" style={{ display: "none" }} id="carImg" ref={this.imageRef}/>
				<SEO title="Page two" />
				<div id="canvasContainer" style={styles.canvasContainer}>
					<canvas
						id="myCanvas"
						ref={this.canvasRef}
						width={this.state.width}
						height={this.state.height}
						style={{ border: "1px solid #000000" }}
					>
						CANVAS DOES NOT SUPPORTED!
					</canvas>
					<div style={{
						height: window.innerHeight - this.state.height - 10 + "px",
						padding: 10
					}}>
						<div style={{ padding: 10 }}>
							<div style={{ display: "flex", alignItems: "center" }}>
								<label htmlFor="ball">ball: </label>
								<input
									id="ball"
									type="range"
									min="1"
									max="20"
									step="1"
									style={{ margin: "0 10px" }}
									onChange={(e) => this.handleChangeRange(e)}
									value={this.state.circleDelta}
								/>
								{this.state.circleDelta}
							</div>
							<div style={{ display: "flex", alignItems: "center", paddingTop: 10 }}>
								<label htmlFor="car">car: </label>
								<input
									id="car"
									type="range"
									min="0"
									max="20"
									step="1"
									style={{ margin: "0 10px" }}
									onChange={(e) => this.handleChangeRange(e)}
									value={this.state.carDelta}
								/>
								{this.state.carDelta}
							</div>
						</div>
						<button style={{ marginTop: 10 }} onClick={() => this.handleStart()} >
							{this.state.startClicked ? "Init" : "Start"}
						</button>
					</div>
				</div>
			</Layout>
		);
	};

	start()
	{
		const { xCar, xCircle, circleDelta, carDelta } = this.state;

		if (xCar - (xCircle + initialRadius) > 0 && circleDelta >= 0) 
		{
			console.log("circleDelta 1111111111", circleDelta);
			this.update(circleDelta, carDelta);
		}
		else if (-(Math.abs(circleDelta) - carDelta) < 0)
		{
			console.log("circleDelta 2222222222", circleDelta);
			this.update(-(Math.abs(circleDelta) - carDelta), 0);
		}
	}

	update(circleDelta, carDelta) 
	{
		this.setState(state => ({
			circleDelta,
			xCircle: state.xCircle + circleDelta,
			xCar: state.xCar + carDelta
		}), () =>
		{
			clearTimeout(time);
			time = setTimeout(() => 
			{
				this.my_clearRect();
				this.line(this.state.width, this.state.height, border);
				this.circle(this.state.xCircle, this.state.yCircle, initialRadius);
				this.ctx.drawImage(this.imageRef.current, this.state.xCar, this.state.yCar, initialCarWidth, initialCarHeight);

				this.start();
			}, 20);
		})
	}

	handleChangeRange = (e) => 
	{
		if (e.target.id === "ball") 
		{
			this.setState({
				circleDelta: +e.target.value
			});
		}
		else
		{
			this.setState({
				carDelta: +e.target.value
			});
		}
	}

	handleStart()
	{
		if (this.state.startClicked) 
		{
			this.setState({
				startClicked: false
			}, this.init);
		}
		else 
		{
			this.setState({
				startClicked: true
			}, this.start);
		}
	}

	init()
	{
		clearTimeout(time);
		this.setState({
			width: intialWidth,
			height: intialHeight,
			xCar: initialxCar,
			yCar: initialyCar,
			xCircle: initialxCircle,
			yCircle: initialyCircle,
			circleDelta: initialCircleVel,
			carDelta: initialCarVel
		}, () =>
		{
			this.my_clearRect();
			this.line(this.state.width, this.state.height, border);
			this.circle(this.state.xCircle, this.state.yCircle, initialRadius);
			this.ctx.drawImage(this.imageRef.current, this.state.xCar, this.state.yCar, initialCarWidth, initialCarHeight);
		})
	}

	line(width, height, border) 
	{
		this.ctx.beginPath();
		this.ctx.moveTo(border, height / 2 + border);
		this.ctx.lineTo(width - border, height / 2 + border);
		this.ctx.stroke();
		this.ctx.closePath();
	}

	circle(x, y, radius) 
	{
		this.ctx.beginPath();
		this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
		this.ctx.fillStyle = 'green';
		this.ctx.fill();
		this.ctx.closePath();
	}

	my_clearRect() 
	{
		this.ctx.beginPath();
		this.ctx.clearRect(0, 0, this.state.width, this.state.height);
		this.ctx.closePath();
	}

	updateSize() 
	{
		intialHeight = (window.innerHeight * 7 / 10);
		intialWidth = (window.innerWidth - HEADER_WIDTH - 20);
		this.init();
	}
};

export default SecondPage;

const styles = {
	canvasContainer: {
		width: "100%",
		height: "100%",
	}
};