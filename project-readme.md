# Node.js Scalable Web Application

A comprehensive full-stack application demonstrating Node.js scalability features with a React frontend and Express.js backend.

## 🚀 Project Overview

This project showcases the power of Node.js for building scalable web applications, featuring:

- **Backend**: Express.js REST API with non-blocking I/O operations
- **Frontend**: React application with API data fetching and display
- **Performance Testing**: Comprehensive load testing and benchmarking
- **Documentation**: Complete API documentation and performance analysis

## 📋 Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Performance Testing](#performance-testing)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)

## ✨ Features

### Backend Features
- **Non-blocking I/O**: Handles thousands of concurrent connections
- **Event-driven architecture**: Efficient request processing
- **Rate limiting**: Prevents API abuse
- **Error handling**: Comprehensive error management
- **Performance monitoring**: Real-time performance metrics
- **Mock database**: Simulated database operations
- **CORS support**: Cross-origin resource sharing
- **Security headers**: Helmet.js security middleware

### Frontend Features
- **Multiple API endpoints**: Users, Posts, Todos, Albums
- **Real-time search**: Filter data across all content types
- **Tab navigation**: Switch between different data views
- **Loading states**: Visual feedback during API calls
- **Error handling**: User-friendly error messages with retry
- **Responsive design**: Works on all device sizes
- **Interactive UI**: Click-to-view item details

## 🏗️ Architecture

```
┌─────────────────┐    HTTP Requests    ┌─────────────────┐
│                 │ ──────────────────> │                 │
│  React Frontend │                     │ Express Backend │
│                 │ <────────────────── │                 │
└─────────────────┘    JSON Responses   └─────────────────┘
                                                │
                                                │
                                        ┌─────────────────┐
                                        │                 │
                                        │  Mock Database  │
                                        │                 │
                                        └─────────────────┘
```

### Event-Driven Architecture
Node.js uses an event loop to handle multiple requests concurrently without blocking threads:

1. **Event Loop**: Single-threaded loop that processes events
2. **Callback Queue**: Queues callback functions for execution
3. **Non-blocking I/O**: Operations don't block the main thread
4. **Libuv**: Handles asynchronous operations at the system level

## 🛠️ Installation

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/nodejs-scalable-app.git
cd nodejs-scalable-app

# Install backend dependencies
npm install

# Start the server
npm start

# For development (with auto-restart)
npm run dev
```

### Frontend Setup
The React frontend is included as an artifact in this project. To run it locally:

1. Create a new React app
2. Replace the default App.js with the provided React component
3. Install required dependencies: `lucide-react`

## 🚀 Usage

### Starting the Application

1. **Start the backend server**:
   ```bash
   npm start
   ```
   Server will run on `http://localhost:3001`

2. **Access the API**:
   - API Documentation: `http://localhost:3001/api`
   - Health Check: `http://localhost:3001/health`
   - Statistics: `http://localhost:3001/api/stats`

3. **Run the React frontend** (in a separate terminal):
   Update the API base URL in the React component to point to your backend server.

### Running Performance Tests

```bash
# Run comprehensive performance tests
npm run test:performance

# Run load testing with autocannon
npm run benchmark

# Run unit tests
npm test
```

## 📚 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Endpoints

#### GET /api
Returns API information and available endpoints.

#### GET /api/users
Get all users with pagination and search.
- **Query Parameters**:
  - `page` (number): Page number (default: 1)
  - `limit` (number): Items per page (default: 10)
  - `search` (string): Search term

#### GET /api/posts
Get all posts with filtering.
- **Query Parameters**:
  - `userId` (number): Filter by user ID
  - `search` (string): Search in title and body
  - `limit` (number): Maximum results (default: 20)

#### GET /api/todos
Get todos with status filtering.
- **Query Parameters**:
  - `userId` (number): Filter by user ID
  - `completed` (boolean): Filter by completion status
  - `limit` (number): Maximum results (default: 25)

#### GET /api/albums
Get photo albums.
- **Query Parameters**:
  - `userId` (number): Filter by user ID
  - `limit` (number): Maximum results (default: 20)

#### GET /api/stats
Get server performance statistics.

