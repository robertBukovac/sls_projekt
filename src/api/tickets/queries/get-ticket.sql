SELECT
  "id","stake","timestamp"
FROM
  sls_ticket 
WHERE
  "id" = $1;