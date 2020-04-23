 //// EOS ////////////
    var {
	format,
	api,
	ecc,
	json,
	Fcbuffer
    } = Eos.modules;
    
    chain = {
	mainnet: 'f9f432b1851b5c179d2091a96f593aaed50ec7466b74f89301f957a83e56ce1f',
	testnet: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca',
	sysnet: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f'
    };
    
    /**
       Other httpEndpoint's: https://www.eosdocs.io/resources/apiendpoints
    */
    eosconfig = {
	///httpEndpoint: 'http://209.97.162.124:8800',
	///chainId: chain.sysnet,
	httpEndpoint: 'http://209.97.162.124:8080',
	chainId: chain.mainnet,
	broadcast: true,
	keyProvider: "",
	verbose: false,
    };

eos = Eos(eosconfig);

ScatterJS.plugins( Vexanium() );
var fromDappBrowser = navigator.userAgent=='VexWalletAndroid';
var appname = document.title;
var network = ScatterJS.Network.fromJson({
	blockchain: bc('vex'),
	chainId:'f9f432b1851b5c179d2091a96f593aaed50ec7466b74f89301f957a83e56ce1f',
	host:'209.97.162.124',
	port:8080,
	protocol:'http'
});
var account;
var akun = document.getElementById('yourBp');
let balance = '0.0000 VEX';
let dots = 0;
$('.eye').text('|');
setTimeout(function(){	
	connect();
},3000);
$('#ufo').on('click touch', function(){
	$(this).toggleClass('flying');
	$(this).toggleClass('caught');
});
$('#login').on('click touch', function(){
	connect();
});
function zero() {
	balance = '0.0000 VEX';
	$('#dots').text('.');
	dots = 0;
}
function loading() {
	if(dots < 6) {
		$('#dots').append('.');
		dots++;
	}
}
function sleepy() {
	$('.tog').addClass('d-none');
	$('#login,#eyes').removeClass('d-none');
	$('#login').prop('disabled', false);
	$('.eye').text('X');
	$('#intro').text('Welcome');
}
function connect() {
	$('.tog').addClass('d-none');
	$('#dots,#login').removeClass('d-none');
	$('#login').prop('disabled', true);
	zero();
	setInterval(loading, 900);
	try{
		if(!fromDappBrowser){
			ScatterJS.connect(appname,{network}).then(connected => {
				if(!connected) {
					notConnected();
					return;
				}
				login();
			});
		} else {
			pe.getWalletWithAccount().then((res)=>{
				if(!res) {
					notConnected();
					return;
				}
				account = res.data.account;
				onConnected();
			});	
		}
	} catch (e) {
		console.log(e);
	}
}
function notConnected(){
	$('.tog').addClass('d-none');
	$('#login,#nopen').removeClass('d-none');
	setTimeout(sleepy, 4500);
}
function onConnected(){
	$('.tog').addClass('d-none');
	$('#gotin,#logout').removeClass('d-none');
	$('#user').text(account);
akun.innerHTML = account;
	$('#logout').on('click touch', function(){
		logout();
	});
	getinfo(account);
}
function login() {
	try{
		ScatterJS.login().then(id => {
			if(!id) return;
			account = id.accounts[0].name;
			onConnected();
		});
	} catch (e) {
		console.log(e);
	}
}
function getinfo() {
	try {
		const vexnet = VexNet(network);
		vexnet.getAccount(account).then(info => {
			balance = info.core_liquid_balance?info.core_liquid_balance:balance;
			setTimeout(function(){
				$('#user').text(account);
				$('#mybalance').text(balance);
			}, 500);
		});	
	} catch (e) {
		console.log(e);
	}
}
function logout() {
	try {
		if(!fromDappBrowser) ScatterJS.logout();
		sleepy();
$('#user').text("please login again");
				$('#mybalance').text("please login again");
	} catch (e) {
		console.log(e);
	}
}

$("#claimButton").click(function() {
var contract_claim = "vexcore";
var indonesia = 0;
  eos.contract(contract_claim).then(contract =>
   contract.regproducer({
producer: account,
producer_key: mypubkey,
url: "https://vexbp.blogspot.com",
location: indonesia,
}, {
authorization: account
})).then(function() {
alert("Your BP registered");
}).catch(function(exception) {
alert(exception);
})
});

$("#unreg").click(function() {
var contract_unreg = "vexcore";
  eos.contract(contract_unreg).then(contract =>
   contract.unregprod({
producer: account,
}, {
authorization: account
})).then(function() {
alert("Your BP unregistered");
}).catch(function(exception) {
alert(exception);
})
});

$("#claim").click(function() {
var contract_reg = "vexcore";
  eos.contract(contract_reg).then(contract =>
   contract.claimrewards({
owner: account,
}, {
authorization: account
})).then(function() {
alert("Your reward BP claimed");
}).catch(function(exception) {
alert(exception);
})
});