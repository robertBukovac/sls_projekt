UPDATE
  sls_sls sl
SET 
  "timeDuration" = $2,
  "stakeLimit" = $3,
  "hotPercentage" = $4,
  "restrictionExpires" = $5
WHERE
  "id" = $1
RETURNING 
  "sl"."id",
  "sl"."timeDuration",
  "sl"."stakeLimit",
  "sl"."hotPercentage",
  "sl"."restrictionExpires";