#### POST /api/test-load
Endpoint for load testing.
- **Body Parameters**:
  - `operations` (number): Number of operations
  - `delay` (number): Delay between operations

### Response Format

All API responses follow this format:
```json
{
  "data": [...],
  "pagination": {
    "current_page": 1,
    "per_page": 10,
    "total": 100,
    "total_pages": 10
  }
}
```

Error responses:
```json
{
  "error": {
    "message": "Error description",
    "status": 500,
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

## 🧪 Performance Testing

The project includes comprehensive performance testing to demonstrate Node.js scalability:

### Test Types

1. **Concurrent Connections Test**
   - Tests handling of simultaneous requests
   - Measures response times and success rates
   - Default: 100 concurrent, 1000 total requests

2. **Multiple Endpoints Test**
   - Tests all API endpoints under load
   - Compares performance across different routes

3. **Resource Usage Test**
   - Monitors memory and CPU usage
   - Tests resource efficiency under load

4. **Load Increase Test**
   - Gradually increases load levels
   - Tests breaking points and degradation

### Running Tests

```bash
# Run all performance tests
node tests/performance-test.js

# View results
cat performance-results.txt
```

### Expected Performance Metrics

- **Requests per second**: 500-1000+ RPS
- **Response time**: < 100ms average
- **Success rate**: > 95%
- **Concurrent connections**: 1000+
- **Memory usage**: Stable under load

## 📁 Project Structure

```
nodejs-scalable-app/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── routes/
│   ├── api.js            # Main API routes
│   ├── users.js          # User-specific routes
│   ├── posts.js          # Post-specific routes
│   └── todos.js          # Todo-specific routes
├── tests/
│   ├── performance-test.js # Performance testing
│   └── load-test.js       # Load testing scripts
├── docs/
│   ├── report.md          # Technical report
│   └── api-docs.md        # API documentation
├── frontend/
│   └── App.js            # React frontend component
├── performance-results.txt # Test results
└── README.md             # This file
```

## 🛠️ Technologies Used

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **Morgan**: HTTP request logger
- **Helmet**: Security middleware
- **CORS**: Cross-origin resource sharing
- **Express Rate Limit**: Rate limiting

### Frontend
- **React**: UI framework
- **Lucide React**: Icon library
- **Fetch API**: HTTP client

### Testing
- **Jest**: Unit testing framework
- **Supertest**: HTTP testing
- **Autocannon**: HTTP benchmarking
- **Custom Performance Scripts**: Load testing

## 📊 Performance Analysis

### Node.js Advantages for Scalability

1. **Non-blocking I/O**: Handles multiple operations without waiting
2. **Event-driven**: Efficient event processing
3. **Single-threaded**: Low memory overhead
4. **Fast V8 engine**: High JavaScript execution speed
5. **Rich ecosystem**: npm packages for everything

### Comparison with Traditional Servers

| Metric | Node.js | Traditional (PHP/Java) |
|--------|---------|------------------------|
| Memory usage | Low | High |
| Concurrent connections | 1000+ | 100-200 |
| Response time | < 100ms | 200-500ms |
| CPU efficiency | High | Medium |
| Development speed | Fast | Medium |

## 🔧 Configuration

### Environment Variables

Create a `.env` file:
```env
PORT=3001
NODE_ENV=development
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=1000
```

### Performance Tuning

1. **Increase Event Loop**: Use clustering for CPU-intensive tasks
2. **Connection Pooling**: Implement for database connections
3. **Caching**: Add Redis for frequently accessed data
4. **Load Balancing**: Use nginx for production deployment

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production
```bash
NODE_ENV=production npm start
```

### Docker (Optional)
```dockerfile
FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For questions and support:
- Create an issue on GitHub
- Email: your.email@example.com
- Documentation: [Project Wiki](https://github.com/yourusername/nodejs-scalable-app/wiki)

## 🙏 Acknowledgments

- Node.js community for excellent documentation
- Express.js team for the robust framework
- React team for the frontend framework
- All npm package maintainers

---

**Note**: This project is designed for educational purposes to demonstrate Node.js scalability concepts and best practices in full-stack development.