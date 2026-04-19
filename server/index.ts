import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
// 允许跨域请求
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// 1. 保存接口：把 deviceId 也存进数据库
app.post('/api/reflections', async (req, res) => {
  // 从前端传来的 body 中获取 deviceId
  const { type, content, deviceId } = req.body; 

  const { data, error } = await supabase
    .from('reflections')
    .insert([{ 
      type, 
      content, 
      device_id: deviceId // 存入你在 Supabase 新加的这一列
    }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

// 2. 读取接口：根据 deviceId 过滤数据
app.get('/api/reflections', async (req, res) => {
  // 从网址参数 (?deviceId=xxx) 中获取 ID
  const { deviceId } = req.query; 

  if (!deviceId) {
    return res.status(400).json({ error: 'deviceId is required' });
  }

  const { data, error } = await supabase
    .from('reflections')
    .select('*')
    .eq('device_id', deviceId) // 核心：只查询 device_id 等于当前设备 ID 的数据
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// 健康检查接口
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
