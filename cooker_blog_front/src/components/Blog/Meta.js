import React from 'react';

export default function Meta(props) {
  const { data, error } = props;
  return (
    <>
      <div className="meta">
        Date: {data.date}, Auteur: {data.author}
      </div>
    </>
  );
}
