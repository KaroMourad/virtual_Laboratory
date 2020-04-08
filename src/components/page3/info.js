import React from 'react';
import {style} from "typestyle";

const Info = (props) =>
{
    return (
        <div className={styles.info}>
            info
        </div>
    );
};

export default Info;

const styles = {
    info: style({
        flex: 1
    }),
};