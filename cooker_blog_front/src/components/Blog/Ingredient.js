import React from 'react';

export default function Ingredient(props) {
  const { data, error } = props;
  return (
    <>
      <div className="ingredient">
        <h5>Ingredients</h5>
        <ul className="tags">
          {data?.map((ingredient, i) => (
            <li key={i}>{ingredient.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
