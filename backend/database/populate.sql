-- Creating default platforms

INSERT INTO platform_master (platform_master_id, platform_master_name, platform_master_icon) VALUES (1, 'PC', '');

INSERT INTO platform_master (platform_master_id, platform_master_name, platform_master_icon) VALUES (2, 'PS4', '');

INSERT INTO platform_master (platform_master_id, platform_master_name, platform_master_icon) VALUES (3, 'PS5', '');

INSERT INTO platform_master (platform_master_id, platform_master_name, platform_master_icon) VALUES (4, 'Xbox', '');

-- Creating default games

INSERT INTO game_master VALUES (1, 'Paladins', '', 'fps', true);

INSERT INTO game_master VALUES (2, 'Rocket League', '', 'racing', true);

INSERT INTO game_master_platform_mapping (platform_id, game_master_id) VALUES (1, 1);
INSERT INTO game_master_platform_mapping (platform_id, game_master_id) VALUES (2, 1);
INSERT INTO game_master_platform_mapping (platform_id, game_master_id) VALUES (1, 2);
INSERT INTO game_master_platform_mapping (platform_id, game_master_id) VALUES (2, 2);
INSERT INTO game_master_platform_mapping (platform_id, game_master_id) VALUES (3, 2);
INSERT INTO game_master_platform_mapping (platform_id, game_master_id) VALUES (4, 2);

-- Creating skills

INSERT INTO skill_master VALUES (1, 'Casual');
INSERT INTO skill_master VALUES (2, 'Intermediate');
INSERT INTO skill_master VALUES (3, 'Advanced');
INSERT INTO skill_master VALUES (4, 'Pro');