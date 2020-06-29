
// THESE ARE ALL INDEXED DB FUNCTIONS 


// This works on all devices/browsers, and uses IndexedDBShim as a final fallback 
var indexedDB		= window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB,
	IDBTransaction  = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction,
	baseName 	    = "abcd", // change the name here 
	storeName 	    = "abcde";


 // FUNCTION TO LOG ERRORS   
function logerr(err){
	console.log(err);
}

// CONNECTING TO THE DB

function connectDB(f){
	// Open (or create) the database
	var request = indexedDB.open(baseName, 1);
	request.onerror = logerr;
	request.onsuccess = function(){
		f(request.result);
	}
	request.onupgradeneeded = function(e){
	
		var Db = e.currentTarget.result;//var Db = e.target.result;
		
		//uncomment if we want to start clean
		//if(Db.objectStoreNames.contains(storeName)) Db.deleteObjectStore("note");
		
		//Create store
		if(!Db.objectStoreNames.contains(storeName)) {
			var store = Db.createObjectStore(storeName, {keyPath: "id", autoIncrement:true});  
			//store.createIndex("NameIndex", ["name.last", "name.first"], { unique: false });
		}
		connectDB(f);
	}
}

// TO GET THE DATA FOR PARTICULAR ID 


function get(id,f){
	connectDB(function(db){
		var transaction = db.transaction([storeName], "readonly").objectStore(storeName).get(id);
		transaction.onerror = logerr;
		transaction.onsuccess = function(){
			f(transaction.result ? transaction.result : -1);
		}
	});
}



//TO GET ALL THE DATA FROM INDEXED DB
function getAll(f){
	connectDB(function(db){
		var rows = [],
			store = db.transaction([storeName], "readonly").objectStore(storeName);

		if(store.mozGetAll)
			store.mozGetAll().onsuccess = function(e){
				f(e.target.result);
			};
		else
			store.openCursor().onsuccess = function(e) {
				var cursor = e.target.result;
				if(cursor){
					rows.push(cursor.value);
					cursor.continue();
				}
				else {
					f(rows);
				}
			};
	});
}


//TO UPDATE THE DATA INSIDE INDEXED DB
function up(obj){//obj with id
	del(obj.id,'up');
	add(obj,'up');
}



// TO ADD A NEW DATA 
function add(obj,info){
	info = typeof info !== 'undefined' ? false : true;
	connectDB(function(db){
		var transaction = db.transaction([storeName], "readwrite");
        var objectStore = transaction.objectStore(storeName);
       // console.log(objectStore);
		var objectStoreRequest = objectStore.add(obj);
		objectStoreRequest.onerror = logerr;
		objectStoreRequest.onsuccess = function(){
			if(info)
				{  return "Rows has been added"}
			else
				{ return "Rows has been updated"}
		
		}
	});
}


// TO DELETE THE DATA

function del(id,info){
	info = typeof info !== 'undefined' ? false : true;
	connectDB(function(db){
		var transaction = db.transaction([storeName], "readwrite");
		var objectStore = transaction.objectStore(storeName);
		var objectStoreRequest = objectStore.delete(id);
		objectStoreRequest.onerror = logerr;
		objectStoreRequest.onsuccess = function(){
			if(info)
				console.log("Rows has been deleted: ", id);
		}
	});
}


// INSERTS DUMMY DATA IN THE INDEXED DB ON STARTING OF THE APPLICATION

