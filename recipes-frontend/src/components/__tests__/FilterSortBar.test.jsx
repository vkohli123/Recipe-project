import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterSortBar from '../FilterSortBar';

describe('FilterSortBar', () => {
  it('calls onSort and onFilter when buttons are clicked', () => {
    const onSort = vi.fn();
    const onFilter = vi.fn();

  render(<FilterSortBar onSort={onSort} onFilter={onFilter} sortOrder="asc" selectedTag={''} tags={["Chicken","Vegan"]} />);

    const sortBtn = screen.getByRole('button', { name: /Sort by Cook Time/ });
    fireEvent.click(sortBtn);
    expect(onSort).toHaveBeenCalled();

    const tagBtn = screen.getByRole('button', { name: 'Chicken' });
    fireEvent.click(tagBtn);
    expect(onFilter).toHaveBeenCalledWith('Chicken');
  });
});
