import { Search } from 'lucide-react';
import React from 'react'
import { Input } from './input';
import { Button } from './button';

const Searchbar = () => {
  return (
    <div className="relative flex items-center">
      <label htmlFor="search-location" className="sr-only">
        Search for City, State
      </label>
      <Search
        className="absolute left-3 text-primary pointer-events-none"
        size={20}
        aria-hidden="true"
      />
      <Input
        type="text"
        id="search-location"
        placeholder="e.g., New York, NY"
        className="pl-12 pr-4 py-2 rounded-l-md rounded-r-none border border-border focus-visible:ring-2 focus-visible:ring-primary"
      />
      <Button variant="default" className="rounded-l-none rounded-r-md">
        Search
      </Button>
    </div>
  );
}

export default Searchbar