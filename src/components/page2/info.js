import React from "react";

const Info = ({height}) =>
{
    return (
        <div style={{
            height: `calc(100% - ${height + 10}px)`,
            padding: 10,
        }}>
            info
        </div>
    );
};

export default Info;

const styles = {};