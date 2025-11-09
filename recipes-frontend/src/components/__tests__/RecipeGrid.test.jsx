import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RecipeGrid from '../RecipeGrid';

const sample = [
  {
    id: 1,
    name: 'Spicy Chicken Curry',
    cuisine: 'Indian',
    cookTimeMinutes: 45,
    instructions: 'Cook chicken with spices.',
    tags: 'Chicken,Curry'
  },
  {
    id: 2,
    name: 'Vegan Pasta',
    cuisine: 'Italian',
    cookTimeMinutes: 25,
    instructions: 'Boil pasta and add sauce.',
    tags: 'Vegan,Pasta'
  }
];

describe('RecipeGrid', () => {
  it('renders recipe cards and tags', () => {
    render(<RecipeGrid recipes={sample} />);

  expect(screen.getByText('Spicy Chicken Curry')).toBeTruthy();
  expect(screen.getByText('Vegan Pasta')).toBeTruthy();
    // tags rendered
    expect(screen.getAllByText(/Chicken|Vegan/).length).toBeGreaterThan(0);
    // cook time present
  expect(screen.getByText(/45 mins/)).toBeTruthy();
  });
});
