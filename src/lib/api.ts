import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const API_BASE = `${API_URL}/api`;

// --- 新增：给每个浏览器发一个唯一的“身份证号” ---
const getDeviceId = () => {
  let id = localStorage.getItem('user_device_id');
  if (!id) {
    // 生成一个随机字符串作为 ID
    id = Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem('user_device_id', id);
  }
  return id;
};

export const saveReflection = async (type: 'morning' | 'evening', content: string) => {
  const res = await fetch(`${API_BASE}/reflections`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      type, 
      content, 
      deviceId: getDeviceId() // 保存时带上 ID
    }),
  });
  if (!res.ok) throw new Error('Failed to save');
  return res.json();
};

export const getReflections = async () => {
  // 读取时把 ID 放在网址后面传给后端
  const res = await fetch(`${API_BASE}/reflections?deviceId=${getDeviceId()}`);
  if (!res.ok) throw new Error('Failed to load');
  return res.json();
};
