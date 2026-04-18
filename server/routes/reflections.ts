import { Router, Request, Response } from 'express';
import { supabase } from '../supabase.js';

const router = Router();

// POST /api/reflections — save a new reflection
router.post('/', async (req: Request, res: Response) => {
  const { type, content } = req.body;

  if (!type || !content) {
    res.status(400).json({ error: 'type and content are required' });
    return;
  }

  if (type !== 'morning' && type !== 'evening') {
    res.status(400).json({ error: 'type must be "morning" or "evening"' });
    return;
  }

  const { data, error } = await supabase
    .from('reflections')
    .insert({ type, content })
    .select()
    .single();

  if (error) {
    console.error('Supabase insert error:', error);
    res.status(500).json({ error: error.message });
    return;
  }

  res.status(201).json(data);
});

// GET /api/reflections — list all reflections, newest first
router.get('/', async (_req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('reflections')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase select error:', error);
    res.status(500).json({ error: error.message });
    return;
  }

  res.json(data);
});

export default router;
