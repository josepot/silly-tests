import React from "react";

export default function BaseCounter({ onUpVote, onDownVote, count }) {
  return (
    <>
      <button onClick={onDownVote}>-</button>
      {count}
      <button onClick={onUpVote}>+</button>
    </>
  );
}
