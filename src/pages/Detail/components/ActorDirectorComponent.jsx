import React from "react";

const ActorDirectorComponent = ({ actorDirector }) => {
    return (
        <>
            {
                actorDirector && actorDirector.length > 0 ? (
                    actorDirector.map((value, index) => (
                        <span key={index}>
                            {value}
                            {index < actorDirector.length - 1 && ", "}
                        </span>
                    ))
                ) : (
                    "Đang cập nhật"
                )
            }
        </>
    );
};

export default ActorDirectorComponent;
