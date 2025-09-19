import React from 'react';

export type SortOption = 'date-newest' | 'date-oldest' | 'amount-highest' | 'amount-lowest';

interface ExpenseSorterProps {
  currentSort: SortOption;
  onSortChange: (sortOption: SortOption) => void;
}

const ExpenseSorter: React.FC<ExpenseSorterProps> = ({ currentSort, onSortChange }) => {
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SortOption);
  };

  return (
    <div className="expense-sorter">
      <label htmlFor="sort-select" className="sort-label">
        📊 Sort by:
      </label>
      <select 
        id="sort-select"
        value={currentSort} 
        onChange={handleSortChange}
        className="sort-select"
      >
        <option value="date-newest">Date (Newest First)</option>
        <option value="date-oldest">Date (Oldest First)</option>
        <option value="amount-highest">Amount (Highest First)</option>
        <option value="amount-lowest">Amount (Lowest First)</option>
      </select>
    </div>
  );
};

export default ExpenseSorter;
