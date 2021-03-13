const { execSync } = require('child_process');

/*db.createUser(
	{
	  user: "cris",
	  pwd: "cris",
	  roles: [
		 { role: "root", db: "admin" }
	  ]
	}
  );*/
  

const backUpdatabase = () => {
	execSync('mongodump --forceTableScan --username="cris" --password="cris" --host="172.17.0.2" --port=27017', (err, stdout, stderr) => {
		if (err) {
			console.error(`exec error: ${err}`);
			return;
		}
	});
};

const restoreDB = () => {
	execSync('mongorestore -h 172.17.0.2:27017 -d namesAux ../middleware/dump/names', (err, stdout, stderr) => {
		if (err) {
			console.error(`exec error: ${err}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
	});
};

module.exports = {
	backUpdatabase,
	restoreDB,
};
