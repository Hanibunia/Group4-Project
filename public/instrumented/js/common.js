function cov_8nlq7rvo8(){var path="E:\\vs studio code\\devops\\test\\Group4-Project\\public\\js\\common.js";var hash="656b13f277d703983139bc3c48a924f0f850d776";var global=new Function("return this")();var gcv="__coverage__";var coverageData={path:"E:\\vs studio code\\devops\\test\\Group4-Project\\public\\js\\common.js",statementMap:{"0":{start:{line:3,column:4},end:{line:9,column:5}},"1":{start:{line:4,column:25},end:{line:4,column:55}},"2":{start:{line:5,column:28},end:{line:5,column:49}},"3":{start:{line:6,column:8},end:{line:6,column:50}},"4":{start:{line:8,column:8},end:{line:8,column:51}},"5":{start:{line:12,column:4},end:{line:58,column:5}},"6":{start:{line:13,column:22},end:{line:13,column:60}},"7":{start:{line:14,column:25},end:{line:14,column:66}},"8":{start:{line:15,column:32},end:{line:15,column:81}},"9":{start:{line:18,column:8},end:{line:18,column:64}},"10":{start:{line:21,column:8},end:{line:24,column:9}},"11":{start:{line:22,column:12},end:{line:22,column:116}},"12":{start:{line:23,column:12},end:{line:23,column:19}},"13":{start:{line:27,column:8},end:{line:30,column:9}},"14":{start:{line:28,column:12},end:{line:28,column:104}},"15":{start:{line:29,column:12},end:{line:29,column:19}},"16":{start:{line:33,column:25},end:{line:39,column:10}},"17":{start:{line:42,column:8},end:{line:55,column:9}},"18":{start:{line:43,column:33},end:{line:43,column:54}},"19":{start:{line:44,column:12},end:{line:44,column:81}},"20":{start:{line:47,column:12},end:{line:47,column:45}},"21":{start:{line:48,column:12},end:{line:48,column:42}},"22":{start:{line:50,column:30},end:{line:50,column:51}},"23":{start:{line:51,column:12},end:{line:51,column:68}},"24":{start:{line:54,column:12},end:{line:54,column:83}},"25":{start:{line:57,column:8},end:{line:57,column:64}}},fnMap:{"0":{name:"loadRestaurants",decl:{start:{line:2,column:15},end:{line:2,column:30}},loc:{start:{line:2,column:33},end:{line:10,column:1}},line:2},"1":{name:"registerUser",decl:{start:{line:11,column:15},end:{line:11,column:27}},loc:{start:{line:11,column:30},end:{line:59,column:1}},line:11}},branchMap:{"0":{loc:{start:{line:21,column:8},end:{line:24,column:9}},type:"if",locations:[{start:{line:21,column:8},end:{line:24,column:9}},{start:{line:21,column:8},end:{line:24,column:9}}],line:21},"1":{loc:{start:{line:21,column:12},end:{line:21,column:79}},type:"binary-expr",locations:[{start:{line:21,column:12},end:{line:21,column:32}},{start:{line:21,column:36},end:{line:21,column:56}},{start:{line:21,column:60},end:{line:21,column:79}}],line:21},"2":{loc:{start:{line:27,column:8},end:{line:30,column:9}},type:"if",locations:[{start:{line:27,column:8},end:{line:30,column:9}},{start:{line:27,column:8},end:{line:30,column:9}}],line:27},"3":{loc:{start:{line:42,column:8},end:{line:55,column:9}},type:"if",locations:[{start:{line:42,column:8},end:{line:55,column:9}},{start:{line:42,column:8},end:{line:55,column:9}}],line:42}},s:{"0":0,"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0,"24":0,"25":0},f:{"0":0,"1":0},b:{"0":[0,0],"1":[0,0,0],"2":[0,0],"3":[0,0]},_coverageSchema:"1a1c01bbd47fc00a2c39e90264f33305004495a9",hash:"656b13f277d703983139bc3c48a924f0f850d776"};var coverage=global[gcv]||(global[gcv]={});if(!coverage[path]||coverage[path].hash!==hash){coverage[path]=coverageData;}var actualCoverage=coverage[path];{// @ts-ignore
cov_8nlq7rvo8=function(){return actualCoverage;};}return actualCoverage;}cov_8nlq7rvo8();async function loadRestaurants(){cov_8nlq7rvo8().f[0]++;cov_8nlq7rvo8().s[0]++;try{const response=(cov_8nlq7rvo8().s[1]++,await fetch('/viewRestaurant'));const restaurants=(cov_8nlq7rvo8().s[2]++,await response.json());cov_8nlq7rvo8().s[3]++;appendRestaurantsToContainer(restaurants);}catch(error){cov_8nlq7rvo8().s[4]++;console.error('An error occurred:',error);}}async function registerUser(){cov_8nlq7rvo8().f[1]++;cov_8nlq7rvo8().s[5]++;try{const email=(cov_8nlq7rvo8().s[6]++,document.getElementById('Email').value);const password=(cov_8nlq7rvo8().s[7]++,document.getElementById('password').value);const confirmPassword=(cov_8nlq7rvo8().s[8]++,document.getElementById('confirm-password').value);// Clear previous error messages
cov_8nlq7rvo8().s[9]++;document.getElementById('registerError').innerText='';// Client-side validation
cov_8nlq7rvo8().s[10]++;if((cov_8nlq7rvo8().b[1][0]++,!email.includes('@'))||(cov_8nlq7rvo8().b[1][1]++,!email.includes('.'))||(cov_8nlq7rvo8().b[1][2]++,password.length<6)){cov_8nlq7rvo8().b[0][0]++;cov_8nlq7rvo8().s[11]++;document.getElementById('registerError').innerText='Invalid email or password (minimum 6 characters)';cov_8nlq7rvo8().s[12]++;return;// Do not proceed if validation fails
}else{cov_8nlq7rvo8().b[0][1]++;}// Additional check for password confirmation
cov_8nlq7rvo8().s[13]++;if(password!==confirmPassword){cov_8nlq7rvo8().b[2][0]++;cov_8nlq7rvo8().s[14]++;document.getElementById('registerError').innerText='Password confirmation does not match';cov_8nlq7rvo8().s[15]++;return;// Do not proceed if confirmation fails
}else{cov_8nlq7rvo8().b[2][1]++;}// Send a request to your server to handle the registration
const response=(cov_8nlq7rvo8().s[16]++,await fetch('/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})}));// Check the response status and handle accordingly
cov_8nlq7rvo8().s[17]++;if(response.ok){cov_8nlq7rvo8().b[3][0]++;const updatedUsers=(cov_8nlq7rvo8().s[18]++,await response.json());cov_8nlq7rvo8().s[19]++;console.log('Registration successful. Updated Users:',updatedUsers);// Close the registration modal and open the login modal
cov_8nlq7rvo8().s[20]++;$('#registerForm').modal('hide');cov_8nlq7rvo8().s[21]++;$('#loginForm').modal('show');}else{cov_8nlq7rvo8().b[3][1]++;const errorData=(cov_8nlq7rvo8().s[22]++,await response.json());cov_8nlq7rvo8().s[23]++;console.error('Registration error:',errorData.message);// Display the server-side error message
cov_8nlq7rvo8().s[24]++;document.getElementById('registerError').innerText=errorData.message;}}catch(error){cov_8nlq7rvo8().s[25]++;console.error('Error in registerUser function:',error);}}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfOG5scTdydm84IiwiYWN0dWFsQ292ZXJhZ2UiLCJsb2FkUmVzdGF1cmFudHMiLCJmIiwicyIsInJlc3BvbnNlIiwiZmV0Y2giLCJyZXN0YXVyYW50cyIsImpzb24iLCJhcHBlbmRSZXN0YXVyYW50c1RvQ29udGFpbmVyIiwiZXJyb3IiLCJjb25zb2xlIiwicmVnaXN0ZXJVc2VyIiwiZW1haWwiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwidmFsdWUiLCJwYXNzd29yZCIsImNvbmZpcm1QYXNzd29yZCIsImlubmVyVGV4dCIsImIiLCJpbmNsdWRlcyIsImxlbmd0aCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsIm9rIiwidXBkYXRlZFVzZXJzIiwibG9nIiwiJCIsIm1vZGFsIiwiZXJyb3JEYXRhIiwibWVzc2FnZSJdLCJzb3VyY2VzIjpbImNvbW1vbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcclxuYXN5bmMgZnVuY3Rpb24gbG9hZFJlc3RhdXJhbnRzKCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvdmlld1Jlc3RhdXJhbnQnKTtcclxuICAgICAgICBjb25zdCByZXN0YXVyYW50cyA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICBhcHBlbmRSZXN0YXVyYW50c1RvQ29udGFpbmVyKHJlc3RhdXJhbnRzKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignQW4gZXJyb3Igb2NjdXJyZWQ6JywgZXJyb3IpO1xyXG4gICAgfVxyXG59XHJcbmFzeW5jIGZ1bmN0aW9uIHJlZ2lzdGVyVXNlcigpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgZW1haWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnRW1haWwnKS52YWx1ZTtcclxuICAgICAgICBjb25zdCBwYXNzd29yZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYXNzd29yZCcpLnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IGNvbmZpcm1QYXNzd29yZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb25maXJtLXBhc3N3b3JkJykudmFsdWU7XHJcblxyXG4gICAgICAgIC8vIENsZWFyIHByZXZpb3VzIGVycm9yIG1lc3NhZ2VzXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlZ2lzdGVyRXJyb3InKS5pbm5lclRleHQgPSAnJztcclxuXHJcbiAgICAgICAgLy8gQ2xpZW50LXNpZGUgdmFsaWRhdGlvblxyXG4gICAgICAgIGlmICghZW1haWwuaW5jbHVkZXMoJ0AnKSB8fCAhZW1haWwuaW5jbHVkZXMoJy4nKSB8fCBwYXNzd29yZC5sZW5ndGggPCA2KSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZWdpc3RlckVycm9yJykuaW5uZXJUZXh0ID0gJ0ludmFsaWQgZW1haWwgb3IgcGFzc3dvcmQgKG1pbmltdW0gNiBjaGFyYWN0ZXJzKSc7XHJcbiAgICAgICAgICAgIHJldHVybjsgLy8gRG8gbm90IHByb2NlZWQgaWYgdmFsaWRhdGlvbiBmYWlsc1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQWRkaXRpb25hbCBjaGVjayBmb3IgcGFzc3dvcmQgY29uZmlybWF0aW9uXHJcbiAgICAgICAgaWYgKHBhc3N3b3JkICE9PSBjb25maXJtUGFzc3dvcmQpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlZ2lzdGVyRXJyb3InKS5pbm5lclRleHQgPSAnUGFzc3dvcmQgY29uZmlybWF0aW9uIGRvZXMgbm90IG1hdGNoJztcclxuICAgICAgICAgICAgcmV0dXJuOyAvLyBEbyBub3QgcHJvY2VlZCBpZiBjb25maXJtYXRpb24gZmFpbHNcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNlbmQgYSByZXF1ZXN0IHRvIHlvdXIgc2VydmVyIHRvIGhhbmRsZSB0aGUgcmVnaXN0cmF0aW9uXHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3JlZ2lzdGVyJywge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBlbWFpbCwgcGFzc3dvcmQgfSksXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIHRoZSByZXNwb25zZSBzdGF0dXMgYW5kIGhhbmRsZSBhY2NvcmRpbmdseVxyXG4gICAgICAgIGlmIChyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICBjb25zdCB1cGRhdGVkVXNlcnMgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZWdpc3RyYXRpb24gc3VjY2Vzc2Z1bC4gVXBkYXRlZCBVc2VyczonLCB1cGRhdGVkVXNlcnMpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2xvc2UgdGhlIHJlZ2lzdHJhdGlvbiBtb2RhbCBhbmQgb3BlbiB0aGUgbG9naW4gbW9kYWxcclxuICAgICAgICAgICAgJCgnI3JlZ2lzdGVyRm9ybScpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICQoJyNsb2dpbkZvcm0nKS5tb2RhbCgnc2hvdycpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVycm9yRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignUmVnaXN0cmF0aW9uIGVycm9yOicsIGVycm9yRGF0YS5tZXNzYWdlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIERpc3BsYXkgdGhlIHNlcnZlci1zaWRlIGVycm9yIG1lc3NhZ2VcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlZ2lzdGVyRXJyb3InKS5pbm5lclRleHQgPSBlcnJvckRhdGEubWVzc2FnZTtcclxuICAgICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGluIHJlZ2lzdGVyVXNlciBmdW5jdGlvbjonLCBlcnJvcik7XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdLCJtYXBwaW5ncyI6ImkyR0FlWTtBQUFBQSxhQUFBLFNBQUFBLENBQUEsU0FBQUMsY0FBQSxXQUFBQSxjQUFBLEVBQUFELGFBQUEsR0FkWixjQUFlLENBQUFFLGVBQWVBLENBQUEsQ0FBRyxDQUFBRixhQUFBLEdBQUFHLENBQUEsTUFBQUgsYUFBQSxHQUFBSSxDQUFBLE1BQzdCLEdBQUksQ0FDQSxLQUFNLENBQUFDLFFBQVEsRUFBQUwsYUFBQSxHQUFBSSxDQUFBLE1BQUcsS0FBTSxDQUFBRSxLQUFLLENBQUMsaUJBQWlCLENBQUMsRUFDL0MsS0FBTSxDQUFBQyxXQUFXLEVBQUFQLGFBQUEsR0FBQUksQ0FBQSxNQUFHLEtBQU0sQ0FBQUMsUUFBUSxDQUFDRyxJQUFJLENBQUMsQ0FBQyxFQUFDUixhQUFBLEdBQUFJLENBQUEsTUFDMUNLLDRCQUE0QixDQUFDRixXQUFXLENBQUMsQ0FDN0MsQ0FBRSxNQUFPRyxLQUFLLENBQUUsQ0FBQVYsYUFBQSxHQUFBSSxDQUFBLE1BQ1pPLE9BQU8sQ0FBQ0QsS0FBSyxDQUFDLG9CQUFvQixDQUFFQSxLQUFLLENBQUMsQ0FDOUMsQ0FDSixDQUNBLGNBQWUsQ0FBQUUsWUFBWUEsQ0FBQSxDQUFHLENBQUFaLGFBQUEsR0FBQUcsQ0FBQSxNQUFBSCxhQUFBLEdBQUFJLENBQUEsTUFDMUIsR0FBSSxDQUNBLEtBQU0sQ0FBQVMsS0FBSyxFQUFBYixhQUFBLEdBQUFJLENBQUEsTUFBR1UsUUFBUSxDQUFDQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUNDLEtBQUssRUFDcEQs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