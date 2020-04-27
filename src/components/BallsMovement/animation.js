import React from "react";
import {style} from "typestyle";

const Animation = ({marginLeft1, marginLeft2, handleStart, startClicked, initialValue, onchange1}) =>
{
    return (
        <div style={styles.animContainer}>
            <div style={{position: "absolute", top: 0, left: 0, marginTop: 20}}>
                <button style={{width: 80, marginLeft: 20,}} onClick={handleStart}>
                    {startClicked ? "Init" : "Start"}
                </button>
                <div className={styles.control}>
                    Начальная скорость |
                    <label htmlFor="vel1">первого мяча:</label>
                    <select id="vel1"
                            style={styles.select}
                            value={initialValue}
                            onChange={onchange1}
                            disabled={startClicked}>
                        <option>0.75</option>
                        <option>1</option>
                        <option>1.25</option>
                        <option>1.5</option>
                        <option>1.75</option>
                        <option>2</option>
                    </select>
                    <label>второго мяча: <span>{0}</span></label>
                </div>
            </div>
            <div style={styles.contAnimControl}>
                <div style={styles.cont1}>
                    <div className={styles.ball1}
                         style={{
                             marginLeft: `${100 - marginLeft1}%`,
                             transform: `rotateZ(${-3 * 360 / 100 * marginLeft1}deg)`
                         }}>
                        1
                    </div>
                </div>
                <div className={styles.arrow}
                     style={{right: "calc(50% + 20px)", width: `${(100 - marginLeft1) * initialValue}px`}}>
                    <i className="arrow arrow_left" style={{left: "-2px"}}/>
                </div>
            </div>
            <div style={Object.assign({}, styles.contAnimControl, {marginLeft: 40})}>
                <div style={styles.cont2}>
                    <div className={styles.ball2}
                         style={{
                             marginLeft: `calc(${marginLeft2}% - 40px)`,
                             transform: `rotateZ(${3 * 360 / 100 * marginLeft2}deg)`
                         }}>
                        2
                    </div>
                </div>
                <div className={styles.arrow} style={{width: `${marginLeft2 * initialValue}px`}}>
                    <i className="arrow arrow_right" style={{left: "calc(100% - 8px)"}}/>
                </div>
            </div>
        </div>
    );
};

export default Animation;

const styles = {
    animContainer: {
        width: "100%",
        height: "40%",
        boxShadow: "inset 0px 0px 3px #888888",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        borderRadius: 4,
        background: "white",
    },
    contAnimControl: {
        display: "inline-flex",
        width: "40%",
        alignItems: "center",
    },
    cont1: {
        position: "relative",
        width: "100%",
        borderBottom: "1px solid black",
        height: 40,
    },
    cont2: {
        position: "relative",
        width: "100%",
        borderBottom: "1px solid black",
        height: 40,
    },
    ball1: style({
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "bold",
        width: 40,
        height: 40,
        background: "red",
        borderRadius: "50%",
    }),
    ball2: style({
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "bold",
        width: 40,
        height: 40,
        background: "green",
        borderRadius: "50%",
    }),
    control: style({
        display: "inline-block",
        marginLeft: 20,
        "$nest": {
            "& > label": {
                marginLeft: 10
            }
        }
    }),
    select: {
        marginLeft: 10,
        minWidth: 60
    },
    arrow: style({
        position: "absolute",
        top: "70%",
        height: 5,
        background: "black"
    })
};