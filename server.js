// This is a simplified server implementation for the Discord clone
// In a real application, you would use a proper backend framework like Express.js
// and implement WebSockets for real-time communication

// Mock database
const db = {
    users: [
        {
            id: 'user123',
            username: 'User123',
            tag: '1234',
            email: 'user123@example.com',
            password: 'hashed_password', // In a real app, this would be properly hashed
            avatar: 'https://i.pravatar.cc/100?img=3'
        },
        {
            id: 'johndoe',
            username: 'JohnDoe',
            tag: '5678',
            email: 'john@example.com',
            password: 'hashed_password',
            avatar: 'https://i.pravatar.cc/100?img=5'
        }
    ],
    servers: [
        {
            id: 'server1',
            name: 'Gaming Community',
            owner: 'user123',
            channels: ['channel1', 'channel2', 'channel3']
        },
        {
            id: 'server2',
            name: 'JavaScript Developers',
            owner: 'johndoe',
            channels: ['channel4', 'channel5']
        }
    ],
    channels: [
        {
            id: 'channel1',
            name: 'general',
            server: 'server1',
            type: 'text'
        },
        {
            id: 'channel2',
            name: 'announcements',
            server: 'server1',
            type: 'text'
        },
        {
            id: 'channel3',
            name: 'off-topic',
            server: 'server1',
            type: 'text'
        },
        {
            id: 'channel4',
            name: 'general',
            server: 'server2',
            type: 'text'
        },
        {
            id: 'channel5',
            name: 'help',
            server: 'server2',
            type: 'text'
        }
    ],
    messages: [
        {
            id: 'msg1',
            channel: 'channel1',
            author: 'user123',
            content: 'Hey everyone! Welcome to our new Discord server!',
            timestamp: '2023-06-15T12:30:00Z'
        },
        {
            id: 'msg2',
            channel: 'channel1',
            author: 'johndoe',
            content: 'Thanks for setting this up! Excited to chat with everyone here.',
            timestamp: '2023-06-15T12:32:00Z'
        }
    ]
};

// API endpoints (in a real app, these would be proper HTTP endpoints)

// User authentication
function login(email, password) {
    const user = db.users.find(u => u.email === email);
    
    if (!user) {
        return { success: false, error: 'User not found' };
    }
    
    // In a real app, you would properly compare hashed passwords
    if (user.password !== password) {
        return { success: false, error: 'Invalid password' };
    }
    
    return {
        success: true,
        user: {
            id: user.id,
            username: user.username,
            tag: user.tag,
            email: user.email,
            avatar: user.avatar
        }
    };
}

function register(username, email, password) {
    // Check if email already exists
    if (db.users.some(u => u.email === email)) {
        return { success: false, error: 'Email already in use' };
    }
    
    // Generate a random tag (4 digits)
    const tag = Math.floor(1000 + Math.random() * 9000).toString();
    
    // Create new user
    const newUser = {
        id: 'user' + Date.now(),
        username,
        tag,
        email,
        password, // In a real app, this would be properly hashed
        avatar: `https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 70)}`
    };
    
    // Add to database
    db.users.push(newUser);
    
    return {
        success: true,
        user: {
            id: newUser.id,
            username: newUser.username,
            tag: newUser.tag,
            email: newUser.email,
            avatar: newUser.avatar
        }
    };
}

// Server operations
function getServers(userId) {
    // In a real app, you would filter servers based on user membership
    return db.servers;
}

function createServer(name, ownerId) {
    const newServer = {
        id: 'server' + Date.now(),
        name,
        owner: ownerId,
        channels: []
    };
    
    // Create default general channel
    const generalChannel = {
        id: 'channel' + Date.now(),
        name: 'general',
        server: newServer.id,
        type: 'text'
    };
    
    newServer.channels.push(generalChannel.id);
    
    // Add to database
    db.servers.push(newServer);
    db.channels.push(generalChannel);
    
    return newServer;
}

// Channel operations
function getChannels(serverId) {
    return db.channels.filter(c => c.server === serverId);
}

function createChannel(name, serverId, type = 'text') {
    const newChannel = {
        id: 'channel' + Date.now(),
        name,
        server: serverId,
        type
    };
    
    // Add to database
    db.channels.push(newChannel);
    
    // Update server's channels list
    const server = db.servers.find(s => s.id === serverId);
    if (server) {
        server.channels.push(newChannel.id);
    }
    
    return newChannel;
}

// Message operations
function getMessages(channelId) {
    return db.messages.filter(m => m.channel === channelId);
}

function sendMessage(channelId, authorId, content) {
    const newMessage = {
        id: 'msg' + Date.now(),
        channel: channelId,
        author: authorId,
        content,
        timestamp: new Date().toISOString()
    };
    
    // Add to database
    db.messages.push(newMessage);
    
    return newMessage;
}

// WebSocket simulation (in a real app, this would be a proper WebSocket implementation)
class WebSocketServer {
    constructor() {
        this.clients = [];
    }
    
    addClient(client) {
        this.clients.push(client);
    }
    
    removeClient(client) {
        const index = this.clients.indexOf(client);
        if (index !== -1) {
            this.clients.splice(index, 1);
        }
    }
    
    broadcast(event, data) {
        this.clients.forEach(client => {
            client.send(JSON.stringify({ event, data }));
        });
    }
}

// Create WebSocket server instance
const wss = new WebSocketServer();

// Export API (in a real app, these would be exposed as HTTP endpoints)
module.exports = {
    auth: {
        login,
        register
    },
    servers: {
        getServers,
        createServer
    },
    channels: {
        getChannels,
        createChannel
    },
    messages: {
        getMessages,
        sendMessage
    },
    wss
};

// Note: This server.js file is for demonstration purposes only.
// In a real application, you would use a proper backend framework like Express.js
// and implement WebSockets for real-time communication.