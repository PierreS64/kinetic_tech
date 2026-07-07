import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

export default function SmartSearch({ data = [], onSelect, placeholder = "Tìm kiếm...", width = "100%", style = {} }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    
    const searchQ = query.toLowerCase();
    const filtered = data.filter(part => {
      const specsStr = typeof part.specs === 'object' ? JSON.stringify(part.specs) : (part.specs || part.description || '');
      return String(part.name || '').toLowerCase().includes(searchQ) ||
             String(specsStr).toLowerCase().includes(searchQ);
    });
    
    setResults(filtered.slice(0, 6)); // Limit to 6 results
  }, [query, data]);

  const formatVND = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value || 0);
  };

  const handleSelect = (item) => {
    setQuery('');
    setIsOpen(false);
    if (onSelect) onSelect(item);
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', width, ...style }} className="smart-search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => {
          if (query.trim()) setIsOpen(true);
        }}
        className="form-input"
        style={{
          paddingLeft: '38px',
          paddingRight: query ? '38px' : '12px',
          fontSize: '13px',
          height: '42px',
          width: '100%',
          borderRadius: isOpen && results.length > 0 ? 'var(--rounded-md) var(--rounded-md) 0 0' : 'var(--rounded-md)',
          transition: 'all 0.2s ease',
        }}
      />
      <Search size={16} style={{
        position: 'absolute',
        left: '14px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: 'var(--color-outline)'
      }} />
      
      {query && (
        <button
          onClick={() => {
            setQuery('');
            setIsOpen(false);
          }}
          className="btn-ghost"
          style={{
            position: 'absolute',
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'transparent',
            border: 'none',
            color: 'var(--color-outline)',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={16} />
        </button>
      )}

      {isOpen && query.trim() && (
        <div className="glass-panel" style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'var(--color-surface)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderTop: 'none',
          borderRadius: '0 0 var(--rounded-md) var(--rounded-md)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          zIndex: 1000,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {results.length > 0 ? (
            <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
              {results.map((item, idx) => (
                <div
                  key={item.id || idx}
                  onClick={() => handleSelect(item)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    cursor: 'pointer',
                    borderBottom: idx === results.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.04)',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 123, 255, 0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <img
                    src={item.image || 'https://via.placeholder.com/40'}
                    alt={item.name}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--rounded-sm)',
                      objectFit: 'cover',
                      background: 'rgba(255,255,255,0.05)'
                    }}
                  />
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ 
                      fontSize: '13px', 
                      fontWeight: '600', 
                      whiteSpace: 'nowrap', 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis',
                      color: 'var(--color-on-surface)'
                    }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--color-primary-dim)', fontWeight: 'bold', marginTop: '2px' }}>
                      {formatVND(item.price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '24px 20px', textAlign: 'center', color: 'var(--color-outline)', fontSize: '13px' }}>
              Không tìm thấy kết quả nào cho "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
