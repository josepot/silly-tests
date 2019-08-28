import React from 'react';

export default function({onUpVote, onDownVote, count}) {
  return (
    <>
      <button onClick={onUpVote}>+</button>
        {count}
      <button onClick={onDownVote}>-</button>
    </>
  );
}
