-- 1. All open tickets
SELECT * FROM Tickets WHERE status = 'Open';

-- 2. Count by priority
SELECT priority, COUNT(*) 
FROM Tickets 
GROUP BY priority;

-- 3. 5 most recent tickets
SELECT * 
FROM Tickets 
ORDER BY created_at DESC 
LIMIT 5;