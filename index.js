const { app, BrowserWindow, screen, Menu } = require('electron');
// require('electron-reload')(__dirname);


const createWindow = () => {
	const { width, height } = screen.getPrimaryDisplay().workAreaSize;
	Menu.setApplicationMenu(false);
	window = new BrowserWindow({
		width: width / 1.5,
		height: height / 1.5,
		title: "Highlights",
		frame: true,
		resizable: true,
		webPreferences: {
			webSecurity: true,
			nodeIntegration: true,
			contextIsolation: false,
			// enableRemoteModule: true,
			// allowRunningInsecureContent: true
		}
	});

	// remove 'x-frame-options' header to allow embedding external pages into an 'iframe'
	window.webContents.session.webRequest.onHeadersReceived({urls: ['*://*/*']},(details, callback) => {
			Object.keys(details.responseHeaders)
				.filter(x => ['x-frame-options', 'content-security-policy'].indexOf(x.toLowerCase()) >= 0 )
				.map(x => delete details.responseHeaders[x])

			callback({
				cancel: false,
				responseHeaders: details.responseHeaders,
			});
		},
	)

	window.loadFile('public/index.html');
};

let window = null;
app.commandLine.appendSwitch('disable-site-isolation-trials') //without this frame don't load content
app.whenReady().then(createWindow)
app.on('window-all-closed', () => app.quit());
