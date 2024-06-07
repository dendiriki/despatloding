var base_site = "http://intranet.ispatindo.com/ws2/";
//var base_site = "http://IND-WS0031.ispatindo.com:8080/ws/";
var base_url = base_site+"index.php";
var db = null;
var env = null;
var srv_addr = base_url; //dev
var app_version = null;

var storage = window.localStorage;
var temp_storage = window.sessionStorage;
//initialization

document.addEventListener('deviceready',deviceReady, false);

function deviceReady() {
	//get mac address
	getMac();
  //check app version
  cordova.getAppVersion.getVersionNumber(function (version) {
    app_version = version;
    storage.setItem("app_version", version);
    $("#app_version").empty();
    $("#app_version").append(app_version);
  });
  
  // check login  
  var userid = storage.getItem("userid");  
  
  if(userid) {
    db = window.sqlitePlugin.openDatabase({name: 'my.db', location: 'default'});
    createDatabase();

    /*checkConfig();*/
		$("#user_name").empty();
		$("#user_name").append(storage.getItem("username"));
    $(".sidenav").sidenav();
		$('.collapsible').collapsible();
    $(".dropdown-button").dropdown(
      {hover: true}
    );
  } else {
    window.plugins.spinnerDialog.hide();
    if(window.location.href != "file:///android_asset/www/login.html") {
      window.location.href = "login.html";
    }
  }
}

function createDatabase() {
  if(window.location.href == "file:///android_asset/www/index.html") {
    db.transaction( function (tx) {
      // table config
      tx.executeSql('CREATE TABLE IF NOT EXISTS config (id, val)');
      // table loading advice
      tx.executeSql('CREATE TABLE IF NOT EXISTS loading_advice (barcode, trnum, matnr, size, grade, vbeln, posnr, qty)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS batch_master (matnr, charg, vbeln, posnr, zdate, recom)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS output (trnum, vbeln, posnr, matnr, charg, qty, coil)');
      // table stock opname
      tx.executeSql('CREATE TABLE IF NOT EXISTS opname_master (charg, upddt)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS opname_output (charg, status)');

    }, function (error) {
      console.log('ERROR: ' + JSON.stringify(error));
    });
  }
}

function checkConfig() {  
  var dtcount = 0;
  db.executeSql("SELECT count(*) AS cnt FROM config WHERE id = ? ", ["ENV"], function (rs) {
    dtcount = rs.rows.item(0).cnt;
    if(dtcount == 0) {
      //Jika belum ada confignya
      console.log("data nggak ada confignya");
      db.transaction(function (tx) {
        tx.executeSql("INSERT INTO config (id,val) VALUES('ENV','PRD')");
        $("#envx").val("PRD");
        if(window.location.href == "file:///android_asset/www/index.html") {
          $("#server_env").append("PRD");
          $("#env_prd").prop("checked", true);
        }
      }, function (error) {
        console.log('transaction error: ' + error.message);
      }, function () {
        console.log('INSERT config OK');
      });
    } else {
      // Jika sudah ada confignya
      db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM config WHERE id = ?", ["ENV"], function (ignored, resultSet) {
          if(resultSet.rows.length > 0) {
            var db_env = resultSet.rows.item(0).val;
            console.log("db_env "+db_env);
            $("#envx").val(db_env);
            if(window.location.href == "file:///android_asset/www/index.html") {
              $("#server_env").append(db_env);
              if(db_env == "PRD") {
                $("#env_prd").prop("checked", true);
              } else if(db_env == "DEV"){
                $("#env_dev").prop("checked", true);
              }
            }
          }
        });

      }, function (error) {
        console.log('transaction error: ' + error.message);
      }, function () {
        console.log('Select config OK');
      });
    }
  });
}

function onBackKeyDown() {
  var current = window.location.href;
	console.log(current);
  if (current == "file:///android_asset/www/index.html" || current == "file:///android_asset/www/index.html#" 
					|| current == "file:///android_asset/www/login.html" || current == "file:///android_asset/www/login.html#") {
    var r = confirm("Tutup Aplikasi?");
    if (r == true) {
      navigator.app.exitApp();
    }
  } else if(current == "file:///android_asset/www/loading_advice_root.html" || current == "file:///android_asset/www/opname_root.html") {
    window.location.href = "index.html";
  } else if(current == "file:///android_asset/www/loading_advice_do.html" || 
            current == "file:///android_asset/www/loading_advice_master.html" || 
            current == "file:///android_asset/www/loading_advice_scan.html" || 
            current == "file:///android_asset/www/loading_advice_scanned_all.html") {
    window.location.href = "loading_advice_root.html";
  } else if(current == "file:///android_asset/www/opname_master.html" || current == "file:///android_asset/www/opname_scan.html"){
    window.location.href = "opname_root.html";
  }
}

function openScannedBundle(vbeln, matnr) {
  window.location.href = "loading_advice_detail.html#"+vbeln+","+matnr;
}

function checkUser() {
  $("#sto_user").empty();
	$("#sto_user").append(storage.getItem("username"));
	$("#x_inp_user").val(storage.getItem("username"));
	$("#inp_user").val(storage.getItem("username"));
}

function logout() {
  storage.removeItem("userid");
  storage.removeItem("username");
  window.location.href = "login.html";
}

function getMac() {
	var params = {};
	addressimpl.request("getMACAddress", JSON.stringify(params), function(message) {
		console.log(message);
		storage.setItem("mac_addr", message);
	}, function() {
		alert("failed on get mac address");
	});
}