import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="grow flex  flex-col bg-slate-950 justify-center items-center">
      <h1 className="font-urbanist font-extrabold text-9xl">404</h1>

      <Link
        className="font-urbanist text-lg hover:underline"
        to="../"
      >
        Back to Home
      </Link>
    </div>
  );
}
