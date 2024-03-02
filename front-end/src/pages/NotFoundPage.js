import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div>
      <h1>Not Found Page</h1>
      <Link path="/">Return to Dashboard</Link>
    </div>
  );
}

export default NotFoundPage;
