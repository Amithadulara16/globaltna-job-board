const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getJobs = async (category?: string) => {
  const url = category ? `${API_URL}?category=${category}` : API_URL;
  const res = await fetch(url!, { cache: 'no-store' });
  return res.json();
};

//id update
export const getJobById = async (id: string) => {
  const res = await fetch(`${API_URL}/${id}`, { cache: 'no-store' });
  if (!res.ok) return null; 
  return res.json();
};

export const createJob = async (data: any) => {
  const res = await fetch(API_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateJobStatus = async (id: string, status: string) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  return res.json();
};

export const deleteJob = async (id: string) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};