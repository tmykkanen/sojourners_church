import * as React from "react";
import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Input } from "./ui/input";

interface SermonSearchExampleProps {}

interface SampleDataItem {
  id: number;
  title: string;
  url: string;
}

const sampleData = [
  {
    id: 1,
    title: "React Official Documentation",
    url: "https://reactjs.org/",
  },
  {
    id: 2,
    title: "Mozilla Developer Network (MDN)",
    url: "https://developer.mozilla.org/",
  },
  {
    id: 3,
    title: "Stack Overflow",
    url: "https://stackoverflow.com/",
  },
  {
    id: 4,
    title: "GitHub",
    url: "https://github.com/",
  },
  {
    id: 5,
    title: "npm",
    url: "https://www.npmjs.com/",
  },
];

const SermonSearchExample: React.FC<SermonSearchExampleProps> = ({}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SampleDataItem[]>([]);

  const debounce = (func: (arg0: string) => void, delay: number) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearch = useCallback(
    debounce((term: string) => {
      if (term.trim() === "") {
        setSearchResults([]);
      } else {
        const results = sampleData.filter((item) =>
          item.title.toLowerCase().includes(term.toLowerCase()),
        );
        setSearchResults(results);
      }
    }, 200),
    [],
  );

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, handleSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <Input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search sermons"
          />
          <div>
            <button type="submit">
              <Search size={20} />
            </button>
          </div>
        </div>
      </form>
      {searchResults.length > 0 && (
        <div>
          <h2>Search results</h2>
          <ul>
            {searchResults.map((result) => (
              <li key={result.id}>
                <a href={result.url} target="_blank" rel="noopener noreferrer">
                  {result.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SermonSearchExample;
