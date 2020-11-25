SELECT
  "id","stake","timestamp"
FROM
  sls_ticket 
WHERE
  "deviceId" = $1
AND "sls_ticket"."timestamp" BETWEEN NOW() - ($2 || ' minutes')::INTERVAL AND NOW();
