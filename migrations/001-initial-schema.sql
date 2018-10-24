-- Up

CREATE TABLE Actor (
    id INTEGER NOT NULL,
    login TEXT NOT NULL,
    avatar_url TEXT,
    CONSTRAINT Actor_PK PRIMARY KEY (id)
);

CREATE TABLE Repo (
    id INTEGER NOT NULL,
    name TEXT,
    url TEXT NOT NULL,
    CONSTRAINT Repo_PK PRIMARY KEY (id)
);

CREATE TABLE Event (
    id INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    actor_id INTEGER NOT NULL,
    repo_id INTEGER NOT NULL,
    created_day INTEGER NOT NULL,
    CONSTRAINT Event_PK PRIMARY KEY (id),
    CONSTRAINT Event_Repo_FK FOREIGN KEY (repo_id) REFERENCES Repo(id), 
    CONSTRAINT Event_Actor_FK FOREIGN KEY (actor_id) REFERENCES Actor(id)
);

-- Down

DROP TABLE Event;
DROP TABLE Repo;
DROP TABLE Actor;