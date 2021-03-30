import React from 'react';

export default function Meta(props) {
  const { data, error } = props;
  const datetime = new Date(data.date)
  return (
    <>
      <div className="meta">
        Publié le {datetime.toLocaleDateString()}, par {data.author}
      </div>
    </>
  );
}
