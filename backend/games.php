<?php
require_once __DIR__ . '/databaseHandler.php';

$success = null;
$error   = null;

// ── Handle DELETE POST ────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete_id'])) {
    $deleteId = (int) $_POST['delete_id'];

    if ($deleteId <= 0) {
        $error = 'Invalid game ID.';
    } else {
        try {
            $game = DatabaseHandler::getGameById($deleteId);
            if ($game) {
                DatabaseHandler::deleteGame($deleteId);
                $success = "Game &ldquo;" . htmlspecialchars($game['game_name']) . "&rdquo; has been removed.";
            } else {
                $error = 'Game not found.';
            }
        } catch (PDOException $e) {
            $error = 'Database error: ' . htmlspecialchars($e->getMessage());
        }
    }
}

// ── Fetch all games ───────────────────────────────────────────────
$games = [];
try {
    $games = DatabaseHandler::getAllGames();
} catch (PDOException $e) {
    $error = 'Could not load games: ' . htmlspecialchars($e->getMessage());
}

$activePage = 'games';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Бушава — Games</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>

<?php include __DIR__ . '/sidebar.php'; ?>

<main>
  <div class="topbar">
    <span class="topbar-title">Games</span>
    <span class="topbar-badge"><?= count($games) ?> total</span>
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
      <?= $error ?>
    </div>
    <?php endif; ?>

    <div class="games-section">
      <div class="games-section-header">
        <h2>All Games</h2>
        <span class="count-pill"><?= count($games) ?></span>
      </div>

      <div class="table-wrap">
        <?php if (empty($games)): ?>
          <div class="empty-state">
            <span>No games yet</span>
            Go to <a href="index.php" style="color:var(--accent);text-decoration:none;">Dashboard</a> to create your first game.
          </div>
        <?php else: ?>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Path</th>
              <th>Status</th>
              <th style="text-align:right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($games as $game): ?>
            <tr>
              <td class="td-id"><?= (int) $game['id'] ?></td>
              <td><?= htmlspecialchars($game['game_name']) ?></td>
              <td class="td-path"><?= htmlspecialchars($game['game_path']) ?></td>
              <td>
                <?php if ($game['enabled']): ?>
                  <span class="badge badge-on">Enabled</span>
                <?php else: ?>
                  <span class="badge badge-off">Disabled</span>
                <?php endif; ?>
              </td>
              <td class="td-actions">
                <button
                  class="btn-danger"
                  onclick="openConfirm(<?= (int) $game['id'] ?>, '<?= addslashes(htmlspecialchars($game['game_name'])) ?>')"
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8">
                    <path d="M2 4h12M5 4V2.5A.5.5 0 0 1 5.5 2h5a.5.5 0 0 1 .5.5V4M6 7v5M10 7v5M3 4l1 9.5A.5.5 0 0 0 4.5 14h7a.5.5 0 0 0 .5-.5L13 4" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Remove
                </button>
              </td>
            </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
        <?php endif; ?>
      </div>
    </div>

  </div>
</main>

<!-- ── CONFIRM MODAL ── -->
<div class="modal-backdrop" id="confirmBackdrop">
  <div class="modal">
    <div class="modal-icon">
      <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8">
        <path d="M2 4h12M5 4V2.5A.5.5 0 0 1 5.5 2h5a.5.5 0 0 1 .5.5V4M6 7v5M10 7v5M3 4l1 9.5A.5.5 0 0 0 4.5 14h7a.5.5 0 0 0 .5-.5L13 4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <h3>Remove Game</h3>
    <p>Are you sure you want to remove <strong id="confirmGameName"></strong>? This action cannot be undone.</p>
    <div class="modal-actions">
      <button class="btn-ghost" onclick="closeConfirm()">Cancel</button>
      <form method="POST" action="" id="deleteForm" style="display:inline">
        <input type="hidden" name="delete_id" id="deleteIdInput" value="" />
        <button type="submit" class="btn-confirm-delete">Yes, Remove</button>
      </form>
    </div>
  </div>
</div>

<script>
  function openConfirm(id, name) {
    document.getElementById('confirmGameName').textContent = name;
    document.getElementById('deleteIdInput').value = id;
    document.getElementById('confirmBackdrop').classList.add('open');
  }

  function closeConfirm() {
    document.getElementById('confirmBackdrop').classList.remove('open');
  }

  // Close modal when clicking the backdrop
  document.getElementById('confirmBackdrop').addEventListener('click', function(e) {
    if (e.target === this) closeConfirm();
  });

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeConfirm();
  });
</script>

</body>
</html>
