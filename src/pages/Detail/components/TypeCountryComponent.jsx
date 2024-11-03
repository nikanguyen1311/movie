import React from "react";

const TypeCountryComponent = ({ typeCountry }) => {
    return (
        <>
            {typeCountry && typeCountry.map((value, index) => (
                <span key={index}>
                    {value?.name}
                    {index < typeCountry.length - 1 && ', '}
                </span>
            ))}
        </>
    );
};

export default TypeCountryComponent;
