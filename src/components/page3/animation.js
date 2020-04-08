import React from "react";
import {style} from "typestyle";

const Animation = ({startClicked, handleStart, marginLeft1, marginLeft2, vel1, vel2, onchange1, onchange2}) =>
{
    return (
        <div className={styles.animContainer}>
            <button style={{marginLeft: 20, width: 80, height: 30}} onClick={handleStart}>
                {startClicked ? "Init" : "Start"}
            </button>
            <div style={styles.contAnimControl}>
                <div className={styles.control}>
                    <label htmlFor="vel1">Choose the initial velocity:</label>
                    <select id="vel1"
                            style={styles.select}
                            value={vel1 / 5}
                            onChange={onchange1}
                            disabled={startClicked}>
                        <option>0</option>
                        <option>5</option>
                        <option>10</option>
                        <option>15</option>
                        <option>20</option>
                    </select>
                </div>

                <div style={styles.cont1}>
                    <div className={styles.ball1}
                         style={{
                             marginLeft: `${marginLeft1}%`,
                             transform: `rotateZ(${3 * 360 / 100 * marginLeft1}deg)`
                         }}>
                        1
                    </div>
                </div>
            </div>

            <div style={styles.contAnimControl}>
                <div className={styles.control}>
                    <label htmlFor="vel2">Choose the initial velocity:</label>
                    <select id="vel2"
                            style={styles.select}
                            value={vel2 / 5}
                            onChange={onchange2}
                            disabled={startClicked}>
                        <option>0</option>
                        <option>5</option>
                        <option>10</option>
                        <option>15</option>
                        <option>20</option>
                    </select>
                </div>

                <div style={styles.cont2}>
                    <div className={styles.ball2}
                         style={{
                             marginLeft: `${marginLeft2}%`,
                             transform: `rotateZ(${3 * 360 / 100 * marginLeft2}deg)`
                         }}>
                        2
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Animation;

const styles = {
    animContainer: style({
        width: "100%",
        height: "40%",
    }),
    contAnimControl: {
        display: "inline-flex",
        width: "100%",
        alignItems: "center",
        marginTop: 40
    },
    control: style({
        marginLeft: 20,
        "$nest": {
            "& > label": {
                fontSize: 16
            }
        }
    }),
    select: {
        marginLeft: 10,
        width: 50,
    },
    cont1: {
        position: "relative",
        width: "60%",
        left: "3%",
        borderBottom: "1px solid black",
        height: 40,
    },
    cont2: {
        position: "relative",
        width: "60%",
        left: "3%",
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
};