//DUMMY DATA FROM THE INTERNET
function seeder()
{


let data=[
    {
      "name": "Loretta Mason",
      "email": "lorettamason@centuria.com",
      "phone": "+1 (914) 575-3348",
      "address": "687 Junius Street, Jardine, West Virginia, 6927"
    },
    {
      "name": "Lilian Dunn",
      "email": "liliandunn@centuria.com",
      "phone": "+1 (825) 418-2138",
      "address": "877 Elm Place, Ogema, Arizona, 7978"
    },
    {
      "name": "Meadows Mathews",
      "email": "meadowsmathews@centuria.com",
      "phone": "+1 (974) 465-3054",
      "address": "984 Noll Street, Richford, Rhode Island, 8336"
    },
    {
      "name": "Martin Simon",
      "email": "martinsimon@centuria.com",
      "phone": "+1 (810) 577-2249",
      "address": "519 Revere Place, Waterview, Missouri, 1145"
    },
    {
      "name": "Tamera Mckinney",
      "email": "tameramckinney@centuria.com",
      "phone": "+1 (999) 521-2017",
      "address": "319 Highland Avenue, Wadsworth, New Jersey, 2603"
    },
    {
      "name": "Albert Lang",
      "email": "albertlang@centuria.com",
      "phone": "+1 (939) 408-3159",
      "address": "890 Tudor Terrace, Clarence, Maryland, 1626"
    },
    {
      "name": "Therese Snider",
      "email": "theresesnider@centuria.com",
      "phone": "+1 (988) 409-3751",
      "address": "648 Lexington Avenue, Fillmore, Iowa, 6014"
    },
    {
      "name": "Beatrice Strickland",
      "email": "beatricestrickland@centuria.com",
      "phone": "+1 (836) 592-2087",
      "address": "594 Tapscott Street, Dubois, Oregon, 6618"
    },
    {
      "name": "Williamson Cote",
      "email": "williamsoncote@centuria.com",
      "phone": "+1 (822) 415-3780",
      "address": "302 Nelson Street, Tivoli, Nevada, 3391"
    },
    {
      "name": "Dorsey Holden",
      "email": "dorseyholden@centuria.com",
      "phone": "+1 (837) 513-2137",
      "address": "990 Lincoln Avenue, Deseret, Louisiana, 2859"
    },
    {
      "name": "Hutchinson Bates",
      "email": "hutchinsonbates@centuria.com",
      "phone": "+1 (983) 593-3815",
      "address": "318 Rose Street, Frierson, Guam, 3256"
    },
    {
      "name": "Ruthie Gilmore",
      "email": "ruthiegilmore@centuria.com",
      "phone": "+1 (801) 444-2394",
      "address": "679 Scholes Street, Fairhaven, Tennessee, 2657"
    },
    {
      "name": "Latoya Crosby",
      "email": "latoyacrosby@centuria.com",
      "phone": "+1 (827) 562-2402",
      "address": "382 Monitor Street, Bison, North Dakota, 3552"
    },
    {
      "name": "Gilbert Crawford",
      "email": "gilbertcrawford@centuria.com",
      "phone": "+1 (906) 459-3817",
      "address": "720 Bainbridge Street, Coloma, Maine, 2138"
    },
    {
      "name": "Larson Hooper",
      "email": "larsonhooper@centuria.com",
      "phone": "+1 (807) 568-2105",
      "address": "241 Highland Place, Caron, Connecticut, 7597"
    },
    {
      "name": "Richards Sweet",
      "email": "richardssweet@centuria.com",
      "phone": "+1 (934) 532-2484",
      "address": "679 Reeve Place, Titanic, Puerto Rico, 7725"
    },
    {
      "name": "Wendi Foley",
      "email": "wendifoley@centuria.com",
      "phone": "+1 (907) 575-3699",
      "address": "944 Radde Place, Welch, Wisconsin, 8888"
    },
    {
      "name": "Janell Barron",
      "email": "janellbarron@centuria.com",
      "phone": "+1 (876) 504-3196",
      "address": "593 Beayer Place, Dargan, Idaho, 3199"
    },
    {
      "name": "Erica Richmond",
      "email": "ericarichmond@centuria.com",
      "phone": "+1 (949) 550-3154",
      "address": "743 Luquer Street, Maury, Georgia, 1869"
    },
    {
      "name": "Rosario Acevedo",
      "email": "rosarioacevedo@centuria.com",
      "phone": "+1 (962) 492-2736",
      "address": "625 Maujer Street, Frystown, American Samoa, 3560"
    },
    {
      "name": "English Cooley",
      "email": "englishcooley@centuria.com",
      "phone": "+1 (979) 577-3557",
      "address": "187 Kimball Street, Tryon, Mississippi, 7695"
    },
    {
      "name": "Wade Berg",
      "email": "wadeberg@centuria.com",
      "phone": "+1 (912) 500-2133",
      "address": "982 Gerald Court, Nord, Arkansas, 2131"
    },
    {
      "name": "Isabelle Meadows",
      "email": "isabellemeadows@centuria.com",
      "phone": "+1 (821) 537-2250",
      "address": "447 Monument Walk, Freelandville, Illinois, 5446"
    },
    {
      "name": "Lowery Gentry",
      "email": "lowerygentry@centuria.com",
      "phone": "+1 (870) 491-3041",
      "address": "426 Joralemon Street, Moraida, District Of Columbia, 5852"
    },
    {
      "name": "Ina Douglas",
      "email": "inadouglas@centuria.com",
      "phone": "+1 (977) 596-3939",
      "address": "904 Cass Place, Disautel, Kansas, 1496"
    },
    {
      "name": "Jaclyn Dorsey",
      "email": "jaclyndorsey@centuria.com",
      "phone": "+1 (857) 490-3872",
      "address": "907 Manor Court, Hanover, Indiana, 6915"
    },
    {
      "name": "Calderon Mendoza",
      "email": "calderonmendoza@centuria.com",
      "phone": "+1 (842) 599-3677",
      "address": "539 Kingsway Place, Inkerman, Washington, 9521"
    },
    {
      "name": "Silvia Boone",
      "email": "silviaboone@centuria.com",
      "phone": "+1 (955) 437-2335",
      "address": "275 Claver Place, Canby, North Carolina, 6728"
    },
    {
      "name": "Mendoza Velez",
      "email": "mendozavelez@centuria.com",
      "phone": "+1 (960) 548-3233",
      "address": "867 Foster Avenue, Benson, South Dakota, 9882"
    },
    {
      "name": "Vance Stone",
      "email": "vancestone@centuria.com",
      "phone": "+1 (942) 486-3192",
      "address": "174 Borinquen Pl, Gloucester, Utah, 4894"
    },
    {
      "name": "Angelica Leblanc",
      "email": "angelicaleblanc@centuria.com",
      "phone": "+1 (990) 582-3796",
      "address": "199 Homecrest Avenue, Limestone, Wyoming, 957"
    },
    {
      "name": "Rosanne Daniels",
      "email": "rosannedaniels@centuria.com",
      "phone": "+1 (867) 587-2644",
      "address": "355 Atkins Avenue, Roberts, Kentucky, 2782"
    },
    {
      "name": "Bradford Craft",
      "email": "bradfordcraft@centuria.com",
      "phone": "+1 (906) 510-2945",
      "address": "489 Bragg Street, Nescatunga, Pennsylvania, 3456"
    },
    {
      "name": "Inez Morrison",
      "email": "inezmorrison@centuria.com",
      "phone": "+1 (974) 407-2944",
      "address": "422 Whitney Avenue, Rosewood, Colorado, 4986"
    },
    {
      "name": "Bass Reynolds",
      "email": "bassreynolds@centuria.com",
      "phone": "+1 (851) 479-3270",
      "address": "263 Kensington Street, Lookingglass, Delaware, 6251"
    },
    {
      "name": "Polly Osborne",
      "email": "pollyosborne@centuria.com",
      "phone": "+1 (947) 523-3436",
      "address": "223 Cheever Place, Glenville, Marshall Islands, 7542"
    },
    {
      "name": "Chelsea Harrell",
      "email": "chelseaharrell@centuria.com",
      "phone": "+1 (937) 524-2704",
      "address": "996 Preston Court, Navarre, Vermont, 9660"
    },
    {
      "name": "Carmela Herring",
      "email": "carmelaherring@centuria.com",
      "phone": "+1 (932) 514-3090",
      "address": "412 Bush Street, Oceola, Texas, 1754"
    },
    {
      "name": "Doyle Long",
      "email": "doylelong@centuria.com",
      "phone": "+1 (892) 489-2105",
      "address": "848 Polar Street, Brogan, Virgin Islands, 2602"
    },
    {
      "name": "Lorie Hart",
      "email": "loriehart@centuria.com",
      "phone": "+1 (971) 588-3633",
      "address": "940 Boynton Place, Chemung, Alaska, 830"
    },
    {
      "name": "Farley Nolan",
      "email": "farleynolan@centuria.com",
      "phone": "+1 (852) 585-3946",
      "address": "654 Liberty Avenue, Hollymead, Ohio, 5718"
    },
    {
      "name": "Marjorie Kline",
      "email": "marjoriekline@centuria.com",
      "phone": "+1 (975) 545-2831",
      "address": "358 Knapp Street, Wiscon, Northern Mariana Islands, 7524"
    },
    {
      "name": "Perry Joyner",
      "email": "perryjoyner@centuria.com",
      "phone": "+1 (999) 544-2470",
      "address": "805 Clinton Avenue, Dola, New Hampshire, 2120"
    },
    {
      "name": "Teresa Wells",
      "email": "teresawells@centuria.com",
      "phone": "+1 (887) 448-3088",
      "address": "817 Banner Avenue, Rivers, Federated States Of Micronesia, 1598"
    },
    {
      "name": "Mays Barrera",
      "email": "maysbarrera@centuria.com",
      "phone": "+1 (832) 596-2400",
      "address": "202 Beverley Road, Muse, South Carolina, 9448"
    },
    {
      "name": "Vega Castro",
      "email": "vegacastro@centuria.com",
      "phone": "+1 (810) 404-3241",
      "address": "135 Dupont Street, Harrodsburg, Palau, 1037"
    },
    {
      "name": "Logan Newton",
      "email": "logannewton@centuria.com",
      "phone": "+1 (815) 441-2446",
      "address": "223 Wyckoff Street, Bethpage, Michigan, 4280"
    },
    {
      "name": "Rivas Guthrie",
      "email": "rivasguthrie@centuria.com",
      "phone": "+1 (954) 514-2008",
      "address": "219 Jefferson Street, Waikele, Massachusetts, 5376"
    },
    {
      "name": "Matthews Cantrell",
      "email": "matthewscantrell@centuria.com",
      "phone": "+1 (860) 482-3016",
      "address": "346 Miller Place, Tampico, Nebraska, 2618"
    },
    {
      "name": "Weber Waters",
      "email": "weberwaters@centuria.com",
      "phone": "+1 (933) 437-2394",
      "address": "966 Norwood Avenue, Conestoga, New Mexico, 7306"
    },
    {
      "name": "Kelli Weaver",
      "email": "kelliweaver@centuria.com",
      "phone": "+1 (863) 529-3163",
      "address": "321 Henderson Walk, Wright, Oklahoma, 8348"
    },
    {
      "name": "Wise Rowland",
      "email": "wiserowland@centuria.com",
      "phone": "+1 (974) 588-2214",
      "address": "480 Grimes Road, Crisman, Montana, 4544"
    },
    {
      "name": "Tisha Rowe",
      "email": "tisharowe@centuria.com",
      "phone": "+1 (840) 422-3645",
      "address": "992 Holmes Lane, Odessa, Hawaii, 5746"
    },
    {
      "name": "Trina Sargent",
      "email": "trinasargent@centuria.com",
      "phone": "+1 (858) 458-2766",
      "address": "199 Harbor Court, Leola, Alabama, 7840"
    },
    {
      "name": "Lambert Barlow",
      "email": "lambertbarlow@centuria.com",
      "phone": "+1 (851) 506-3559",
      "address": "349 Ruby Street, Bradenville, New York, 9593"
    },
    {
      "name": "Janelle Malone",
      "email": "janellemalone@centuria.com",
      "phone": "+1 (924) 514-3189",
      "address": "274 Fleet Walk, Elwood, Virginia, 9276"
    },
    {
      "name": "Poole Rosa",
      "email": "poolerosa@centuria.com",
      "phone": "+1 (987) 500-2069",
      "address": "768 Cypress Court, Caberfae, Florida, 4368"
    },
    {
      "name": "Jarvis Ferguson",
      "email": "jarvisferguson@centuria.com",
      "phone": "+1 (879) 477-2666",
      "address": "721 Lake Avenue, Vivian, Minnesota, 4120"
    },
    {
      "name": "Winters Martinez",
      "email": "wintersmartinez@centuria.com",
      "phone": "+1 (803) 501-3573",
      "address": "821 Bliss Terrace, Ironton, West Virginia, 7547"
    },
    {
      "name": "Elsa Hernandez",
      "email": "elsahernandez@centuria.com",
      "phone": "+1 (844) 430-2363",
      "address": "255 Grant Avenue, Whipholt, Arizona, 9679"
    },
    {
      "name": "Maxwell Finch",
      "email": "maxwellfinch@centuria.com",
      "phone": "+1 (997) 580-2990",
      "address": "960 Malta Street, Templeton, Rhode Island, 2816"
    },
    {
      "name": "Lois Cline",
      "email": "loiscline@centuria.com",
      "phone": "+1 (819) 562-3630",
      "address": "530 Benson Avenue, Bangor, Missouri, 3918"
    },
    {
      "name": "Lottie Baxter",
      "email": "lottiebaxter@centuria.com",
      "phone": "+1 (949) 463-2295",
      "address": "576 Sutter Avenue, Walker, New Jersey, 4948"
    },
    {
      "name": "Mathews Pruitt",
      "email": "mathewspruitt@centuria.com",
      "phone": "+1 (850) 463-2945",
      "address": "400 Florence Avenue, Siglerville, Maryland, 1324"
    },
    {
      "name": "Julia Clayton",
      "email": "juliaclayton@centuria.com",
      "phone": "+1 (876) 440-3096",
      "address": "832 Dobbin Street, Cuylerville, Iowa, 5509"
    },
    {
      "name": "Maritza Medina",
      "email": "maritzamedina@centuria.com",
      "phone": "+1 (965) 412-3376",
      "address": "132 Lott Street, Madrid, Oregon, 8110"
    },
    {
      "name": "Gertrude May",
      "email": "gertrudemay@centuria.com",
      "phone": "+1 (891) 540-3446",
      "address": "643 Jerome Avenue, Driftwood, Nevada, 256"
    },
    {
      "name": "Kristi Head",
      "email": "kristihead@centuria.com",
      "phone": "+1 (815) 521-2037",
      "address": "688 Halleck Street, Bannock, Louisiana, 4593"
    },
    {
      "name": "Finley Sullivan",
      "email": "finleysullivan@centuria.com",
      "phone": "+1 (900) 423-2788",
      "address": "478 Gem Street, Wolcott, Guam, 7005"
    },
    {
      "name": "Wilma Parker",
      "email": "wilmaparker@centuria.com",
      "phone": "+1 (808) 527-2522",
      "address": "658 Cameron Court, Hachita, Tennessee, 6772"
    },
    {
      "name": "Carr Buchanan",
      "email": "carrbuchanan@centuria.com",
      "phone": "+1 (843) 595-3540",
      "address": "178 Nolans Lane, Esmont, North Dakota, 3902"
    },
    {
      "name": "Fuller Watson",
      "email": "fullerwatson@centuria.com",
      "phone": "+1 (981) 435-2317",
      "address": "785 Mersereau Court, Boling, Maine, 6629"
    },
    {
      "name": "Hallie Meyer",
      "email": "halliemeyer@centuria.com",
      "phone": "+1 (957) 455-3255",
      "address": "315 Hazel Court, Caroline, Connecticut, 7211"
    },
    {
      "name": "Durham Murphy",
      "email": "durhammurphy@centuria.com",
      "phone": "+1 (918) 471-3895",
      "address": "723 Oxford Walk, Blanco, Puerto Rico, 4560"
    },
    {
      "name": "Diane Love",
      "email": "dianelove@centuria.com",
      "phone": "+1 (985) 444-2690",
      "address": "342 Hastings Street, Tecolotito, Wisconsin, 308"
    },
    {
      "name": "Nichole Hodges",
      "email": "nicholehodges@centuria.com",
      "phone": "+1 (970) 516-2677",
      "address": "541 Waldane Court, Beaulieu, Idaho, 3151"
    },
    {
      "name": "Griffin Knowles",
      "email": "griffinknowles@centuria.com",
      "phone": "+1 (800) 413-2106",
      "address": "789 Hendrix Street, Fairlee, Georgia, 9497"
    },
    {
      "name": "Casey Vasquez",
      "email": "caseyvasquez@centuria.com",
      "phone": "+1 (940) 498-3337",
      "address": "559 Hampton Avenue, Harold, American Samoa, 6865"
    },
    {
      "name": "Howe Bradford",
      "email": "howebradford@centuria.com",
      "phone": "+1 (848) 560-3873",
      "address": "181 Crescent Street, Stockwell, Mississippi, 7168"
    },
    {
      "name": "Heather Burris",
      "email": "heatherburris@centuria.com",
      "phone": "+1 (861) 451-2626",
      "address": "369 Royce Place, Barstow, Arkansas, 2342"
    },
    {
      "name": "Hicks Hood",
      "email": "hickshood@centuria.com",
      "phone": "+1 (949) 539-3778",
      "address": "328 Billings Place, Lumberton, Illinois, 7399"
    },
    {
      "name": "Patty Foster",
      "email": "pattyfoster@centuria.com",
      "phone": "+1 (815) 503-2443",
      "address": "570 Wallabout Street, Zortman, District Of Columbia, 8231"
    },
    {
      "name": "Mara Morrow",
      "email": "maramorrow@centuria.com",
      "phone": "+1 (832) 580-3831",
      "address": "217 Colonial Court, Needmore, Kansas, 6585"
    },
    {
      "name": "Hawkins Mcmillan",
      "email": "hawkinsmcmillan@centuria.com",
      "phone": "+1 (916) 444-2868",
      "address": "886 Manhattan Court, Oberlin, Indiana, 4733"
    },
    {
      "name": "Terrell Mccormick",
      "email": "terrellmccormick@centuria.com",
      "phone": "+1 (954) 477-3783",
      "address": "811 Baycliff Terrace, Urbana, Washington, 4653"
    },
    {
      "name": "Sims Deleon",
      "email": "simsdeleon@centuria.com",
      "phone": "+1 (948) 519-2471",
      "address": "604 Rutherford Place, Cascades, North Carolina, 214"
    },
    {
      "name": "Antoinette Chase",
      "email": "antoinettechase@centuria.com",
      "phone": "+1 (854) 438-2882",
      "address": "150 Classon Avenue, Nicholson, South Dakota, 9980"
    },
    {
      "name": "Ellison Garza",
      "email": "ellisongarza@centuria.com",
      "phone": "+1 (993) 409-3396",
      "address": "769 McKinley Avenue, Remington, Utah, 1008"
    },
    {
      "name": "Rosalinda Galloway",
      "email": "rosalindagalloway@centuria.com",
      "phone": "+1 (884) 411-3379",
      "address": "603 Diamond Street, Bentonville, Wyoming, 7142"
    }
  ]


  for(let i=0;i<data.length;i++)
  {
      add(data[i]);
  }


}

