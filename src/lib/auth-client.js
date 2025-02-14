import { useRouter } from 'next/router';

export const logout = async () => {
  try {
    const response = await fetch('/api/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // Hapus token dari localStorage jika Anda menyimpannya di sana
      localStorage.removeItem('token');
      
      // Redirect ke halaman login atau home
      window.location.href = '/login';
    } else {
      console.error('Logout failed');
    }
  } catch (error) {
    console.error('Logout error:', error);
  }
};