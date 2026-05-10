<?php
// sidebar.php — included by every page
// $activePage should be set before including: 'dashboard' | 'games'
$activePage = $activePage ?? 'dashboard';
?>
<aside>
  <div class="logo">
    <div class="logo-text">Бушава</div>
    <div class="logo-sub">Admin Panel</div>
  </div>

  <nav class="nav">
    <div class="nav-label">Menu</div>

    <a class="nav-item <?= $activePage === 'dashboard' ? 'active' : '' ?>" href="index.php">
      <svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="1" y="1" width="6" height="6" rx="1.5"/>
        <rect x="9" y="1" width="6" height="6" rx="1.5"/>
        <rect x="1" y="9" width="6" height="6" rx="1.5"/>
        <rect x="9" y="9" width="6" height="6" rx="1.5"/>
      </svg>
      Dashboard
    </a>

    <a class="nav-item <?= $activePage === 'games' ? 'active' : '' ?>" href="games.php">
      <svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M2 5.5h12M2 5.5a1.5 1.5 0 0 0-1.5 1.5v5A1.5 1.5 0 0 0 2 13.5h12a1.5 1.5 0 0 0 1.5-1.5V7A1.5 1.5 0 0 0 14 5.5M2 5.5V4A1.5 1.5 0 0 1 3.5 2.5h9A1.5 1.5 0 0 1 14 4v1.5" stroke-linecap="round"/>
        <circle cx="6" cy="9.5" r="1"/>
        <circle cx="10" cy="9.5" r="1"/>
      </svg>
      Games
    </a>
  </nav>

  <div class="sidebar-bottom">
    <a class="nav-item" href="#">
      <svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="8" cy="5" r="3"/>
        <path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke-linecap="round"/>
      </svg>
      Account
    </a>
    <a class="nav-item danger" href="#">
      <svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" stroke-linecap="round"/>
        <path d="M11 11l3-3-3-3M14 8H6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Sign Out
    </a>
  </div>
</aside>
