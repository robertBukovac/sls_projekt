INSERT INTO 
  sls_blocked_device (
    "deviceId",
    "blockedUntil",
    "perminentRestriction"
  ) 
VALUES 
  ($1, $2, $3)
RETURNING *;