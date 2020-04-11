import React from 'react';
import {style} from "typestyle";

const Info = ({startClicked, handleStart, initialValue, onchange1}) =>
{
    return (
        <div className={styles.info}>
            <button style={{width: 80}} onClick={handleStart}>
                {startClicked ? "Init" : "Start"}
            </button>
            <div className={styles.control}>
                <label htmlFor="vel1">Choose the initial velocity of 1st ball:</label>
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
            </div>
        </div>
    );
};

export default Info;

const styles = {
    info: style({
        flex: 1
    }),
    control: style({
        marginTop: 20,
        "$nest": {
            "& > label": {
                fontSize: 16
            }
        }
    }),
    select: {
        marginLeft: 10,
        minWidth: 60
    },
};