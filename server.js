const express = require('express');
const app = express();
const port = 3002;

app.use(express.json());

const statusStore = {};  // In-memory store for now

app.post('/api/status', (req, res) => {
    const data = req.body;

    if (!data.hostname) {
        return res.status(400).json({ error: "Missing hostname" });
    }

    statusStore[data.hostname] = {
        ...data,
        lastSeen: new Date().toISOString()
    };

    console.log(`[${data.hostname}] Status updated`);
    res.status(200).json({ message: 'Status received' });
});

app.get('/api/status', (req, res) => {
    res.json(statusStore);
});

app.listen(port, () => {
    console.log(`✅ Server listening on http://0.0.0.0:${port}`);
});
