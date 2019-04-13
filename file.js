// 複製檔案的Javascript (NodeJS)程式碼

var originalPath = '/logs';
var finalPath = '/TEST';
var fs = require('fs'); // 引入檔案系統模組

// 1. 先取得資料夾下檔案目錄，再將檔名存入自己宣告的陣列
function getList(path, callback) {
	fs.readdir(path, function (err,files) {
		var arr = []; 
		if(err){
		  console.log(err);
		 }
		 console.log(files);
		 arr = files;
		 callback(arr);
	});
};

getList(originalPath, function(list){
// 2. 將檔案複製到指定資料夾
	console.log("file-name had been saved in array: "+list);
	list.forEach(function(element) {
		var readable = fs.createReadStream(originalPath+'/'+element); // 建立可讀(Readable)串流
		var writable = fs.createWriteStream(finalPath+'/'+element); // 建立可寫(Writable)串流

		// 所有來自 readable 的資料，都會被寫入到 '/logs/TEST/'+arr[i]' 檔中
		readable.pipe(writable);
		console.log('file copied:'+element); 
		}
	);
	console.log('files copied completed'); 
	
});
// 設定 1 毫秒後，解除 pipe() 的串流，由於 1 毫秒過短，所以應該會複製不了，設500ms。
setTimeout(function(){
	readable.unpipe(writable);
	writable.end();
}, 500);

