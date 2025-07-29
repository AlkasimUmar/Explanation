import React, { useState, useEffect } from 'react';

// Enhanced Reusable List Component with more features
const ListComponent = ({ 
  items, 
  renderItem, 
  emptyMessage = "No items found",
  loading = false,
  searchTerm = "",
  onItemClick = null
}) => {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <div style={{ 
          display: 'inline-block', 
          width: '20px', 
          height: '20px', 
          border: '3px solid #f3f3f3',
          borderTop: '3px solid #3498db',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p>Loading items...</p>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '40px', 
        color: '#666',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        border: '2px dashed #ddd'
      }}>
        {emptyMessage}
      </div>
    );
  }

  // Filter items based on search term
  const filteredItems = searchTerm 
    ? items.filter(item => 
        (item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.body && item.body.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : items;

  if (filteredItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
        No items match your search: "{searchTerm}"
      </div>
    );
  }

  return (
    <div>
      <p style={{ marginBottom: '15px', color: '#666' }}>
        Showing {filteredItems.length} of {items.length} items
      </p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredItems.map((item, index) => (
          <li 
            key={item.id || index}
            onClick={() => onItemClick && onItemClick(item)}
            style={{ 
              cursor: onItemClick ? 'pointer' : 'default',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => {
              if (onItemClick) e.target.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              if (onItemClick) e.target.style.transform = 'scale(1)';
            }}
          >
            {renderItem ? renderItem(item, index) : <span>{item.name || item.title || 'Item'}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Search Component
const SearchBar = ({ searchTerm, onSearchChange, placeholder = "Search..." }) => (
  <div style={{ marginBottom: '20px' }}>
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: '12px',
        fontSize: '16px',
        border: '2px solid #ddd',
        borderRadius: '8px',
        outline: 'none',
        transition: 'border-color 0.3s'
      }}
      onFocus={(e) => e.target.style.borderColor = '#3498db'}
      onBlur={(e) => e.target.style.borderColor = '#ddd'}
    />
  </div>
);

// Tab Navigation Component
const TabNavigation = ({ activeTab, onTabChange, tabs }) => (
  <div style={{ marginBottom: '20px', borderBottom: '2px solid #eee' }}>
    {tabs.map(tab => (
      <button
        key={tab.id}
        onClick={() => onTabChange(tab.id)}
        style={{
          padding: '12px 24px',
          marginRight: '5px',
          border: 'none',
          backgroundColor: activeTab === tab.id ? '#3498db' : 'transparent',
          color: activeTab === tab.id ? 'white' : '#666',
          borderRadius: '8px 8px 0 0',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: activeTab === tab.id ? 'bold' : 'normal',
          transition: 'all 0.3s'
        }}
        onMouseEnter={(e) => {
          if (activeTab !== tab.id) {
            e.target.style.backgroundColor = '#f0f0f0';
          }
        }}
        onMouseLeave={(e) => {
          if (activeTab !== tab.id) {
            e.target.style.backgroundColor = 'transparent';
          }
        }}
      >
        {tab.label} ({tab.count || 0})
      </button>
    ))}
  </div>
);

// Enhanced API Data Fetcher with multiple endpoints
const ApiDataFetcher = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState({});
  const [error, setError] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  // API endpoints configuration - Updated to use our Node.js backend
  const apiEndpoints = {
    posts: {
      url: 'http://localhost:3001/api/posts',
      label: 'Blog Posts',
      limit: 15
    },
    users: {
      url: 'http://localhost:3001/api/users',
      label: 'Users',
      limit: 10
    },
    albums: {
      url: 'http://localhost:3001/api/albums',
      label: 'Photo Albums',
      limit: 20
    },
    todos: {
      url: 'http://localhost:3001/api/todos',
      label: 'Todo Items',
      limit: 25
    }
  };

  // Fetch data from specific endpoint
  const fetchData = async (endpoint) => {
    setLoading(prev => ({ ...prev, [endpoint]: true }));
    setError(prev => ({ ...prev, [endpoint]: null }));
    
    try {
      const response = await fetch(apiEndpoints[endpoint].url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint}: ${response.status}`);
      }
      const result = await response.json();
      // Handle our custom API response format
      const data = result.data || result;
      const limitedResult = Array.isArray(data) ? data.slice(0, apiEndpoints[endpoint].limit) : data;
      setData(prev => ({ ...prev, [endpoint]: limitedResult }));
    } catch (err) {
      setError(prev => ({ ...prev, [endpoint]: err.message }));
    } finally {
      setLoading(prev => ({ ...prev, [endpoint]: false }));
    }
  };

  // Fetch all data on mount
  useEffect(() => {
    Object.keys(apiEndpoints).forEach(endpoint => {
      fetchData(endpoint);
    });
  }, []);

  // Render functions for different data types
  const renderPost = (post, index) => (
    <div style={{ 
      border: '1px solid #e0e0e0', 
      padding: '20px', 
      margin: '10px 0',
      borderRadius: '8px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'box-shadow 0.3s'
    }}
    onMouseEnter={(e) => e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)'}
    onMouseLeave={(e) => e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <span style={{ backgroundColor: '#3498db', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
          Post #{post.id}
        </span>
        <span style={{ color: '#666', fontSize: '12px' }}>User ID: {post.userId}</span>
      </div>
      <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50', fontSize: '18px' }}>{post.title}</h3>
      <p style={{ margin: 0, color: '#666', lineHeight: '1.5' }}>{post.body}</p>
    </div>
  );

  const renderUser = (user, index) => (
    <div style={{ 
      border: '1px solid #e0e0e0', 
      padding: '20px', 
      margin: '10px 0',
      borderRadius: '8px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
        <div style={{ 
          width: '50px', 
          height: '50px', 
          borderRadius: '50%', 
          backgroundColor: '#3498db',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '20px',
          fontWeight: 'bold',
          marginRight: '15px'
        }}>
          {user.name.charAt(0)}
        </div>
        <div>
          <h3 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>{user.name}</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>@{user.username}</p>
        </div>
      </div>
      <div style={{ fontSize: '14px', color: '#666' }}>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Website:</strong> {user.website}</p>
        <p><strong>Company:</strong> {user.company.name}</p>
        <p><strong>City:</strong> {user.address.city}</p>
      </div>
    </div>
  );

  const renderAlbum = (album, index) => (
    <div style={{ 
      border: '1px solid #e0e0e0', 
      padding: '15px', 
      margin: '8px 0',
      borderRadius: '8px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ backgroundColor: '#e74c3c', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
            Album #{album.id}
          </span>
          <h4 style={{ margin: '10px 0 0 0', color: '#2c3e50' }}>{album.title}</h4>
        </div>
        <span style={{ color: '#666', fontSize: '12px' }}>User: {album.userId}</span>
      </div>
    </div>
  );

  const renderTodo = (todo, index) => (
    <div style={{ 
      border: '1px solid #e0e0e0', 
      padding: '15px', 
      margin: '8px 0',
      borderRadius: '8px',
      backgroundColor: todo.completed ? '#d5f4e6' : '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      opacity: todo.completed ? 0.8 : 1
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ 
            width: '20px', 
            height: '20px', 
            borderRadius: '50%', 
            backgroundColor: todo.completed ? '#27ae60' : '#95a5a6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '12px',
            marginRight: '10px'
          }}>
            {todo.completed ? '✓' : '○'}
          </span>
          <span style={{ 
            textDecoration: todo.completed ? 'line-through' : 'none',
            color: todo.completed ? '#666' : '#2c3e50'
          }}>
            {todo.title}
          </span>
        </div>
        <span style={{ fontSize: '12px', color: '#666' }}>#{todo.id}</span>
      </div>
    </div>
  );

  const getRenderFunction = (type) => {
    switch(type) {
      case 'posts': return renderPost;
      case 'users': return renderUser;
      case 'albums': return renderAlbum;
      case 'todos': return renderTodo;
      default: return null;
    }
  };

  const tabs = Object.keys(apiEndpoints).map(key => ({
    id: key,
    label: apiEndpoints[key].label,
    count: data[key] ? data[key].length : 0
  }));

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#2c3e50', marginBottom: '10px' }}>
          📊 Advanced API Data Explorer
        </h1>
        <p style={{ color: '#666', fontSize: '16px' }}>
          Full-stack application: React frontend + Node.js Express backend
        </p>
        <p style={{ color: '#666', fontSize: '14px' }}>
          Demonstrating scalable architecture with non-blocking I/O operations
        </p>
      </div>

      {/* Tab Navigation */}
      <TabNavigation 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={tabs}
      />

      {/* Search Bar */}
      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder={`Search ${apiEndpoints[activeTab].label.toLowerCase()}...`}
      />

      {/* Error Display */}
      {error[activeTab] && (
        <div style={{ 
          backgroundColor: '#fee', 
          border: '1px solid #fcc',
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '20px',
          color: '#c33'
        }}>
          <strong>❌ Error:</strong> {error[activeTab]}
          <button 
            onClick={() => fetchData(activeTab)}
            style={{
              marginLeft: '15px',
              padding: '8px 16px',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            🔄 Retry
          </button>
        </div>
      )}

      {/* Data Display using Reusable List Component */}
      <div style={{ 
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        padding: '20px',
        minHeight: '400px'
      }}>
        <ListComponent 
          items={data[activeTab]}
          renderItem={getRenderFunction(activeTab)}
          loading={loading[activeTab]}
          searchTerm={searchTerm}
          emptyMessage={`No ${apiEndpoints[activeTab].label.toLowerCase()} found`}
          onItemClick={handleItemClick}
        />
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}
        onClick={() => setSelectedItem(null)}
        >
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '12px',
            maxWidth: '500px',
            maxHeight: '80vh',
            overflow: 'auto',
            position: 'relative'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '15px',
                border: 'none',
                backgroundColor: 'transparent',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              ×
            </button>
            <h2 style={{ marginTop: 0, color: '#2c3e50' }}>Item Details</h2>
            <pre style={{ 
              backgroundColor: '#f8f9fa',
              padding: '15px',
              borderRadius: '8px',
              overflow: 'auto',
              fontSize: '14px',
              whiteSpace: 'pre-wrap'
            }}>
              {JSON.stringify(selectedItem, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Statistics Footer */}
      <div style={{ 
        marginTop: '30px', 
        padding: '20px',
        backgroundColor: '#2c3e50',
        borderRadius: '8px',
        color: 'white',
        textAlign: 'center'
      }}>
        <h3 style={{ margin: '0 0 15px 0' }}>📈 Data Statistics</h3>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          {Object.keys(apiEndpoints).map(key => (
            <div key={key} style={{ margin: '5px' }}>
              <strong>{data[key] ? data[key].length : 0}</strong> {apiEndpoints[key].label}
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// Main App Component
const App = () => {
  return <ApiDataFetcher />;
};

export default App;