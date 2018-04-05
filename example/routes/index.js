const { Router } = require('express');

const router = Router();

router.get('/api', (request, response) => {
	response.send('server: up & running');
});

router.get('/api/:greetings', (request, response) => {
	response.json({ message: `${request.params.greetings}! welcome to your api!` });
});

module.exports = router;
