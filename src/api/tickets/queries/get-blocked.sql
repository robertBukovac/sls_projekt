SELECT 
    *
FROM
  sls_blocked_device
WHERE
  "deviceId" = $1
AND 
  "expired" = false;

