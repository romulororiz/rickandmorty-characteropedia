const path = require('path');
const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const port = process.env.PORT || 5000;
require('dotenv').config();
const app = express();

app.use(cors());

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: process.env.NODE_ENV === 'development',
	})
);

// Serve frontend
// Set build folder as static
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
