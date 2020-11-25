INSERT INTO 
  sls_blocked_device (
    "id",
    "blockedUntil",
    "perminentRestriction"
  ) 
VALUES 
  ($1, $2, $3)
RETURNING *;