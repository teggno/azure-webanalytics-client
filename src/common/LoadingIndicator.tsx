import React from "react";
import "./LoadingIndicator.css";

export default function({ className }: { className: string }) {
  return (
    <div className={"loading" + (className ? " " + className : "")}>
      Loading...
    </div>
  );
}
