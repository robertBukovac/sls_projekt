INSERT INTO sls_device (
  "id",
  "city"
) VALUES 
  ('3c144f2f-bc35-4ecd-8fa3-b2a9f012c284','travnik'), 
  ('2ceac662-9d52-4ddd-bf05-7ec04818615e','mostar');

INSERT INTO sls_sls (
  "deviceId",
  "timeDuration",
  "stakeLimit",
  "hotPercentage",
  "restrictionExpires"
) VALUES 
  ('3c144f2f-bc35-4ecd-8fa3-b2a9f012c284',30, 100, 75, 15), 
  ('2ceac662-9d52-4ddd-bf05-7ec04818615e',20, 150, 80, 15);

INSERT INTO sls_ticket (
  "deviceId",
  "stake",
  "timestamp"
) VALUES 
  ('2ceac662-9d52-4ddd-bf05-7ec04818615e',200, NOW());