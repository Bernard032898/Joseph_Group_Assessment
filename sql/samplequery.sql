-- 1. All open tickets

CREATE VIEW All_Open_Tickets AS SELECT * FROM Tickets WHERE status = 'Open';




-- 2. Count by priority
CREATE VIEW Count_By_Priority AS SELECT priority, COUNT(*) FROM Tickets GROUP BY priority;

-- 3. 5 most recent tickets
CREATE VIEW Most_Recent_Tickets AS SELECT * FROM Tickets ORDER BY created_at DESC LIMIT 5;