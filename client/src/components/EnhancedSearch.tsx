import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search, 
  X, 
  Clock, 
  TrendingUp,
  Hash,
  Keyboard
} from "lucide-react";

interface Sweet {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  rating?: number;
  description?: string;
}

interface EnhancedSearchProps {
  sweets: Sweet[];
  onSearch: (query: string) => void;
  placeholder?: string;
  showSuggestions?: boolean;
  className?: string;
}

export default function EnhancedSearch({ 
  sweets, 
  onSearch, 
  placeholder = "Search sweets, categories, or descriptions...",
  showSuggestions = true,
  className = ""
}: EnhancedSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Get search suggestions
  const getSuggestions = () => {
    if (!query.trim()) {
      return {
        products: [],
        categories: [],
        recent: searchHistory.slice(0, 3)
      };
    }

    const queryLower = query.toLowerCase();
    
    const products = sweets
      .filter(sweet => 
        sweet.name.toLowerCase().includes(queryLower) ||
        sweet.description?.toLowerCase().includes(queryLower)
      )
      .slice(0, 5);

    const categories = Array.from(new Set(
      sweets
        .filter(sweet => sweet.category.toLowerCase().includes(queryLower))
        .map(sweet => sweet.category)
    )).slice(0, 3);

    const recent = searchHistory
      .filter(term => term.toLowerCase().includes(queryLower))
      .slice(0, 3);

    return { products, categories, recent };
  };

  const suggestions = getSuggestions();
  const allSuggestions = [
    ...suggestions.recent.map(term => ({ type: 'recent' as const, value: term })),
    ...suggestions.categories.map(cat => ({ type: 'category' as const, value: cat })),
    ...suggestions.products.map(product => ({ type: 'product' as const, value: product.name, product }))
  ];

  // Handle search execution
  const executeSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      
      // Add to search history
      setSearchHistory(prev => {
        const filtered = prev.filter(term => term !== searchTerm);
        return [searchTerm, ...filtered].slice(0, 10);
      });
    } else {
      onSearch("");
    }
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  // Handle input change
  const handleInputChange = (value: string) => {
    setQuery(value);
    setIsOpen(value.length > 0 || showSuggestions);
    setFocusedIndex(-1);
    
    // Real-time search for immediate feedback
    onSearch(value);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => 
          prev < allSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && allSuggestions[focusedIndex]) {
          const suggestion = allSuggestions[focusedIndex];
          setQuery(suggestion.value);
          executeSearch(suggestion.value);
        } else {
          executeSearch(query);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setFocusedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: { type: string; value: string; product?: Sweet }) => {
    setQuery(suggestion.value);
    executeSearch(suggestion.value);
  };

  // Clear search
  const clearSearch = () => {
    setQuery("");
    onSearch("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  // Clear search history
  const clearHistory = () => {
    setSearchHistory([]);
  };

  // Focus management
  useEffect(() => {
    if (focusedIndex >= 0 && suggestionRefs.current[focusedIndex]) {
      suggestionRefs.current[focusedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  }, [focusedIndex]);

  // Keyboard shortcut (Ctrl/Cmd + K)
  useEffect(() => {
    const handleGlobalKeydown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };

    document.addEventListener('keydown', handleGlobalKeydown);
    return () => document.removeEventListener('keydown', handleGlobalKeydown);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-16"
          data-testid="input-enhanced-search"
        />
        
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {query && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={clearSearch}
              data-testid="button-clear-search"
            >
              <X className="w-3 h-3" />
            </Button>
          )}
          
          <Badge variant="outline" className="text-xs hidden sm:flex">
            <Keyboard className="w-3 h-3 mr-1" />
            ⌘K
          </Badge>
        </div>
      </div>

      {/* Search Suggestions Dropdown */}
      {isOpen && (showSuggestions || query) && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-96 overflow-hidden">
          <CardContent className="p-0">
            <ScrollArea className="max-h-96">
              <div className="py-2">
                {allSuggestions.length === 0 && query ? (
                  <div className="px-4 py-3 text-sm text-muted-foreground text-center">
                    No suggestions found for "{query}"
                  </div>
                ) : (
                  <>
                    {/* Recent Searches */}
                    {suggestions.recent.length > 0 && !query && (
                      <div>
                        <div className="px-4 py-2 text-xs font-medium text-muted-foreground flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            Recent Searches
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-1 text-xs"
                            onClick={clearHistory}
                            data-testid="button-clear-history"
                          >
                            Clear
                          </Button>
                        </div>
                        {suggestions.recent.map((term, index) => (
                          <div
                            key={`recent-${term}`}
                            ref={el => suggestionRefs.current[index] = el}
                            className={`px-4 py-2 cursor-pointer hover:bg-muted flex items-center gap-2 ${
                              focusedIndex === index ? 'bg-muted' : ''
                            }`}
                            onClick={() => handleSuggestionClick({ type: 'recent', value: term })}
                            data-testid={`suggestion-recent-${index}`}
                          >
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span>{term}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Category Suggestions */}
                    {suggestions.categories.length > 0 && (
                      <div>
                        <div className="px-4 py-2 text-xs font-medium text-muted-foreground border-t">
                          <span className="flex items-center gap-2">
                            <Hash className="w-3 h-3" />
                            Categories
                          </span>
                        </div>
                        {suggestions.categories.map((category, index) => {
                          const suggestionIndex = suggestions.recent.length + index;
                          return (
                            <div
                              key={`category-${category}`}
                              ref={el => suggestionRefs.current[suggestionIndex] = el}
                              className={`px-4 py-2 cursor-pointer hover:bg-muted flex items-center gap-2 ${
                                focusedIndex === suggestionIndex ? 'bg-muted' : ''
                              }`}
                              onClick={() => handleSuggestionClick({ type: 'category', value: category })}
                              data-testid={`suggestion-category-${index}`}
                            >
                              <Hash className="w-4 h-4 text-muted-foreground" />
                              <span>{category}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Product Suggestions */}
                    {suggestions.products.length > 0 && (
                      <div>
                        <div className="px-4 py-2 text-xs font-medium text-muted-foreground border-t">
                          <span className="flex items-center gap-2">
                            <TrendingUp className="w-3 h-3" />
                            Products
                          </span>
                        </div>
                        {suggestions.products.map((product, index) => {
                          const suggestionIndex = suggestions.recent.length + suggestions.categories.length + index;
                          return (
                            <div
                              key={`product-${product.id}`}
                              ref={el => suggestionRefs.current[suggestionIndex] = el}
                              className={`px-4 py-2 cursor-pointer hover:bg-muted flex items-center gap-3 ${
                                focusedIndex === suggestionIndex ? 'bg-muted' : ''
                              }`}
                              onClick={() => handleSuggestionClick({ type: 'product', value: product.name, product })}
                              data-testid={`suggestion-product-${index}`}
                            >
                              <div className="w-8 h-8 rounded bg-muted flex-shrink-0 overflow-hidden">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{product.name}</p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span>{product.category}</span>
                                  <span>•</span>
                                  <span>${product.price.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}