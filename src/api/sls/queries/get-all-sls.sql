SELECT 
  "sl"."id",
  "sl"."timeDuration",
  "sl"."stakeLimit",
  "sl"."hotPercentage",
  "sl"."restrictionExpires",
  "sd"."id" AS "deviceId",
  "sd"."city"
FROM
  sls_sls sl
JOIN
  sls_device sd
ON
  "sl"."deviceId" = "sd"."id"
LIMIT 
  $1
OFFSET 
  $2
