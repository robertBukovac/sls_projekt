INSERT INTO sls_device (
  "id",
  "city"
) VALUES 
  ('3c144f2f-bc35-4ecd-8fa3-b2a9f012c284','Travnik'), 
  ('2ceac662-9d52-4ddd-bf05-7ec04818615e','Mostar'),
  ('0005746e-5b75-4190-9f5b-15e715c0022e','Mostar'),
  ('0ca534f5-1b18-4fb9-8eba-2735ae0192e9','Sarajevo'),
  ('f76662f8-6565-4c43-9a35-e0395d53b6b1','Neum'),
  ('4d6149dd-f114-42f4-a875-c68f2cc9e41a','Bijeljina');

  
INSERT INTO sls_sls (
  "deviceId",
  "timeDuration",
  "stakeLimit",
  "hotPercentage",
  "restrictionExpires"
) VALUES 
  ('3c144f2f-bc35-4ecd-8fa3-b2a9f012c284',20, 1000, 75, 15), 
  ('2ceac662-9d52-4ddd-bf05-7ec04818615e',15, 950, 80, 10),
  ('0005746e-5b75-4190-9f5b-15e715c0022e',20, 1000, 80, 14);


INSERT INTO sls_ticket (
  "deviceId",
  "stake",
  "timestamp"
) VALUES 
  ('2ceac662-9d52-4ddd-bf05-7ec04818615e',50, NOW());

