-- Tavle Notification
CREATE TABLE Notifications (
                               id VARCHAR(255) PRIMARY KEY,
                               user_id INT,
                               message VARCHAR(255),
                               is_read BOOLEAN,
                               created_at DATE,
                               FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- Table Users
CREATE TABLE Users (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       name VARCHAR(255),
                       email VARCHAR(255),
                       password VARCHAR(255),
                       profile_picture VARCHAR(255),
                       created_at DATE
);

-- Table Board_Users
CREATE TABLE Board_Users (
                             board_id VARCHAR(255),
                             user_id INT,
                             role VARCHAR(50),
                             added_at DATE,
                             PRIMARY KEY (board_id, user_id),
                             FOREIGN KEY (board_id) REFERENCES Boards(id),
                             FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- Table Boards
CREATE TABLE Boards (
                        id VARCHAR(255) PRIMARY KEY,
                        name VARCHAR(255),
                        description VARCHAR(255),
                        viewing_rights VARCHAR(50),
                        created_by INT,
                        created_at DATE,
                        updated_at DATE,
                        FOREIGN KEY (created_by) REFERENCES Users(id)
);

-- Table Activity_Log
CREATE TABLE Activity_Log (
                              id VARCHAR(255) PRIMARY KEY,
                              description VARCHAR(255),
                              user_id INT,
                              board_id VARCHAR(255),
                              card_id VARCHAR(255),
                              created_at DATE,
                              FOREIGN KEY (user_id) REFERENCES Users(id),
                              FOREIGN KEY (board_id) REFERENCES Boards(id),
                              FOREIGN KEY (card_id) REFERENCES Cards(id)
);

-- Table Lists
CREATE TABLE Lists (
                       id VARCHAR(255) PRIMARY KEY,
                       name VARCHAR(255),
                       position INT,
                       board_id VARCHAR(255),
                       created_at DATE,
                       updated_at DATE,
                       FOREIGN KEY (board_id) REFERENCES Boards(id)
);

-- Table Cards
CREATE TABLE Cards (
                       id VARCHAR(255) PRIMARY KEY,
                       title VARCHAR(255),
                       description TEXT,
                       position INT,
                       due_date DATE,
                       list_id VARCHAR(255),
                       created_at DATE,
                       updated_at DATE,
                       FOREIGN KEY (list_id) REFERENCES Lists(id)
);

-- Table Card_Assignees
CREATE TABLE Card_Assignees (
                                card_id VARCHAR(255),
                                user_id INT,
                                assigned_at DATE,
                                PRIMARY KEY (card_id, user_id),
                                FOREIGN KEY (card_id) REFERENCES Cards(id),
                                FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- Table Comments
CREATE TABLE Comments (
                          id VARCHAR(255) PRIMARY KEY,
                          content JSON,
                          user_id INT,
                          card_id VARCHAR(255),
                          created_at DATE,
                          FOREIGN KEY (user_id) REFERENCES Users(id),
                          FOREIGN KEY (card_id) REFERENCES Cards(id)
);

-- Table Labels
CREATE TABLE Labels (
                        id VARCHAR(255) PRIMARY KEY,
                        name VARCHAR(255),
                        color VARCHAR(50),
                        board_id VARCHAR(255),
                        FOREIGN KEY (board_id) REFERENCES Boards(id)
);

-- Table Card_Labels
CREATE TABLE Card_Labels (
                             card_id VARCHAR(255),
                             label_id VARCHAR(255),
                             PRIMARY KEY (card_id, label_id),
                             FOREIGN KEY (card_id) REFERENCES Cards(id),
                             FOREIGN KEY (label_id) REFERENCES Labels(id)
);

-- Table Checklists
CREATE TABLE Checklists (
                            id VARCHAR(255) PRIMARY KEY,
                            name VARCHAR(255),
                            card_id VARCHAR(255),
                            created_at DATE,
                            FOREIGN KEY (card_id) REFERENCES Cards(id)
);

-- Table Checklist_Items
CREATE TABLE Checklist_Items (
                                 id VARCHAR(255) PRIMARY KEY,
                                 content JSON,
                                 is_completed BOOLEAN,
                                 checklist_id VARCHAR(255),
                                 FOREIGN KEY (checklist_id) REFERENCES Checklists(id)
);

-- Table Files_Card
CREATE TABLE Files_Card (
                            id VARCHAR(255) PRIMARY KEY,
                            file LONGBLOB,
                            name VARCHAR(255),
                            uploaded_at DATE,
                            card_id VARCHAR(255),
                            FOREIGN KEY (card_id) REFERENCES Cards(id)
);