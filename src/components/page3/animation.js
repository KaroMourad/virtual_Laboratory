import React from "react";
import {style} from "typestyle";

const Animation = ({marginLeft1, marginLeft2}) =>
{
    return (
        <div className={styles.animContainer}>
            <div style={styles.contAnimControl}>
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