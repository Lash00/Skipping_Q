# Logging System Design - ATM Monitoring Application

## Table of Contents
1. [System Overview](#system-overview)
2. [Logging Architecture](#logging-architecture)
3. [Log Categories & Levels](#log-categories--levels)
4. [Data Models](#data-models)
5. [Implementation Guide](#implementation-guide)
6. [API Endpoints](#api-endpoints)
7. [Best Practices](#best-practices)
8. [Security Considerations](#security-considerations)
9. [Performance Optimization](#performance-optimization)

---

## 1. System Overview

### Purpose
The logging system tracks all user actions, system events, security incidents, and operational activities across the ATM monitoring application. It provides comprehensive audit trails, real-time monitoring, and debugging capabilities.

### Key Features
- **Centralized Logging**: All events logged to a single system
- **Real-time Monitoring**: Live log streaming for critical events
- **Audit Trail**: Complete history of user actions
- **Security Monitoring**: Track suspicious activities
- **Performance Tracking**: Monitor system performance metrics
- **Multi-level Logging**: INFO, WARNING, ERROR, CRITICAL, DEBUG
- **Categorized Events**: Organized by category for easy filtering

---

## 2. Logging Architecture

### Architecture Diagram
```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend Layer                           │
├─────────────────────────────────────────────────────────────┤
│  • User Actions                                              │
│  • Client-side Errors                                        │
│  • Performance Metrics                                       │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                     API Gateway                              │
├─────────────────────────────────────────────────────────────┤
│  • Request Validation                                        │
│  • Rate Limiting                                             │
│  • Authentication                                            │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                   Logging Service                            │
├─────────────────────────────────────────────────────────────┤
│  • Log Processing                                            │
│  • Enrichment (IP, User Agent, Location)                    │
│  • Categorization                                            │
│  • Priority Assignment                                       │
└─────────────────┬───────────────────────────────────────────┘
                  │
       ┌──────────┴──────────┐
       ▼                     ▼
┌──────────────┐     ┌──────────────┐
│   Database   │     │  Log Buffer  │
│              │     │  (Redis/     │
│  PostgreSQL  │     │   Memory)    │
│  / MySQL     │     │              │
└──────────────┘     └──────────────┘
       │                     │
       └──────────┬──────────┘
                  ▼
┌─────────────────────────────────────────────────────────────┐
│              Analytics & Monitoring Layer                    │
├─────────────────────────────────────────────────────────────┤
│  • Real-time Dashboards                                      │
│  • Alert System                                              │
│  • Log Analysis                                              │
│  • Report Generation                                         │
└─────────────────────────────────────────────────────────────┘
```

### Components

#### 1. Log Collector
- Receives logs from multiple sources (frontend, backend, ATMs, cameras)
- Validates log format and data integrity
- Enriches logs with contextual information

#### 2. Log Processor
- Categorizes logs based on action type
- Assigns severity levels
- Filters sensitive information
- Formats logs for storage

#### 3. Log Storage
- **Primary Storage**: Database (PostgreSQL/MySQL)
- **Cache Layer**: Redis for recent logs
- **Archive Storage**: Cold storage for old logs (S3/Cloud Storage)

#### 4. Log Query Service
- Provides API endpoints for log retrieval
- Supports filtering, searching, and pagination
- Implements role-based access control

---

## 3. Log Categories & Levels

### Log Categories

```javascript
const LOG_CATEGORIES = {
  AUTHENTICATION: {
    id: 1,
    name: "Authentication",
    description: "Login, logout, and authentication-related events",
    examples: [
      "User Login",
      "User Logout",
      "Password Reset",
      "Failed Login Attempt",
      "Session Expired",
      "Two-Factor Authentication"
    ]
  },
  
  SYSTEM: {
    id: 2,
    name: "System",
    description: "System-level operations and changes",
    examples: [
      "System Startup",
      "System Shutdown",
      "Configuration Change",
      "Service Restart",
      "Database Migration",
      "Backup Created"
    ]
  },
  
  ATM_OPERATIONS: {
    id: 3,
    name: "ATM Operations",
    description: "ATM-related activities",
    examples: [
      "ATM Status Change",
      "Cash Withdrawal",
      "Cash Deposit",
      "ATM Low Cash Warning",
      "ATM Maintenance",
      "ATM Offline"
    ]
  },
  
  DATA_MODIFICATION: {
    id: 4,
    name: "Data Modification",
    description: "Create, update, delete operations",
    examples: [
      "Record Created",
      "Record Updated",
      "Record Deleted",
      "Bulk Import",
      "Data Export"
    ]
  },
  
  SECURITY: {
    id: 5,
    name: "Security",
    description: "Security events and alerts",
    examples: [
      "Unauthorized Access Attempt",
      "Suspicious Activity Detected",
      "Security Policy Violation",
      "Privilege Escalation Attempt",
      "Data Breach Attempt"
    ]
  },
  
  CAMERA: {
    id: 6,
    name: "Camera",
    description: "Camera and surveillance events",
    examples: [
      "Camera Online",
      "Camera Offline",
      "Recording Started",
      "Recording Stopped",
      "Motion Detected",
      "Camera Configuration Changed"
    ]
  }
};
```

### Log Levels

```javascript
const LOG_LEVELS = {
  DEBUG: {
    id: 5,
    name: "DEBUG",
    color: "#3b82f6",
    severity: 0,
    description: "Detailed information for debugging",
    shouldAlert: false
  },
  
  INFO: {
    id: 1,
    name: "INFO",
    color: "#36e27b",
    severity: 1,
    description: "General informational messages",
    shouldAlert: false
  },
  
  WARNING: {
    id: 2,
    name: "WARNING",
    color: "#fbbf24",
    severity: 2,
    description: "Warning messages for potentially harmful situations",
    shouldAlert: true,
    alertThreshold: 5 // Alert if 5 warnings in 1 hour
  },
  
  ERROR: {
    id: 3,
    name: "ERROR",
    color: "#ef4444",
    severity: 3,
    description: "Error events that might still allow operation",
    shouldAlert: true,
    alertThreshold: 1 // Alert immediately
  },
  
  CRITICAL: {
    id: 4,
    name: "CRITICAL",
    color: "#dc2626",
    severity: 4,
    description: "Critical conditions requiring immediate attention",
    shouldAlert: true,
    alertThreshold: 1, // Alert immediately
    notifyAdmin: true
  }
};
```

---

## 4. Data Models

### Database Schema

```sql
-- Log Categories Table
CREATE TABLE log_categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    category_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Log Levels Table
CREATE TABLE log_levels (
    level_id INT PRIMARY KEY AUTO_INCREMENT,
    level_name VARCHAR(50) NOT NULL UNIQUE,
    level_color VARCHAR(20),
    severity INT NOT NULL,
    should_alert BOOLEAN DEFAULT FALSE,
    alert_threshold INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- System Logs Table (Main)
CREATE TABLE system_logs (
    log_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    category_id INT NOT NULL,
    level_id INT NOT NULL,
    action VARCHAR(255) NOT NULL,
    description TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    request_method VARCHAR(10),
    request_url TEXT,
    response_status INT,
    response_time_ms INT,
    metadata JSON,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (category_id) REFERENCES log_categories(category_id),
    FOREIGN KEY (level_id) REFERENCES log_levels(level_id),
    
    INDEX idx_user_id (user_id),
    INDEX idx_category_id (category_id),
    INDEX idx_level_id (level_id),
    INDEX idx_timestamp (timestamp),
    INDEX idx_action (action),
    INDEX idx_ip_address (ip_address)
);

-- ATM Logs Table (Specialized)
CREATE TABLE atm_logs (
    atm_log_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    atm_id INT NOT NULL,
    log_id BIGINT NOT NULL,
    transaction_type VARCHAR(50),
    amount DECIMAL(10, 2),
    card_number_masked VARCHAR(20),
    transaction_status VARCHAR(50),
    error_code VARCHAR(50),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (atm_id) REFERENCES atm(atm_id) ON DELETE CASCADE,
    FOREIGN KEY (log_id) REFERENCES system_logs(log_id) ON DELETE CASCADE,
    
    INDEX idx_atm_id (atm_id),
    INDEX idx_transaction_type (transaction_type),
    INDEX idx_timestamp (timestamp)
);

-- Camera Logs Table (Specialized)
CREATE TABLE camera_logs (
    camera_log_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    camera_view_id INT NOT NULL,
    log_id BIGINT NOT NULL,
    event_type VARCHAR(50),
    frame_url TEXT,
    people_count INT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (camera_view_id) REFERENCES camera_view(camera_view_id) ON DELETE CASCADE,
    FOREIGN KEY (log_id) REFERENCES system_logs(log_id) ON DELETE CASCADE,
    
    INDEX idx_camera_view_id (camera_view_id),
    INDEX idx_event_type (event_type),
    INDEX idx_timestamp (timestamp)
);

-- Security Events Table
CREATE TABLE security_events (
    security_event_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    log_id BIGINT NOT NULL,
    threat_level VARCHAR(50),
    attack_type VARCHAR(100),
    source_ip VARCHAR(45),
    target_resource TEXT,
    is_blocked BOOLEAN DEFAULT FALSE,
    remediation_action TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (log_id) REFERENCES system_logs(log_id) ON DELETE CASCADE,
    
    INDEX idx_threat_level (threat_level),
    INDEX idx_attack_type (attack_type),
    INDEX idx_source_ip (source_ip),
    INDEX idx_timestamp (timestamp)
);

-- Log Archive Table (for old logs)
CREATE TABLE archived_logs (
    archive_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    original_log_id BIGINT NOT NULL,
    log_data JSON NOT NULL,
    archived_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_original_log_id (original_log_id),
    INDEX idx_archived_at (archived_at)
);
```

### TypeScript Interfaces

```typescript
// Core Log Interface
interface SystemLog {
  log_id?: number;
  user_id?: number;
  category_id: number;
  level_id: number;
  action: string;
  description?: string;
  ip_address?: string;
  user_agent?: string;
  request_method?: string;
  request_url?: string;
  response_status?: number;
  response_time_ms?: number;
  metadata?: Record<string, any>;
  timestamp?: Date;
}

// Log Category Interface
interface LogCategory {
  category_id: number;
  category_name: string;
  category_description?: string;
  created_at?: Date;
}

// Log Level Interface
interface LogLevel {
  level_id: number;
  level_name: string;
  level_color?: string;
  severity: number;
  should_alert?: boolean;
  alert_threshold?: number;
  created_at?: Date;
}

// Log Query Parameters
interface LogQueryParams {
  user_id?: number;
  category_id?: number;
  level_id?: number;
  action?: string;
  start_date?: Date;
  end_date?: Date;
  ip_address?: string;
  limit?: number;
  offset?: number;
  sort_by?: 'timestamp' | 'level_id' | 'category_id';
  sort_order?: 'ASC' | 'DESC';
}

// Log Response
interface LogResponse {
  success: boolean;
  data: SystemLog[];
  total: number;
  page: number;
  per_page: number;
}
```

---

## 5. Implementation Guide

### Backend Implementation (Node.js/Express)

```javascript
// logger.service.js
class LoggerService {
  constructor(database) {
    this.db = database;
    this.logBuffer = []; // In-memory buffer
    this.flushInterval = 5000; // Flush every 5 seconds
    
    // Start periodic flush
    this.startPeriodicFlush();
  }
  
  // Main logging method
  async log(logData) {
    try {
      // Enrich log data
      const enrichedLog = this.enrichLog(logData);
      
      // Validate log data
      if (!this.validateLog(enrichedLog)) {
        throw new Error('Invalid log data');
      }
      
      // Add to buffer
      this.logBuffer.push(enrichedLog);
      
      // If critical, flush immediately
      if (enrichedLog.level_id === 4) {
        await this.flush();
        await this.sendAlert(enrichedLog);
      }
      
      // If buffer is full, flush
      if (this.logBuffer.length >= 100) {
        await this.flush();
      }
      
      return { success: true, log_id: null }; // ID assigned after flush
    } catch (error) {
      console.error('Logging error:', error);
      return { success: false, error: error.message };
    }
  }
  
  // Enrich log with contextual data
  enrichLog(logData) {
    return {
      ...logData,
      timestamp: new Date(),
      metadata: {
        ...logData.metadata,
        server: process.env.SERVER_NAME,
        environment: process.env.NODE_ENV,
      }
    };
  }
  
  // Validate log structure
  validateLog(log) {
    return (
      log.category_id &&
      log.level_id &&
      log.action &&
      typeof log.action === 'string'
    );
  }
  
  // Flush buffer to database
  async flush() {
    if (this.logBuffer.length === 0) return;
    
    const logsToFlush = [...this.logBuffer];
    this.logBuffer = [];
    
    try {
      await this.db.insertMany('system_logs', logsToFlush);
    } catch (error) {
      console.error('Error flushing logs:', error);
      // Put logs back in buffer
      this.logBuffer = [...logsToFlush, ...this.logBuffer];
    }
  }
  
  // Periodic flush
  startPeriodicFlush() {
    setInterval(() => {
      this.flush();
    }, this.flushInterval);
  }
  
  // Send alert for critical logs
  async sendAlert(log) {
    // TODO: Implement alert mechanism (email, SMS, webhook)
    console.log('CRITICAL ALERT:', log);
  }
  
  // Query logs
  async query(params) {
    try {
      const { filters, pagination } = this.buildQuery(params);
      
      const logs = await this.db.query('system_logs', filters, pagination);
      const total = await this.db.count('system_logs', filters);
      
      return {
        success: true,
        data: logs,
        total,
        page: pagination.page,
        per_page: pagination.limit
      };
    } catch (error) {
      console.error('Error querying logs:', error);
      return { success: false, error: error.message };
    }
  }
  
  // Build query from parameters
  buildQuery(params) {
    const filters = {};
    const pagination = {
      limit: params.limit || 50,
      offset: params.offset || 0,
      page: Math.floor((params.offset || 0) / (params.limit || 50)) + 1
    };
    
    if (params.user_id) filters.user_id = params.user_id;
    if (params.category_id) filters.category_id = params.category_id;
    if (params.level_id) filters.level_id = params.level_id;
    if (params.action) filters.action = { $like: `%${params.action}%` };
    if (params.start_date) filters.timestamp = { $gte: params.start_date };
    if (params.end_date) {
      filters.timestamp = { ...filters.timestamp, $lte: params.end_date };
    }
    
    return { filters, pagination };
  }
  
  // Archive old logs
  async archiveLogs(olderThan) {
    try {
      const oldLogs = await this.db.query('system_logs', {
        timestamp: { $lt: olderThan }
      });
      
      // Move to archive
      await this.db.insertMany('archived_logs', 
        oldLogs.map(log => ({
          original_log_id: log.log_id,
          log_data: log
        }))
      );
      
      // Delete from main table
      await this.db.delete('system_logs', {
        timestamp: { $lt: olderThan }
      });
      
      return { success: true, archived_count: oldLogs.length };
    } catch (error) {
      console.error('Error archiving logs:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = LoggerService;
```

### Middleware Implementation

```javascript
// logging.middleware.js
const loggerService = require('./logger.service');

// Request logging middleware
function requestLogger(req, res, next) {
  const startTime = Date.now();
  
  // Log when response finishes
  res.on('finish', () => {
    const responseTime = Date.now() - startTime;
    
    loggerService.log({
      user_id: req.user?.user_id,
      category_id: 2, // System
      level_id: 1, // INFO
      action: `${req.method} ${req.path}`,
      description: `API request completed`,
      ip_address: req.ip,
      user_agent: req.get('user-agent'),
      request_method: req.method,
      request_url: req.originalUrl,
      response_status: res.statusCode,
      response_time_ms: responseTime,
      metadata: {
        query: req.query,
        body: req.body
      }
    });
  });
  
  next();
}

// Error logging middleware
function errorLogger(err, req, res, next) {
  loggerService.log({
    user_id: req.user?.user_id,
    category_id: 2, // System
    level_id: 3, // ERROR
    action: `Error: ${req.method} ${req.path}`,
    description: err.message,
    ip_address: req.ip,
    user_agent: req.get('user-agent'),
    request_method: req.method,
    request_url: req.originalUrl,
    response_status: err.status || 500,
    metadata: {
      stack: err.stack,
      error: err.toString()
    }
  });
  
  next(err);
}

module.exports = { requestLogger, errorLogger };
```

### Frontend Implementation (React)

```javascript
// useLogger.hook.js
import { useCallback } from 'react';

export function useLogger() {
  const log = useCallback(async (logData) => {
    try {
      // TODO: Replace with actual API endpoint
      const response = await fetch('/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          ...logData,
          client_info: {
            screen_resolution: `${window.screen.width}x${window.screen.height}`,
            viewport: `${window.innerWidth}x${window.innerHeight}`,
            user_agent: navigator.userAgent,
            language: navigator.language
          }
        })
      });
      
      return await response.json();
    } catch (error) {
      console.error('Error logging:', error);
      return { success: false, error: error.message };
    }
  }, []);
  
  const logAction = useCallback((action, description, metadata = {}) => {
    return log({
      category_id: 4, // Data Modification
      level_id: 1, // INFO
      action,
      description,
      metadata
    });
  }, [log]);
  
  const logError = useCallback((error, context = {}) => {
    return log({
      category_id: 2, // System
      level_id: 3, // ERROR
      action: 'Client Error',
      description: error.message || error.toString(),
      metadata: {
        error: error.toString(),
        stack: error.stack,
        ...context
      }
    });
  }, [log]);
  
  return { log, logAction, logError };
}

// Usage example
function MyComponent() {
  const { logAction, logError } = useLogger();
  
  const handleUpdate = async () => {
    try {
      // Perform update
      await updateData();
      
      // Log successful action
      await logAction(
        'Data Updated',
        'User updated ATM configuration',
        { atm_id: 123, changes: { allows_deposit: true } }
      );
    } catch (error) {
      // Log error
      await logError(error, { component: 'MyComponent', action: 'update' });
    }
  };
  
  return <button onClick={handleUpdate}>Update</button>;
}
```

---

## 6. API Endpoints

### REST API Specification

```javascript
// POST /api/logs - Create a log entry
{
  "method": "POST",
  "endpoint": "/api/logs",
  "body": {
    "category_id": 1,
    "level_id": 1,
    "action": "User Login",
    "description": "User logged in successfully",
    "metadata": { "session_id": "abc123" }
  },
  "response": {
    "success": true,
    "log_id": 123
  }
}

// GET /api/logs - Query logs
{
  "method": "GET",
  "endpoint": "/api/logs",
  "query_params": {
    "user_id": 1,
    "category_id": 1,
    "level_id": 1,
    "start_date": "2026-01-01",
    "end_date": "2026-02-02",
    "limit": 50,
    "offset": 0
  },
  "response": {
    "success": true,
    "data": [...],
    "total": 1000,
    "page": 1,
    "per_page": 50
  }
}

// GET /api/logs/:log_id - Get specific log
{
  "method": "GET",
  "endpoint": "/api/logs/123",
  "response": {
    "success": true,
    "data": {
      "log_id": 123,
      "user_id": 1,
      "category_id": 1,
      "level_id": 1,
      "action": "User Login",
      "description": "User logged in successfully",
      "timestamp": "2026-02-02T10:00:00Z"
    }
  }
}

// GET /api/logs/categories - Get all log categories
{
  "method": "GET",
  "endpoint": "/api/logs/categories",
  "response": {
    "success": true,
    "data": [...]
  }
}

// GET /api/logs/levels - Get all log levels
{
  "method": "GET",
  "endpoint": "/api/logs/levels",
  "response": {
    "success": true,
    "data": [...]
  }
}

// GET /api/logs/stats - Get log statistics
{
  "method": "GET",
  "endpoint": "/api/logs/stats",
  "query_params": {
    "start_date": "2026-01-01",
    "end_date": "2026-02-02"
  },
  "response": {
    "success": true,
    "data": {
      "total_logs": 10000,
      "by_level": {
        "INFO": 8000,
        "WARNING": 1500,
        "ERROR": 400,
        "CRITICAL": 100
      },
      "by_category": {
        "Authentication": 3000,
        "System": 2000,
        "ATM Operations": 3000,
        "Data Modification": 1500,
        "Security": 300,
        "Camera": 200
      },
      "top_users": [...],
      "top_actions": [...]
    }
  }
}

// DELETE /api/logs/archive - Archive old logs
{
  "method": "DELETE",
  "endpoint": "/api/logs/archive",
  "body": {
    "older_than": "2025-12-01"
  },
  "response": {
    "success": true,
    "archived_count": 5000
  }
}
```

---

## 7. Best Practices

### 1. What to Log

**DO LOG:**
- User authentication events (login, logout, password changes)
- Authorization failures
- Data modifications (create, update, delete)
- System errors and exceptions
- Security events (suspicious activities, unauthorized access attempts)
- Performance metrics (slow queries, high memory usage)
- External API calls and responses
- Critical business operations

**DON'T LOG:**
- Passwords (even hashed)
- Credit card numbers or sensitive financial data
- Personal identification numbers (SSN, passport numbers)
- API keys or secrets
- Session tokens
- Health information (HIPAA compliance)

### 2. Log Message Format

```javascript
// Good log message
{
  action: "User Login",
  description: "User 'admin@example.com' logged in successfully from IP 197.34.56.78",
  metadata: {
    session_id: "sess_12345",
    device_type: "desktop",
    browser: "Chrome 120"
  }
}

// Bad log message
{
  action: "login",
  description: "success"
}
```

### 3. Performance Considerations

```javascript
// Use buffering for high-volume logging
const logBuffer = [];
const BUFFER_SIZE = 100;
const FLUSH_INTERVAL = 5000;

function log(data) {
  logBuffer.push(data);
  
  if (logBuffer.length >= BUFFER_SIZE) {
    flush();
  }
}

function flush() {
  if (logBuffer.length === 0) return;
  
  const logsToSave = [...logBuffer];
  logBuffer.length = 0;
  
  // Batch insert
  database.insertMany('system_logs', logsToSave);
}

// Periodic flush
setInterval(flush, FLUSH_INTERVAL);
```

### 4. Log Rotation

```javascript
// Archive logs older than 90 days
async function rotateLogscron.schedule('0 2 * * *', async () => { // Run daily at 2 AM
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  
  await loggerService.archiveLogs(ninetyDaysAgo);
});
```

---

## 8. Security Considerations

### 1. Access Control

```javascript
// Role-based access to logs
const LOG_ACCESS_PERMISSIONS = {
  SUPER_ADMIN: ['view_all', 'export', 'delete', 'archive'],
  DEVELOPER: ['view_all', 'export'],
  BRANCH_MANAGER: ['view_own_branch'],
  USER: ['view_own']
};

function canAccessLog(user, log) {
  const permissions = LOG_ACCESS_PERMISSIONS[user.role];
  
  if (permissions.includes('view_all')) return true;
  if (permissions.includes('view_own') && log.user_id === user.user_id) return true;
  if (permissions.includes('view_own_branch')) {
    // Check if log is related to user's branch
    return log.metadata?.branch_id === user.branch_id;
  }
  
  return false;
}
```

### 2. Data Sanitization

```javascript
function sanitizeLogData(data) {
  const sanitized = { ...data };
  
  // Remove sensitive fields
  const sensitiveFields = [
    'password',
    'password_hash',
    'credit_card',
    'ssn',
    'api_key',
    'secret'
  ];
  
  function removeSensitive(obj) {
    if (typeof obj !== 'object' || obj === null) return obj;
    
    const cleaned = Array.isArray(obj) ? [] : {};
    
    for (const [key, value] of Object.entries(obj)) {
      if (sensitiveFields.some(field => key.toLowerCase().includes(field))) {
        cleaned[key] = '[REDACTED]';
      } else if (typeof value === 'object') {
        cleaned[key] = removeSensitive(value);
      } else {
        cleaned[key] = value;
      }
    }
    
    return cleaned;
  }
  
  sanitized.metadata = removeSensitive(sanitized.metadata);
  
  return sanitized;
}
```

### 3. Encryption

```javascript
// Encrypt sensitive log data before storage
const crypto = require('crypto');

function encryptMetadata(metadata) {
  const algorithm = 'aes-256-gcm';
  const key = Buffer.from(process.env.LOG_ENCRYPTION_KEY, 'hex');
  const iv = crypto.randomBytes(16);
  
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  
  let encrypted = cipher.update(JSON.stringify(metadata), 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  return {
    encrypted: encrypted,
    iv: iv.toString('hex'),
    authTag: authTag.toString('hex')
  };
}

function decryptMetadata(encryptedData) {
  const algorithm = 'aes-256-gcm';
  const key = Buffer.from(process.env.LOG_ENCRYPTION_KEY, 'hex');
  const iv = Buffer.from(encryptedData.iv, 'hex');
  const authTag = Buffer.from(encryptedData.authTag, 'hex');
  
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  decipher.setAuthTag(authTag);
  
  let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return JSON.parse(decrypted);
}
```

---

## 9. Performance Optimization

### 1. Database Indexing

```sql
-- Create indexes for frequently queried columns
CREATE INDEX idx_logs_user_timestamp ON system_logs(user_id, timestamp DESC);
CREATE INDEX idx_logs_category_level ON system_logs(category_id, level_id);
CREATE INDEX idx_logs_action ON system_logs(action(100)); -- Prefix index for VARCHAR
CREATE INDEX idx_logs_ip ON system_logs(ip_address);

-- Composite index for common queries
CREATE INDEX idx_logs_composite ON system_logs(
  user_id, 
  category_id, 
  level_id, 
  timestamp DESC
);
```

### 2. Partitioning

```sql
-- Partition by month for better performance
ALTER TABLE system_logs
PARTITION BY RANGE (YEAR(timestamp) * 100 + MONTH(timestamp)) (
  PARTITION p202601 VALUES LESS THAN (202602),
  PARTITION p202602 VALUES LESS THAN (202603),
  PARTITION p202603 VALUES LESS THAN (202604),
  -- Add more partitions as needed
  PARTITION p_future VALUES LESS THAN MAXVALUE
);
```

### 3. Caching Strategy

```javascript
// Cache recent logs in Redis
const Redis = require('redis');
const redis = Redis.createClient();

async function getRecentLogs(limit = 100) {
  // Check cache first
  const cached = await redis.get(`recent_logs:${limit}`);
  if (cached) {
    return JSON.parse(cached);
  }
  
  // Query database
  const logs = await database.query('system_logs', {}, {
    limit,
    sort: 'timestamp DESC'
  });
  
  // Cache for 5 minutes
  await redis.setex(`recent_logs:${limit}`, 300, JSON.stringify(logs));
  
  return logs;
}

// Invalidate cache when new log is added
async function addLog(logData) {
  const result = await database.insert('system_logs', logData);
  
  // Clear cache
  await redis.del('recent_logs:*');
  
  return result;
}
```

### 4. Async Processing

```javascript
// Use message queue for non-critical logs
const Queue = require('bull');
const logQueue = new Queue('logs', {
  redis: { port: 6379, host: '127.0.0.1' }
});

// Producer
async function queueLog(logData) {
  await logQueue.add(logData, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000
    }
  });
}

// Consumer
logQueue.process(async (job) => {
  const logData = job.data;
  await database.insert('system_logs', logData);
});
```

---

## 10. Monitoring & Alerting

### Alert Rules

```javascript
const ALERT_RULES = [
  {
    name: 'High Error Rate',
    condition: 'error_count > 100 in last 5 minutes',
    action: 'send_email_to_admin',
    severity: 'HIGH'
  },
  {
    name: 'Critical Event',
    condition: 'level_id = 4',
    action: 'send_sms_and_email',
    severity: 'CRITICAL'
  },
  {
    name: 'Multiple Failed Logins',
    condition: 'failed_login_count > 5 for same user in 10 minutes',
    action: 'lock_account_and_alert',
    severity: 'MEDIUM'
  },
  {
    name: 'ATM Offline',
    condition: 'atm_status = offline',
    action: 'notify_branch_manager',
    severity: 'HIGH'
  }
];
```

### Dashboard Metrics

- **Total Logs**: Count of all logs
- **Logs by Level**: Breakdown by INFO, WARNING, ERROR, CRITICAL
- **Logs by Category**: Breakdown by category
- **Top Users**: Most active users
- **Top Actions**: Most frequent actions
- **Error Rate**: Errors per hour/day
- **Response Time**: Average API response time
- **Active Users**: Currently logged-in users

---

## Conclusion

This logging system provides comprehensive monitoring, debugging, and audit capabilities for your ATM monitoring application. Key benefits include:

1. **Complete Audit Trail**: Track all user actions and system events
2. **Real-time Monitoring**: Detect and respond to issues immediately
3. **Security**: Identify and prevent security threats
4. **Performance**: Optimize system performance with buffering and caching
5. **Compliance**: Meet regulatory requirements for logging and auditing
6. **Scalability**: Handle high volumes of logs efficiently

Remember to:
- Regularly review and update log categories and levels
- Monitor log storage and implement rotation policies
- Test alert mechanisms regularly
- Train team members on log analysis
- Keep sensitive data out of logs
- Regularly backup archived logs
