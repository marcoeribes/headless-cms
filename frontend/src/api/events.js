const API_BASE = 'http://localhost:3000/api';

export async function getClasses() {
    const res = await fetch(`${API_BASE}/getEvents`);
    if (!res.ok) throw new Error('Failed to fetch classes');
    const data = await res.json();
    return data.data;
}

export async function postRegistration(registration) {
    const res = await fetch(`${API_BASE}/postRegistration`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registration),
    });

    if (!res.ok) throw new Error('Failed to register');
    return res.json();
}
