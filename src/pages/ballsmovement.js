import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Info from "../components/BallsMovement/info";
import Animation from "../components/BallsMovement/animation";
import Graphic from "../components/BallsMovement/graphic";

class Ballsmovement extends React.Component
{
    requestRef1;
    requestRef2;
    dDelta;
    timeStart;

    constructor(props)
    {
        super(props);

        this.state = {
            initialDelta1: 2,
            initialDelta2: 0,
            startClicked: false,
            marginLeft1: 0,
            marginLeft2: 0,
            delta1: 2,
            delta2: 0,
            restart: true,
        }
        this.requestRef1 = React.createRef();
        this.requestRef2 = React.createRef();
        this.dDelta = this.state.initialDelta1 / (200 / this.state.initialDelta1 - 1);
        this.timeStart = 0;
    }

    componentDidMount()
    {
        window.addEventListener("blur", this.onBlurEffect);
    }

    componentDidUpdate(prevProps, prevState)
    {
        if (prevState.startClicked !== this.state.startClicked)
        {
            if (this.state.startClicked)
            {
                this.setState({
                    restart: false
                });
                this.timeStart = Date.now();
                window.clearTimeout(this.requestRef2.current);
                window.clearTimeout(this.requestRef1.current);
                this.requestRef2.current = window.setTimeout(this.start2, 21);
                this.requestRef1.current = window.setTimeout(this.start1, 21);
            } else
            {
                this.init();
            }
        }
    }

    componentWillUnmount()
    {
        this.init();
        window.removeEventListener("blur", this.onBlurEffect);
    }

    render()
    {
        const {initialDelta1, marginLeft1, marginLeft2, startClicked, delta1, delta2, restart} = this.state;
        return (
            <Layout>
                <SEO title="Вывод формулы пути при равномерном движении"/>
                <div style={styles.container}>
                    <div style={styles.graphicContainer}>
                        <Graphic
                            velocity1={Math.round(delta1 * 1000) / 1000}
                            velocity2={Math.round(delta2 * 1000) / 1000}
                            timeStart={this.timeStart ? (Date.now() - this.timeStart) / 1000 : 0}
                            initialDelta1={initialDelta1}
                            restart={restart}
                            init={this.init}
                        />
                        <Info/>
                    </div>
                    <Animation
                        handleStart={this.handleStart}
                        startClicked={startClicked}
                        initialValue={initialDelta1}
                        onchange1={this.onchange1}
                        marginLeft1={marginLeft1}
                        marginLeft2={marginLeft2}
                    />
                </div>
            </Layout>
        );
    };

    onBlurEffect = (e) =>
    {
        if (this.state.marginLeft2 !== 100)
        {
            this.init();
        }
    }

    onchange1 = (e) =>
    {
        this.setState({
            initialDelta1: parseFloat(e.target.value),
            initialDelta2: 0
        }, this.init);
    }

    handleStart = () =>
    {
        this.setState((state) => ({
            startClicked: !state.startClicked,
        }));
    }

    start1 = () =>
    {
        this.setState(state =>
        {
            if (state.delta1 > 0 && state.marginLeft1 + state.delta1 < 100)
            {
                window.clearTimeout(this.requestRef1.current);
                this.requestRef1.current = window.setTimeout(this.start1, 21);
                return {
                    marginLeft1: state.marginLeft1 + state.delta1,
                    delta1: state.delta1 - this.dDelta
                };
            } else
            {
                return {
                    marginLeft1: 100,
                    delta1: 0
                };
            }
        });
    }

    start2 = () =>
    {
        this.setState(state =>
        {
            if (state.delta2 + this.dDelta < state.initialDelta1 && state.marginLeft2 + state.delta2 < 100)
            {
                window.clearTimeout(this.requestRef2.current);
                this.requestRef2.current = window.setTimeout(this.start2, 21);
                return {
                    marginLeft2: state.marginLeft2 + state.delta2,
                    delta2: state.delta2 + this.dDelta
                };
            } else
            {
                return {
                    marginLeft2: 100,
                    delta2: state.initialDelta1
                };
            }
        });
    }

    init = () =>
    {
        const {initialDelta1, initialDelta2} = this.state;
        this.dDelta = initialDelta1 / (200 / initialDelta1 - 1);
        this.cancelAnimation();
        this.timeStart = 0;
        this.setState({
            delta1: initialDelta1,
            delta2: initialDelta2,
            marginLeft1: 0,
            marginLeft2: 0,
            restart: true,
            startClicked: false,
        });
    }

    cancelAnimation = () =>
    {
        window.clearTimeout(this.requestRef1.current);
        window.clearTimeout(this.requestRef2.current);
        this.requestRef1.current = 0;
        this.requestRef2.current = 0;
    }
}

export default Ballsmovement;

const styles = {
    container: {
        padding: 10,
        width: "100%",
        height: "100%",
        background: "#e7ebf1",
    },
    graphicContainer: {
        width: "100%",
        height: "60%",
    },
};
