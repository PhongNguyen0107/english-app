import React from 'react';
import "./RadiusBox.style.scss";

type RadiusBoxPropType = {
  children: React.ReactNode
}
const RadiusBox = (props: RadiusBoxPropType) => {
  return (
    <div className={"radius-box"}>
      {props.children}
    </div>
  );
};


export default RadiusBox;
