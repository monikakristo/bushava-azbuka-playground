<?php
require_once __DIR__ . '/databaseHandler.php';

$success = null;
$error   = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $gameName = trim($_POST['game_name'] ?? '');
    $gamePath = trim($_POST['game_path'] ?? '');
    $enabled  = isset($_POST['enabled']);

    if ($gameName === '' || $gamePath === '') {
        $error = 'Both Game Name and Game Path are required.';
    } else {
        try {
            $newId   = DatabaseHandler::createGame($gameName, $gamePath, $enabled);
            $success = "Game &ldquo;" . htmlspecialchars($gameName) . "&rdquo; created with ID #" . $newId . ".";
        } catch (PDOException $e) {
            $error = 'Database error: ' . htmlspecialchars($e->getMessage());
        }
    }
}

$activePage = 'dashboard';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Бушава — Dashboard</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>

<?php include __DIR__ . '/sidebar.php'; ?>

<main>
  <div class="topbar">
    <span class="topbar-title">Dashboard</span>
    <span class="topbar-badge">Live</span>
  </div>

  <div class="content">

    <?php if ($success): ?>
    <div class="alert alert-success">
      <div class="alert-dot"></div>
      <?= $success ?>
    </div>
    <?php endif; ?>

    <?php if ($error): ?>
    <div class="alert alert-error">
      <div class="alert-dot"></div>
      <?= htmlspecialchars($error) ?>
    </div>
    <?php endif; ?>

    <div class="section-header">
      <h2>Create a Game</h2>
      <p>Fill in the details below to register a new game to the platform.</p>
    </div>

    <div class="card">
      <form method="POST" action="">

        <div class="field">
          <label for="game_name">Game Name</label>
          <input
            type="text"
            id="game_name"
            name="game_name"
            placeholder="e.g. Shadow Realms"
            value="<?= htmlspecialchars($_POST['game_name'] ?? '') ?>"
            autocomplete="off"
            required
          />
          <span class="hint">The display name shown to players.</span>
        </div>

        <div class="field">
          <label for="game_path">Game Path</label>
          <input
            type="text"
            id="game_path"
            name="game_path"
            placeholder="e.g. /games/shadow-realms"
            value="<?= htmlspecialchars($_POST['game_path'] ?? '') ?>"
            autocomplete="off"
            required
          />
          <span class="hint">Filesystem or URL path to the game entry point.</span>
        </div>

        <label class="checkbox-row">
          <input type="checkbox" name="enabled" value="1" checked />
          <span class="checkbox-label">Enable game immediately after creation</span>
        </label>

        <div class="divider"></div>

        <div class="form-actions">
          <button type="submit" class="btn-primary">Create Game</button>
          <a href="index.php" class="btn-ghost">Clear</a>
        </div>

      </form>
    </div>

  </div>
</main>

</body>
</html>
