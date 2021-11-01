import React from "react";
import { LinkRoute } from "components/LinkRoute";
import { ROOT } from "./CONSTANTS";

export const NotFound = () => {
  return (
    <div>
      {/* Page Not Found! */}
      <LinkRoute to={ROOT}>Home</LinkRoute>
      404: page not found!
    </div>
  );
};
