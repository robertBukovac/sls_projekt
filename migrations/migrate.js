const fs = require('fs');
const minimist = require('minimist');

const loadQuery = require('../src/utils/load-query.js');
const psql = require('../src/config/db.js');

const listFiles = async () => {
	return new Promise(res => {
		fs.readdir(__dirname + '/queries', (err, files) => {
			if (err) throw err;
			res(files);
		});
	});
};

const executeQuery = async query => {
	return new Promise(res => {
		console.log(query)
		psql.query(query, err => {
			if (err) throw err;
			res(query);
		});
	});
};

const migrate = async () => {
	const args = minimist(process.argv.slice(2));
	const filePath = file => `${__dirname}/queries/${file}`;

	try {
		if (!args.f) {
			const files = await listFiles();
			for (const file of files) {
				await executeQuery(await loadQuery(filePath(file)));
				console.log(`Migration from file ${file} executed.`);
			}
		} else {
			await executeQuery(args.f);
		}
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

migrate();


/*
CREATE TABLE IF NOT EXISTS sls_device (
  "id" INT GENERATED ALWAYS AS IDENTITY,
  PRIMARY KEY("id")
);

CREATE TABLE IF NOT EXISTS sls_sls (
  "id" INT GENERATED ALWAYS AS IDENTITY,
  "deviceId" INT,
  "timeDuration" INT NOT NULL DEFAULT 10,
  "stakeLimit" INT NOT NULL DEFAULT 1000,
  "hotPercentage" INT NOT NULL DEFAULT 80,
  "restrictionExpires" INT NOT NULL DEFAULT 5,
  PRIMARY KEY("id"),

);

CREATE TABLE IF NOT EXISTS sls_ticket (
  "id" INT GENERATED ALWAYS AS IDENTITY,
  "stake" INT NOT NULL,
  "timestamp" TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY("id")
);
*/

/*
INSERT INTO sls_sls (
  "deviceId",
  "timeDuration",
  "stakeLimit",
  "hotPercentage",
  "restrictionExpires"
) VALUES 
  (1,2, 3, 4, 5), 
  (2,2, 3, 4, 5);

INSERT INTO sls_device (
  "slsId"
) VALUES 
  (1), 
  (2);

INSERT INTO sls_ticket (
  "stake",
  "timestamp"
) VALUES 
  (200, NOW());
  */

  /*

  CREATE TABLE IF NOT EXISTS sls_sls (
  "id" INT GENERATED ALWAYS AS IDENTITY,
  "device_uid" UUID,
  "timeDuration" INT NOT NULL DEFAULT 10,
  "stakeLimit" INT NOT NULL DEFAULT 1000,
  "hotPercentage" INT NOT NULL DEFAULT 80,
  "restrictionExpires" INT NOT NULL DEFAULT 5,
  PRIMARY KEY("id"),
  CONSTRAINT fk_sls_device
    FOREIGN KEY("device_uid")
      REFERENCES sls_device("device_uid")
      ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS sls_ticket (
  "id" UUID NOT NULL,
  "device_uid" UUID,
  "stake" INT NOT NULL,
  "timestamp" TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY("id")
    CONSTRAINT fk_ticket_device
    FOREIGN KEY("device_uid")
      REFERENCES sls_device("device_uid")
      ON DELETE CASCADE
);
*/

/*

INSERT INTO sls_sls (
  "device_uid",
  "timeDuration",
  "stakeLimit",
  "hotPercentage",
  "restrictionExpires"
) VALUES 
  ('99898b74-ad49-490d-b2bd-ea504b7866d2',2, 3, 4, 5), 
  ('e2776d25-1403-486c-82a1-e3cd0dc39e85',2, 3, 4, 5);


INSERT INTO sls_ticket (
  "device_uid",
  "stake",
  "timestamp"
) VALUES 
  ('99898b74-ad49-490d-b2bd-ea504b7866d2',200, NOW());
  */