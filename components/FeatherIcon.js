import React from "react";
import * as icons from "react-feather";

export default function FeatherIcon({ name }) {
  // const IconComponent = icons[name];


  const IconComponent = Icons.Camera;

  //   return cap

  // console.log("icons[name]>>>>>>", name);
  // console.log("IconComponent>>>>>>", cap);

  return <IconComponent></IconComponent>;
}