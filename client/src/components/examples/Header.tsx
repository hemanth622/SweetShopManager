import Header from '../Header';
import { useState } from 'react';

export default function HeaderExample() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <Header
      user={{
        username: "johndoe",
        isAdmin: true
      }}
      cartItemCount={3}
      onSearch={(query) => console.log('Search:', query)}
      onCartClick={() => console.log('Cart clicked')}
      onProfileClick={() => console.log('Profile clicked')}
      onLogout={() => console.log('Logout clicked')}
      onToggleTheme={() => setIsDarkMode(!isDarkMode)}
      isDarkMode={isDarkMode}
    />
  );
}