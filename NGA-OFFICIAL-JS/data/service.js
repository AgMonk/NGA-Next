self.__VERSION = '1.0.0'

self.addEventListener('install', function(e) {
	console.log('serviceWorker install v'+__VERSION)
	return self.skipWaiting();
	});

self.addEventListener('activate', function(e) {
	console.log('serviceWorker active v'+__VERSION)
	});

self.__ACTION_HANDLER = []

self.addEventListener('message', function(e){
console.log("serviceWorker revice",e)
if(e.data && e.data.action){
	if(e.data.action=='eval'){
		if(e.data.eval){
			eval(e.data.eval)
			}
		else if(e.data.req)
			fetch(new Request(e.data.req)).then(
				function(response) {
					if(response.ok){
						response.text().then(function(txt){eval(txt)})
						}
					}
				);
		}
	else if(e.data.action=='ping'){
		console.log("serviceWorker revice ping")
		e.source.postMessage("pong");
		}
	else if(self.__ACTION_HANDLER[e.data.action]){
		self.__ACTION_HANDLER[e.data.action](e)
		}
	}

})//
