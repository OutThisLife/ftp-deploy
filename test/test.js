const
	path = require('path'),
	FtpSvr = require('ftp-srv'),
	FtpDeploy = require('../ftp-deploy.js'),

	server = new FtpSvr('ftp://127.0.0.1:21', {
		anonymous: 'simon',
	}),

	ftpDeploy = new FtpDeploy(),
	config = {
		username: 'simon',
		password: 'simon',
		host: '127.0.0.1',
		port: 21,
		localRoot: path.join(__dirname, 'local'),
		remoteRoot: path.join(__dirname, 'remote'),
		exclude: ['.git', '.idea', 'tmp/*'],
	}

// -----------------------------------------------

server.on('login', ({ username }, resolve, reject) => {
	if (username === 'simon') {
		resolve({
			root: path.join(__dirname, 'remote'),
		})
	} else reject('Invalid login')
})

server.listen()

// -----------------------------------------------

ftpDeploy.on('uploaded', data => {
	console.log('uploaded:')
	console.log(data)
})

ftpDeploy.on('uploading', data => {
	console.log('uploading')
	console.log(data)
})

ftpDeploy.deploy(config, err => {
	if (err) {
		console.log(err)
	} else {
		console.log('finished')
	}
})