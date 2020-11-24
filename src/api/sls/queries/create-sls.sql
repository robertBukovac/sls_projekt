INSERT INTO 
  sls_sls (
    "deviceId",
    "timeDuration",
    "stakeLimit",
    "hotPercentage",
    "restrictionExpires"
  ) 
VALUES 
  ($1, $2, $3 , $4 , $5)
RETURNING *;
