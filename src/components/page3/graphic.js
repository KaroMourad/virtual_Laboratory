import React from 'react';
import {style} from "typestyle";

const Graphic = (props) =>
{
    return (
        <div className={styles.graphic}>
            graphic
        </div>
    );
};

export default Graphic;

const styles = {
    graphic: style({
        flex: 1
    }),
};