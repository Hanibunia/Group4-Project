function cov_1kez2iwqox(){var path="E:\\vs studio code\\devops\\test\\Group4-Project\\public\\js\\Restaurant.js";var hash="69d7fafba655902279576750ec79b970fb14f928";var global=new Function("return this")();var gcv="__coverage__";var coverageData={path:"E:\\vs studio code\\devops\\test\\Group4-Project\\public\\js\\Restaurant.js",statementMap:{"0":{start:{line:2,column:4},end:{line:59,column:5}},"1":{start:{line:4,column:40},end:{line:4,column:81}},"2":{start:{line:7,column:8},end:{line:7,column:47}},"3":{start:{line:10,column:8},end:{line:55,column:11}},"4":{start:{line:12,column:35},end:{line:12,column:64}},"5":{start:{line:13,column:12},end:{line:13,column:57}},"6":{start:{line:15,column:12},end:{line:15,column:87}},"7":{start:{line:17,column:29},end:{line:17,column:58}},"8":{start:{line:18,column:12},end:{line:18,column:48}},"9":{start:{line:20,column:26},end:{line:20,column:54}},"10":{start:{line:21,column:12},end:{line:21,column:46}},"11":{start:{line:22,column:12},end:{line:22,column:48}},"12":{start:{line:24,column:32},end:{line:24,column:59}},"13":{start:{line:25,column:12},end:{line:25,column:51}},"14":{start:{line:26,column:12},end:{line:26,column:61}},"15":{start:{line:28,column:26},end:{line:28,column:55}},"16":{start:{line:29,column:12},end:{line:29,column:48}},"17":{start:{line:30,column:12},end:{line:30,column:44}},"18":{start:{line:31,column:12},end:{line:31,column:40}},"19":{start:{line:34,column:12},end:{line:34,column:40}},"20":{start:{line:35,column:12},end:{line:35,column:46}},"21":{start:{line:38,column:12},end:{line:40,column:13}},"22":{start:{line:39,column:16},end:{line:39,column:44}},"23":{start:{line:43,column:12},end:{line:43,column:49}},"24":{start:{line:46,column:12},end:{line:46,column:64}},"25":{start:{line:49,column:12},end:{line:53,column:13}},"26":{start:{line:50,column:16},end:{line:50,column:88}},"27":{start:{line:50,column:63},end:{line:50,column:86}},"28":{start:{line:51,column:16},end:{line:51,column:111}},"29":{start:{line:51,column:63},end:{line:51,column:109}},"30":{start:{line:58,column:8},end:{line:58,column:51}},"31":{start:{line:64,column:4},end:{line:64,column:40}},"32":{start:{line:66,column:4},end:{line:66,column:37}}},fnMap:{"0":{name:"appendRestaurantsToContainer",decl:{start:{line:1,column:9},end:{line:1,column:37}},loc:{start:{line:1,column:51},end:{line:60,column:1}},line:1},"1":{name:"(anonymous_1)",decl:{start:{line:10,column:28},end:{line:10,column:29}},loc:{start:{line:10,column:42},end:{line:55,column:9}},line:10},"2":{name:"(anonymous_2)",decl:{start:{line:50,column:57},end:{line:50,column:58}},loc:{start:{line:50,column:63},end:{line:50,column:86}},line:50},"3":{name:"(anonymous_3)",decl:{start:{line:51,column:57},end:{line:51,column:58}},loc:{start:{line:51,column:63},end:{line:51,column:109}},line:51},"4":{name:"handleRestaurantClick",decl:{start:{line:63,column:9},end:{line:63,column:30}},loc:{start:{line:63,column:45},end:{line:67,column:1}},line:63}},branchMap:{"0":{loc:{start:{line:38,column:12},end:{line:40,column:13}},type:"if",locations:[{start:{line:38,column:12},end:{line:40,column:13}},{start:{line:38,column:12},end:{line:40,column:13}}],line:38},"1":{loc:{start:{line:49,column:12},end:{line:53,column:13}},type:"if",locations:[{start:{line:49,column:12},end:{line:53,column:13}},{start:{line:49,column:12},end:{line:53,column:13}}],line:49}},s:{"0":0,"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0,"24":0,"25":0,"26":0,"27":0,"28":0,"29":0,"30":0,"31":0,"32":0},f:{"0":0,"1":0,"2":0,"3":0,"4":0},b:{"0":[0,0],"1":[0,0]},_coverageSchema:"1a1c01bbd47fc00a2c39e90264f33305004495a9",hash:"69d7fafba655902279576750ec79b970fb14f928"};var coverage=global[gcv]||(global[gcv]={});if(!coverage[path]||coverage[path].hash!==hash){coverage[path]=coverageData;}var actualCoverage=coverage[path];{// @ts-ignore
cov_1kez2iwqox=function(){return actualCoverage;};}return actualCoverage;}cov_1kez2iwqox();function appendRestaurantsToContainer(restaurants){cov_1kez2iwqox().f[0]++;cov_1kez2iwqox().s[0]++;try{// Get the container element where we'll append restaurant elements
const restaurantListContainer=(cov_1kez2iwqox().s[1]++,document.getElementById('restaurantList'));// Clear existing content in the container
cov_1kez2iwqox().s[2]++;restaurantListContainer.innerHTML='';// Loop through the formatted restaurants and create HTML elements for each
cov_1kez2iwqox().s[3]++;restaurants.forEach(restaurant=>{cov_1kez2iwqox().f[1]++;// Assuming you have restaurantId as the identifier
const restaurantCard=(cov_1kez2iwqox().s[4]++,document.createElement('div'));cov_1kez2iwqox().s[5]++;restaurantCard.classList.add('card','mb-3');cov_1kez2iwqox().s[6]++;restaurantCard.setAttribute('data-restaurant-id',restaurant.restaurantId);const cardBody=(cov_1kez2iwqox().s[7]++,document.createElement('div'));cov_1kez2iwqox().s[8]++;cardBody.classList.add('card-body');const title=(cov_1kez2iwqox().s[9]++,document.createElement('h5'));cov_1kez2iwqox().s[10]++;title.classList.add('card-title');cov_1kez2iwqox().s[11]++;title.textContent=restaurant.name;const description=(cov_1kez2iwqox().s[12]++,document.createElement('p'));cov_1kez2iwqox().s[13]++;description.classList.add('card-text');cov_1kez2iwqox().s[14]++;description.textContent=restaurant.description;const image=(cov_1kez2iwqox().s[15]++,document.createElement('img'));cov_1kez2iwqox().s[16]++;image.classList.add('card-img-top');cov_1kez2iwqox().s[17]++;image.src=restaurant.imageUrl;cov_1kez2iwqox().s[18]++;image.alt=restaurant.name;// Append elements to the card body
cov_1kez2iwqox().s[19]++;cardBody.appendChild(title);cov_1kez2iwqox().s[20]++;cardBody.appendChild(description);// Append image to the card only if an image URL is provided
cov_1kez2iwqox().s[21]++;if(restaurant.imageUrl){cov_1kez2iwqox().b[0][0]++;cov_1kez2iwqox().s[22]++;cardBody.appendChild(image);}else{cov_1kez2iwqox().b[0][1]++;}// Append card body to the card
cov_1kez2iwqox().s[23]++;restaurantCard.appendChild(cardBody);// Append the card to the restaurantListContainer
cov_1kez2iwqox().s[24]++;restaurantListContainer.appendChild(restaurantCard);// Ensure that the restaurant object has the 'restaurantId' property
cov_1kez2iwqox().s[25]++;if(restaurant.restaurantId){cov_1kez2iwqox().b[1][0]++;cov_1kez2iwqox().s[26]++;restaurantCard.addEventListener('click',()=>{cov_1kez2iwqox().f[2]++;cov_1kez2iwqox().s[27]++;return showReviews(restaurant);});cov_1kez2iwqox().s[28]++;restaurantCard.addEventListener('click',()=>{cov_1kez2iwqox().f[3]++;cov_1kez2iwqox().s[29]++;return handleRestaurantClick(restaurant.restaurantId);});}else{cov_1kez2iwqox().b[1][1]++;}});}catch(error){cov_1kez2iwqox().s[30]++;console.error('An error occurred:',error);}}let selectedRestaurantId;// Declare this variable globally
function handleRestaurantClick(restaurantId){cov_1kez2iwqox().f[4]++;cov_1kez2iwqox().s[31]++;selectedRestaurantId=restaurantId;// Open the reviews modal or perform any other actions you need
cov_1kez2iwqox().s[32]++;$('#reviewsModal').modal('show');}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMWtlejJpd3FveCIsImFjdHVhbENvdmVyYWdlIiwiYXBwZW5kUmVzdGF1cmFudHNUb0NvbnRhaW5lciIsInJlc3RhdXJhbnRzIiwiZiIsInMiLCJyZXN0YXVyYW50TGlzdENvbnRhaW5lciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJpbm5lckhUTUwiLCJmb3JFYWNoIiwicmVzdGF1cmFudCIsInJlc3RhdXJhbnRDYXJkIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsInNldEF0dHJpYnV0ZSIsInJlc3RhdXJhbnRJZCIsImNhcmRCb2R5IiwidGl0bGUiLCJ0ZXh0Q29udGVudCIsIm5hbWUiLCJkZXNjcmlwdGlvbiIsImltYWdlIiwic3JjIiwiaW1hZ2VVcmwiLCJhbHQiLCJhcHBlbmRDaGlsZCIsImIiLCJhZGRFdmVudExpc3RlbmVyIiwic2hvd1Jldmlld3MiLCJoYW5kbGVSZXN0YXVyYW50Q2xpY2siLCJlcnJvciIsImNvbnNvbGUiLCJzZWxlY3RlZFJlc3RhdXJhbnRJZCIsIiQiLCJtb2RhbCJdLCJzb3VyY2VzIjpbIlJlc3RhdXJhbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gYXBwZW5kUmVzdGF1cmFudHNUb0NvbnRhaW5lcihyZXN0YXVyYW50cykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICAvLyBHZXQgdGhlIGNvbnRhaW5lciBlbGVtZW50IHdoZXJlIHdlJ2xsIGFwcGVuZCByZXN0YXVyYW50IGVsZW1lbnRzXHJcbiAgICAgICAgY29uc3QgcmVzdGF1cmFudExpc3RDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdGF1cmFudExpc3QnKTtcclxuXHJcbiAgICAgICAgLy8gQ2xlYXIgZXhpc3RpbmcgY29udGVudCBpbiB0aGUgY29udGFpbmVyXHJcbiAgICAgICAgcmVzdGF1cmFudExpc3RDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XHJcblxyXG4gICAgICAgIC8vIExvb3AgdGhyb3VnaCB0aGUgZm9ybWF0dGVkIHJlc3RhdXJhbnRzIGFuZCBjcmVhdGUgSFRNTCBlbGVtZW50cyBmb3IgZWFjaFxyXG4gICAgICAgIHJlc3RhdXJhbnRzLmZvckVhY2gocmVzdGF1cmFudCA9PiB7XHJcbiAgICAgICAgICAgIC8vIEFzc3VtaW5nIHlvdSBoYXZlIHJlc3RhdXJhbnRJZCBhcyB0aGUgaWRlbnRpZmllclxyXG4gICAgICAgICAgICBjb25zdCByZXN0YXVyYW50Q2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICByZXN0YXVyYW50Q2FyZC5jbGFzc0xpc3QuYWRkKCdjYXJkJywgJ21iLTMnKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJlc3RhdXJhbnRDYXJkLnNldEF0dHJpYnV0ZSgnZGF0YS1yZXN0YXVyYW50LWlkJywgcmVzdGF1cmFudC5yZXN0YXVyYW50SWQpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgY2FyZEJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgY2FyZEJvZHkuY2xhc3NMaXN0LmFkZCgnY2FyZC1ib2R5Jyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDUnKTtcclxuICAgICAgICAgICAgdGl0bGUuY2xhc3NMaXN0LmFkZCgnY2FyZC10aXRsZScpO1xyXG4gICAgICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IHJlc3RhdXJhbnQubmFtZTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoJ2NhcmQtdGV4dCcpO1xyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHJlc3RhdXJhbnQuZGVzY3JpcHRpb247XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgICAgIGltYWdlLmNsYXNzTGlzdC5hZGQoJ2NhcmQtaW1nLXRvcCcpO1xyXG4gICAgICAgICAgICBpbWFnZS5zcmMgPSByZXN0YXVyYW50LmltYWdlVXJsO1xyXG4gICAgICAgICAgICBpbWFnZS5hbHQgPSByZXN0YXVyYW50Lm5hbWU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIEFwcGVuZCBlbGVtZW50cyB0byB0aGUgY2FyZCBib2R5XHJcbiAgICAgICAgICAgIGNhcmRCb2R5LmFwcGVuZENoaWxkKHRpdGxlKTtcclxuICAgICAgICAgICAgY2FyZEJvZHkuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAvLyBBcHBlbmQgaW1hZ2UgdG8gdGhlIGNhcmQgb25seSBpZiBhbiBpbWFnZSBVUkwgaXMgcHJvdmlkZWRcclxuICAgICAgICAgICAgaWYgKHJlc3RhdXJhbnQuaW1hZ2VVcmwpIHtcclxuICAgICAgICAgICAgICAgIGNhcmRCb2R5LmFwcGVuZENoaWxkKGltYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAvLyBBcHBlbmQgY2FyZCBib2R5IHRvIHRoZSBjYXJkXHJcbiAgICAgICAgICAgIHJlc3RhdXJhbnRDYXJkLmFwcGVuZENoaWxkKGNhcmRCb2R5KTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgLy8gQXBwZW5kIHRoZSBjYXJkIHRvIHRoZSByZXN0YXVyYW50TGlzdENvbnRhaW5lclxyXG4gICAgICAgICAgICByZXN0YXVyYW50TGlzdENvbnRhaW5lci5hcHBlbmRDaGlsZChyZXN0YXVyYW50Q2FyZCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIEVuc3VyZSB0aGF0IHRoZSByZXN0YXVyYW50IG9iamVjdCBoYXMgdGhlICdyZXN0YXVyYW50SWQnIHByb3BlcnR5XHJcbiAgICAgICAgICAgIGlmIChyZXN0YXVyYW50LnJlc3RhdXJhbnRJZCkge1xyXG4gICAgICAgICAgICAgICAgcmVzdGF1cmFudENhcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzaG93UmV2aWV3cyhyZXN0YXVyYW50KSk7XHJcbiAgICAgICAgICAgICAgICByZXN0YXVyYW50Q2FyZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGhhbmRsZVJlc3RhdXJhbnRDbGljayhyZXN0YXVyYW50LnJlc3RhdXJhbnRJZCkpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignQW4gZXJyb3Igb2NjdXJyZWQ6JywgZXJyb3IpO1xyXG4gICAgfVxyXG59XHJcbmxldCBzZWxlY3RlZFJlc3RhdXJhbnRJZDsgLy8gRGVjbGFyZSB0aGlzIHZhcmlhYmxlIGdsb2JhbGx5XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVSZXN0YXVyYW50Q2xpY2socmVzdGF1cmFudElkKSB7XHJcbiAgICBzZWxlY3RlZFJlc3RhdXJhbnRJZCA9IHJlc3RhdXJhbnRJZDtcclxuICAgIC8vIE9wZW4gdGhlIHJldmlld3MgbW9kYWwgb3IgcGVyZm9ybSBhbnkgb3RoZXIgYWN0aW9ucyB5b3UgbmVlZFxyXG4gICAgJCgnI3Jldmlld3NNb2RhbCcpLm1vZGFsKCdzaG93Jyk7XHJcbn1cclxuIl0sIm1hcHBpbmdzIjoiKzBIQWVZO0FBQUFBLGNBQUEsU0FBQUEsQ0FBQSxTQUFBQyxjQUFBLFdBQUFBLGNBQUEsRUFBQUQsY0FBQSxHQWZaLFFBQVMsQ0FBQUUsNEJBQTRCQSxDQUFDQyxXQUFXLENBQUUsQ0FBQUgsY0FBQSxHQUFBSSxDQUFBLE1BQUFKLGNBQUEsR0FBQUssQ0FBQSxNQUMvQyxHQUFJLENBQ0E7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