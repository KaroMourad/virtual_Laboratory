import React from "react"

import Layout, { HEADER_WIDTH } from "../components/layout"
import SEO from "../components/seo"

const initialCircleVel = 5;
const initialCarVel = 1;
const initialRadius = 25;
const initialCarWidth = 100;
const initialCarHeight = 100;

let circleDelta = initialCircleVel;
let carDelta = initialCarVel;

class SecondPage extends React.Component
{
	canvasRef;
	ctx;

	constructor(props) 
	{
		super(props);
		this.state = {
			width: (window.innerWidth - HEADER_WIDTH - 20),
			height: (window.innerHeight * 7 / 10),
			xCircle: (window.innerWidth - HEADER_WIDTH - 20) / 4,
			xCar: (window.innerWidth - HEADER_WIDTH - 20) / 2,
			yCircle: (window.innerHeight * 7 / 10) / 2 + 50,
			yCar: (window.innerHeight * 7 / 10) / 2,
		};
		this.canvasRef = React.createRef(null);
	}


	componentDidMount()
	{
		window.addEventListener("resize", () => this.updateSize());
		this.ctx = this.canvasRef.current.getContext('2d');

		this.init(this.ctx);
	}

	componentWillUnmount() 
	{
		window.removeEventListener('resize', () => this.updateSize());
	}

	render()
	{
		return (
			<Layout>
				<SEO title="Page two" />
				<div
					id="canvasContainer"
					style={styles.canvasContainer}
				>
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
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: window.innerHeight - this.state.height - 10 + "px"
					}}>
						<button onClick={() => this.handleStart()} >
							{circleDelta === initialCircleVel ? "Start" : "Init"}
						</button>
					</div>
				</div>
			</Layout>
		);
	};

	handleStart()
	{
		if (circleDelta === initialCircleVel) 
		{
			this.start(this.ctx);
		}
		else 
		{
			this.init(this.ctx);
		}
	}

	init(ctx)
	{
		circleDelta = initialCircleVel;
		carDelta = initialCarVel;

		this.setState({
			width: (window.innerWidth - HEADER_WIDTH - 20),
			height: (window.innerHeight * 7 / 10),
			xCircle: (window.innerWidth - HEADER_WIDTH - 20) / 4,
			xCar: (window.innerWidth - HEADER_WIDTH - 20) / 2,
			yCircle: (window.innerHeight * 7 / 10) / 2 + initialCarHeight/2,
			yCar: (window.innerHeight * 7 / 10) / 2,
		}, () =>
		{
			this.my_clearRect(ctx);
			this.line(ctx);
			this.circle(ctx, this.state.xCircle, this.state.yCircle, initialRadius);
			this.car(ctx, this.state.xCar, this.state.yCar, initialCarWidth, initialCarHeight);
		})
	}

	line(ctx) 
	{
		ctx.beginPath();
		ctx.moveTo(100, this.state.height / 2 + 100);
		ctx.lineTo(this.state.width - 100, this.state.height / 2 + 100);
		ctx.stroke();
		ctx.closePath();
	}

	circle(ctx, x, y, radius) 
	{
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'green';
		ctx.fill();
		ctx.closePath();
	}

	car(ctx, x, y, carWidth, carHeight) 
	{
		ctx.fillStyle = 'red';
		ctx.fillRect(x, y, carWidth, carHeight);
	}

	start(ctx)
	{
		if (this.state.xCircle - 25 < this.state.xCar - 50 && circleDelta === initialCircleVel) 
		{
			this.update(ctx, circleDelta, carDelta);
		}
		else if (Math.abs(circleDelta) > carDelta)
		{
			circleDelta = -(Math.abs(circleDelta) - 2 * carDelta)
			this.update(ctx, circleDelta, 0);
		}
	}

	update(ctx, circleDelta, carDelta) 
	{
		this.setState(state => ({
			xCircle: state.xCircle + circleDelta,
			xCar: state.xCar + carDelta
		}), () =>
		{
			window.requestAnimationFrame(() => 
			{
				this.my_clearRect(ctx);
				this.line(ctx);
				this.circle(ctx, this.state.xCircle, this.state.yCircle, 25);
				this.car(ctx, this.state.xCar, this.state.yCar, 100, 100);

				this.start(ctx);
			})
		})
	}

	my_clearRect(ctx) 
	{
		ctx.beginPath();
		ctx.clearRect(0, 0, this.state.width, this.state.height);
		ctx.closePath();
	}

	updateSize() 
	{
		this.init(this.ctx);
	}
};

export default SecondPage

const styles = {
	canvasContainer: {
		width: "100%",
		height: "100%",
	}
};