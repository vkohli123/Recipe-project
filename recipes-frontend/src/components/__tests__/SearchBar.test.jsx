import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  it('calls onSearch when submitted', () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);

    const input = screen.getByPlaceholderText(/Search recipes/);
    fireEvent.change(input, { target: { value: 'Chick' } });
    const btn = screen.getByRole('button', { name: /Search/ });
    fireEvent.click(btn);
    expect(onSearch).toHaveBeenCalledWith('Chick');
  });
});
