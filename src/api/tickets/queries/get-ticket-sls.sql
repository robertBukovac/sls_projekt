SELECT 
  "sls_sls"."timeDuration",
  "sls_sls"."stakeLimit",
  "sls_sls"."hotPercentage",
  "sls_sls"."restrictionExpires",
  "sls_ticket"."stake",
  "sls_ticket"."timestamp"
FROM
  sls_sls,sls_ticket 
WHERE
  "sls_sls"."deviceId" = $1
AND 
  "sls_ticket"."deviceId" = $1
AND "sls_ticket"."timestamp" BETWEEN NOW() - (sls_sls."timeDuration" || ' minutes')::INTERVAL AND NOW();

