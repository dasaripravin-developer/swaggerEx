import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.json([{ id: 1, task: 'Complete project' }]);
});

export default router;
