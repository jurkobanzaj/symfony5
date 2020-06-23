<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200623154655 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'sqlite', 'Migration can only be executed safely on \'sqlite\'.');

        $this->addSql('DROP INDEX UNIQ_5A0EB6A05E237E06');
        $this->addSql('CREATE TEMPORARY TABLE __temp__todo AS SELECT id, name, description FROM todo');
        $this->addSql('DROP TABLE todo');
        $this->addSql('CREATE TABLE todo (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, description VARCHAR(500) NOT NULL COLLATE BINARY, task VARCHAR(50) NOT NULL)');
        $this->addSql('INSERT INTO todo (id, task, description) SELECT id, name, description FROM __temp__todo');
        $this->addSql('DROP TABLE __temp__todo');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_5A0EB6A0527EDB25 ON todo (task)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'sqlite', 'Migration can only be executed safely on \'sqlite\'.');

        $this->addSql('DROP INDEX UNIQ_5A0EB6A0527EDB25');
        $this->addSql('CREATE TEMPORARY TABLE __temp__todo AS SELECT id, task, description FROM todo');
        $this->addSql('DROP TABLE todo');
        $this->addSql('CREATE TABLE todo (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, description VARCHAR(500) NOT NULL, name VARCHAR(50) NOT NULL COLLATE BINARY)');
        $this->addSql('INSERT INTO todo (id, name, description) SELECT id, task, description FROM __temp__todo');
        $this->addSql('DROP TABLE __temp__todo');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_5A0EB6A05E237E06 ON todo (name)');
    }
}
