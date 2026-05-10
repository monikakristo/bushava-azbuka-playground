<?php

class DatabaseHandler {
    private static ?PDO $pdo = null;

    // ── Update these to match your environment ──
    private const DB_HOST = '127.0.0.1';
    private const DB_PORT = '3306';
    private const DB_NAME = 'bushava';
    private const DB_USER = 'root';
    private const DB_PASS = '';
    private const DB_CHAR = 'utf8mb4';

    public static function getConnection(): PDO {
        if (self::$pdo === null) {
            $dsn = sprintf(
                'mysql:host=%s;port=%s;dbname=%s;charset=%s',
                self::DB_HOST, self::DB_PORT, self::DB_NAME, self::DB_CHAR
            );
            self::$pdo = new PDO($dsn, self::DB_USER, self::DB_PASS, [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ]);
        }
        return self::$pdo;
    }

    // ── GAME ─────────────────────────────────────────────────────────

    public static function createGame(string $gameName, string $gamePath, bool $enabled = true): int {
        $pdo  = self::getConnection();
        $stmt = $pdo->prepare(
            'INSERT INTO game (game_name, game_path, enabled) VALUES (:game_name, :game_path, :enabled)'
        );
        $stmt->execute([
            ':game_name' => $gameName,
            ':game_path' => $gamePath,
            ':enabled'   => (int) $enabled,
        ]);
        return (int) $pdo->lastInsertId();
    }

    public static function getAllGames(): array {
        $stmt = self::getConnection()->query('SELECT * FROM game ORDER BY id DESC');
        return $stmt->fetchAll();
    }

    public static function getGameById(int $id): array|false {
        $stmt = self::getConnection()->prepare('SELECT * FROM game WHERE id = :id');
        $stmt->execute([':id' => $id]);
        return $stmt->fetch();
    }

    public static function deleteGame(int $id): bool {
        $stmt = self::getConnection()->prepare('DELETE FROM game WHERE id = :id');
        return $stmt->execute([':id' => $id]);
    }

    public static function updateGame(int $id, string $gameName, string $gamePath, bool $enabled): bool {
        $stmt = self::getConnection()->prepare(
            'UPDATE game SET game_name = :game_name, game_path = :game_path, enabled = :enabled WHERE id = :id'
        );
        return $stmt->execute([
            ':game_name' => $gameName,
            ':game_path' => $gamePath,
            ':enabled'   => (int) $enabled,
            ':id'        => $id,
        ]);
    }

    // ── USER ─────────────────────────────────────────────────────────

    public static function getUserByUsername(string $username): array|false {
        $stmt = self::getConnection()->prepare('SELECT * FROM user WHERE username = :username');
        $stmt->execute([':username' => $username]);
        return $stmt->fetch();
    }

    public static function createUser(string $username, string $plainPassword): int {
        $pdo  = self::getConnection();
        $stmt = $pdo->prepare('INSERT INTO user (username, password) VALUES (:username, :password)');
        $stmt->execute([
            ':username' => $username,
            ':password' => password_hash($plainPassword, PASSWORD_BCRYPT),
        ]);
        return (int) $pdo->lastInsertId();
    }
}