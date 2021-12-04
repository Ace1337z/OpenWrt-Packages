'use strict';
'require view';
'require poll';
'require fs';

/*
	Copyright 2021 Rafał Wabik - IceG - From eko.one.pl forum
*/

return view.extend({
	render: function() {
		poll.add(function() {
			return L.resolveDefault(fs.exec_direct('/usr/share/3ginfo-lite/3ginfo.sh', 'json'))
			.then(function(res) {
				var json = JSON.parse(res);
					
					var icon;
					var p = (json.signal);
					if (p < 0)
						icon = L.resource('icons/3ginfo-0.png');
					else if (p == 0)
						icon = L.resource('icons/3ginfo-0.png');
					else if (p < 20)
						icon = L.resource('icons/3ginfo-0-20.png');
					else if (p < 40)
						icon = L.resource('icons/3ginfo-20-40.png');
					else if (p < 60)
						icon = L.resource('icons/3ginfo-40-60.png');
					else if (p < 80)
						icon = L.resource('icons/3ginfo-60-80.png');
					else
						icon = L.resource('icons/3ginfo-80-100.png');


					if (document.getElementById('signal')) {
						var view = document.getElementById("signal");
						view.innerHTML = String.format('<medium>%d%%</medium></br>' + '<img style="padding-left: 10px;" src="%s"/>', p, icon);
					}

					if (document.getElementById('connst')) {
						var view = document.getElementById("connst");
						if (json.connt == '') { 
						view.textContent = '-';
						}
						else {
						view.textContent = '⏱ '+ json.connt + ' | ↓' + json.connrx + ' ↑' + json.conntx;
						}
					}

					if (document.getElementById('operator')) {
						var view = document.getElementById("operator");
						if (json.operator_name == '') { 
						view.textContent = '-';
						}
						else {
						view.textContent = json.operator_name;
						}
					}

					if (document.getElementById('mode')) {
						var view = document.getElementById("mode");
						if (json.mode == '') { 
						view.textContent = '-';
						}
						else {
						view.textContent = json.mode;
						}
					}

					if (document.getElementById('modem')) {
						var view = document.getElementById("modem");
						if (json.modem == '') { 
						view.textContent = '-';
						}
						else {
						view.textContent = json.modem;
						}
					}

					if (document.getElementById('fw')) {
						var view = document.getElementById("fw");
						if (json.firmware == '') { 
						view.textContent = '-';
						}
						else {
						view.textContent = json.firmware;
						}
					}

					if (document.getElementById('cport')) {
						var view = document.getElementById("cport");
						if (json.cport == '') { 
						view.textContent = '-';
						}
						else {
						view.textContent = json.cport;
						}
					}

					if (document.getElementById('protocol')) {
						var view = document.getElementById("protocol");
						if (json.protocol == '') { 
						view.textContent = '-';
						}
						else {
						view.textContent = json.protocol;
						}
					}

					if (document.getElementById('temp')) {
						var view = document.getElementById("temp");
						var t = json.mtemp;
						if (t == '') { 
						view.textContent = '- °C';
						}
						else {
						view.textContent = t.replace('&deg;', '°');
						}
					}

					if (document.getElementById('csq')) {
						var view = document.getElementById("csq");
						if (json.csq == '' || json.csq == '0') { 
						view.textContent = '-';
						}
						else {
						view.textContent = json.csq;
						}
					}

					if (document.getElementById('rssi')) {
						var view = document.getElementById("rssi");
						if (json.rssi == '') { 
						view.textContent = '- dBm';
						}
						else {
							var z = json.rssi;
							if (z.includes('dBm')) { 
							view.textContent = json.rssi;
							}
							else {
							view.textContent = json.rssi + ' dBm';
							}
						}
					}

					if (document.getElementById('rsrp')) {
						var view = document.getElementById("rsrp");
						if (json.rsrp == '') { 
						view.textContent = '- dBm';
						}
						else {
							var z = json.rsrp;
							if (z.includes('dBm')) { 
							view.textContent = json.rsrp;
							}
							else {
							view.textContent = json.rsrp + ' dBm';
							}
						}
					}

					if (document.getElementById('sinr')) {
						var view = document.getElementById("sinr");
						if (json.sinr == '') { 
						view.textContent = '- dB';
						}
						else {
							var z = json.sinr;
							if (z.includes('dB')) { 
							view.textContent = json.sinr;
							}
							else {
							view.textContent = json.sinr + ' dB';
							}
						}
					}

					if (document.getElementById('rsrq')) {
						var view = document.getElementById("rsrq");
						if (json.rsrq == '') { 
						view.textContent = '- dB';
						}
						else {
							var z = json.rsrq;
							if (z.includes('dB')) { 
							view.textContent = json.rsrq;
							}
							else {
							view.textContent = json.rsrq + ' dB';
							}
						}
					}

					if (document.getElementById('mccmnc')) {
						var view = document.getElementById("mccmnc");
						if (json.operator_mcc == '' & json.operator_mnc == '') { 
						view.textContent = '-';
						}
						else {
						view.textContent = json.operator_mcc + " " + json.operator_mnc;
						}
					}

					if (document.getElementById('lac')) {
						var view = document.getElementById("lac");
						if (json.lac_dec == '' || json.lac_hex == '') { 
						var lc = json.lac_hex   + ' ' + json.lac_dec;
						var ld = lc.split(' ').join('');
						view.textContent = ld;
						}
						else {
						view.textContent = json.lac_hex   + ' (' + json.lac_dec + ')' ;
						}

					}

					if (document.getElementById('cid')) {
						var view = document.getElementById("cid");
						if (json.cid_dec == '' || json.cid_hex == '') { 
						var cc = json.cid_hex   + ' ' + json.cid_dec;
						var cd = cc.split(' ').join('');
						view.textContent = cd;
						}
						else {
						view.textContent = json.cid_hex   + ' (' + json.cid_dec + ')' ;
						}
					}


			});
		});
		return E([], [
			E('h2', {}, [ _('3ginfo-lite') ]),
			E('div', { class: 'cbi-section-descr' }, _('More information about the 3ginfo on the')+ ' <a href="https://eko.one.pl/?p=openwrt-3ginfo" target="_blank">' + _('eko.one.pl forum') + '</a>.'),
			E('h4', {}, [ _('General Information') ]),
			E('table', { 'class': 'table' }, [
				E('tr', { 'class': 'tr' }, [
					E('div', { 'class': 'td left', 'width': '33%' }, [ _('Signal strength:')]),
					E('div', { 'class': 'td left', 'id': 'signal' }, [ '-' ]),
					]),
				E('tr', { 'class': 'tr' }, [
					E('div', { 'class': 'td left', 'width': '33%' }, [ _('Operator:')]),
					E('div', { 'class': 'td left', 'id': 'operator' }, [ '-' ]),
					]),
				E('tr', { 'class': 'tr' }, [
					E('div', { 'class': 'td left', 'width': '33%' }, [ _('Connection statistics:')]),
					E('div', { 'class': 'td left', 'id': 'connst' }, [ '-' ]),
					]),
				E('tr', { 'class': 'tr' }, [
					E('div', { 'class': 'td left', 'width': '33%' }, [ _('Mode:')]),
					E('div', { 'class': 'td left', 'id': 'mode' }, [ '-' ]),
					]),
			]),

			E('h4', {}, [ _('Modem Information') ]),
			E('table', { 'class': 'table' }, [
				E('tr', { 'class': 'tr' }, [
					E('div', { 'class': 'td left', 'width': '33%' }, [ _('Modem type:')]),
					E('div', { 'class': 'td left', 'id': 'modem' }, [ '-' ]),
					]),
				E('tr', { 'class': 'tr' }, [
					E('div', { 'class': 'td left', 'width': '33%' }, [ _('Revision / Firmware:')]),
					E('div', { 'class': 'td left', 'id': 'fw' }, [ '-' ]),
					]),
				E('tr', { 'class': 'tr' }, [
					E('div', { 'class': 'td left', 'width': '33%' }, [ _('IP adress / Communication Port:')]),
					E('div', { 'class': 'td left', 'id': 'cport' }, [ '-' ]),
					]),
				E('tr', { 'class': 'tr' }, [
					E('div', { 'class': 'td left', 'width': '33%' }, [ _('Protocol:')]),
					E('div', { 'class': 'td left', 'id': 'protocol' }, [ '-' ]),
					]),
				E('tr', { 'class': 'tr' }, [
					E('div', { 'class': 'td left', 'width': '33%' }, [ _('Chip Temperature:')]),
					E('div', { 'class': 'td left', 'id': 'temp' }, [ '-' ]),
					]),
			]),

			E('h4', {}, [ _('Signal Information') ]),
			E('table', { 'class': 'table' }, [
				E('tr', { 'class': 'tr' }, [
					E('div', { 'class': 'td left', 'width': '33%' }, [ _('CSQ: ')]),
					E('div', { 'class': 'td left', 'id': 'csq' }, [ '-' ]),
					]),
				E('tr', { 'class': 'tr' }, [
					E('div', { 'class': 'td left', 'width': '33%' }, [ _('RSSI: ')]),
					E('div', { 'class': 'td left', 'id': 'rssi' }, [ '-' ]),
					]),
				E('tr', { 'class': 'tr' }, [
					E('div', { 'class': 'td left', 'width': '33%' }, [ _('RSRP: ')]),
					E('div', { 'class': 'td left', 'id': 'rsrp' }, [ '-' ]),
					]),
				E('tr', { 'class': 'tr' }, [
					E('div', { 'class': 'td left', 'width': '33%' }, [ _('SINR: ')]),
					E('div', { 'class': 'td left', 'id': 'sinr' }, [ '-' ]),
					]),
				E('tr', { 'class': 'tr' }, [
					E('div', { 'class': 'td left', 'width': '33%' }, [ _('RSRQ: ')]),
					E('div', { 'class': 'td left', 'id': 'rsrq' }, [ '-' ]),
					]),
			]),


			E('h4', {}, [ _('Cell Information') ]),
			E('table', { 'class': 'table' }, [
				E('tr', { 'class': 'tr' }, [
					E('div', { 'class': 'td left', 'width': '33%' }, [ _('MCC MNC: ')]),
					E('div', { 'class': 'td left', 'id': 'mccmnc' }, [ '-' ]),
					]),
				E('tr', { 'class': 'tr' }, [
					E('div', { 'class': 'td left', 'width': '33%' }, [ _('LAC: ')]),
					E('div', { 'class': 'td left', 'id': 'lac' }, [ '-' ]),
					]),
				E('tr', { 'class': 'tr' }, [
					E('div', { 'class': 'td left', 'width': '33%' }, [ _('CID: ')]),
					E('div', { 'class': 'td left', 'id': 'cid' }, [ '-' ]),
					]),

			]),

		]);
	},
	handleSaveApply: null,
	handleSave: null,
	handleReset: null
});
