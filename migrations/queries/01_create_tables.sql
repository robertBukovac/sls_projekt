DROP TABLE IF EXISTS sls_device CASCADE;
CREATE TABLE sls_device (
  "id" UUID NOT NULL DEFAULT '2d2e658f-3a88-4f0d-bfb2-d2ea092a1bbe',
  "city" VARCHAR DEFAULT 'unknown',
  PRIMARY KEY("id")
);

DROP TABLE IF EXISTS sls_sls CASCADE;
CREATE TABLE sls_sls (
  "id" INT GENERATED ALWAYS AS IDENTITY,
  "deviceId" UUID NOT NULL,
  "timeDuration" INT NOT NULL DEFAULT 10,
  "stakeLimit" INT NOT NULL DEFAULT 1000,
  "hotPercentage" INT NOT NULL DEFAULT 80,
  "restrictionExpires" INT NOT NULL DEFAULT 5,
  PRIMARY KEY("id"),
  CONSTRAINT fk_sls_device 
    FOREIGN KEY("deviceId")
      REFERENCES sls_device("id")
      ON DELETE CASCADE
);

DROP TABLE IF EXISTS sls_ticket CASCADE;
CREATE TABLE sls_ticket (
  "id" UUID NOT NULL DEFAULT 'd4fd00bc-df60-42f9-b1e4-96aaf67b5b55',
  "deviceId" UUID NOT NULL,
  "stake" INT NOT NULL,
  "timestamp" TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY("id"),
    CONSTRAINT fk_ticket_device
    FOREIGN KEY("deviceId")
      REFERENCES sls_device("id")
      ON DELETE CASCADE
);

DROP TABLE IF EXISTS sls_blocked_device CASCADE;
CREATE TABLE sls_blocked_device (
  "id" INT GENERATED ALWAYS AS IDENTITY,
  "deviceId" UUID NOT NULL,
  "blockedUntil" TIMESTAMP NOT NULL,
  "perminentRestriction" BOOLEAN DEFAULT false,
  "expired" BOOLEAN DEFAULT false,
  PRIMARY KEY("id")
);

