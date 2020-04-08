import React from "react";
import {style} from "typestyle";

const Info = ({circleDelta}) =>
{
    return (
        <div className={styles.about}>
            <div>
                <span>before hit</span>:
                <span>Vb = V0 {circleDelta > 0 ? ` = ${circleDelta}` : ""}</span>
            </div>
            <div>
                <span>after hit</span>:
                <span>Vb = - (V0 - 2*Vc) {circleDelta > 0 ? "" : ` = ${circleDelta}`}</span>
            </div>
        </div>
    );
};

export default Info;

const styles = {
    about: style({
        borderBottom: "1px dotted grey",
        borderLeft: "1px dotted grey",
        marginTop: 1,
        padding: "10px 0 10px 10px",
        position: "absolute",
        top: 0,
        right: 20,
        background: "rgb(238,238,238)",
        "$nest": {
            "& > div": {
                display: "flex"
            },
            "& > div:last-child": {
                paddingTop: 10
            },
            "& > div > span:first-child": {
                textAlign: "left",
                width: 100
            },
            "& > div > span:last-child": {
                textAlign: "left",
                marginLeft: 10,
                width: 220
            }
        }
    }),
};

