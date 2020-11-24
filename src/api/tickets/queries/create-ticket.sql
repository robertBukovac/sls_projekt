INSERT INTO 
  sls_ticket (
    "id",
    "deviceId",
    "stake",
    "timestamp"
  ) 
VALUES 
  ($1, $2, $3, NOW())
RETURNING *;
