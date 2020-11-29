UPDATE sls_blocked_device
SET expired=true
WHERE "deviceId"=$1;

