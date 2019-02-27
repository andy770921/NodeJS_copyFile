// 複製檔案的Javascript (NodeJS)程式碼
// 1. 先找到資料夾下欲複製的檔案，再將檔名存在自己宣告的陣列

var original_Path = '/logs';
var final_Path = '/TEST';
var fs = require('fs'); // 引入檔案系統模組
var arr = [];

fs.readdir(original_Path, function (err,files) {
 if(err){
  console.log(err);
 }
  console.log(files);
  arr = files;
});

// 2. 將檔案複製到指定資料夾
setTimeout(function () {
	console.log("file-name had been saved in array: "+arr);

	for (i=0; i<arr.length; i++){
		var readable = fs.createReadStream(original_Path+'/'+arr[i]); // 建立可讀(Readable)串流
		var writable = fs.createWriteStream(final_Path+'/'+arr[i]); // 建立可寫(Writable)串流

		// 所有來自 readable 的資料，都會被寫入到 '/logs/TEST/'+arr[i]' 檔中
		readable.pipe(writable);
		console.log('file copied:'+arr[i]); 
		};
	console.log('files copied completed'); 
// 設定 1 毫秒後，解除 pipe() 的串流，由於 1 毫秒過短，所以應該會複製不了，設500ms。
	setTimeout(function(){
		readable.unpipe(writable);
		writable.end();
	}, 500);
},500);
