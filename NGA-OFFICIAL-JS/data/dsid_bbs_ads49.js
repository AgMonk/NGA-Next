(function () {
  var bg_data = [{"pid":"200809","hiturl":"https://new.wan.360.cn/wan/zone/yeyoujpzq/?src=lmcps100160101-cps","wnUrl":"","box":"https://ad-static-xg.tagtic.cn/ad-material/images/x6LDLLDERiV2AIawK3WrLRFnpTQnCd8usOtc0ub0.jpg","txt":"","tid":1,"width":970,"height":90,"weight":-2004.27978515625,"time":5,"IsUnion":1,"type":0,"impTrackerList":["https://g1.tagtic.cn/don/wn?encode_nyg=cmVxaWQ9a2ZoRnJOb3I1djBzaWVqeFRhUW9zJmNvbz04Zjc2MDEzNzNjZjJiOTk1NGQ2M2EzZjgwMDNmMGQxZTVkYzAwNTliYjExMDU1MDFiNDJhNDJmMmY5ODMxNDVmJmRwaWQ9OGY3NjAxMzczY2YyYjk5NTRkNjNhM2Y4MDAzZjBkMWU1ZGMwMDU5YmIxMTA1NTAxYjQyYTQyZjJmOTgzMTQ1ZiZvcz0zJnJlZj1odHRwcyUzQSUyRiUyRmJicy5uZ2EuY24lMkYmYWR2ZXJ1c2VyaWQ9OTAzJm9yZGVyaWQ9MjczNDUmYWlkPTE2MDQ3JnByb3ZpbmNlSWQ9MTQmcGF5bWVudD1jcHQmYWRfZnJvbT0wJm1pZD0xNjA0NzEmZ3JvdXBfaWQ9MTYwNDcxJnBvc2l0aW9uPTE3MDMmdz05NzAmaD05MCZjb3N0PTAmY29lZmZpY2llbnQ9MSZzbG90QmluZGluZz1zaW5nbGUmY29tcGFyZV9idWNrZXRfaWQ9YSZ0cmFmZmljX2J1Y2tldF9pZD1wMzUyODAmaXNVbmlvbj0x&v_y=39fa4fb78b516297d2b3f186c59f6861bdf36b9dd4297eb360ca069132b1d6d5&"],"clkTrackerList":["https://g1.tagtic.cn/don/cl?encode_nyg=cmVxaWQ9a2ZoRnJOb3I1djBzaWVqeFRhUW9zJmNvbz04Zjc2MDEzNzNjZjJiOTk1NGQ2M2EzZjgwMDNmMGQxZTVkYzAwNTliYjExMDU1MDFiNDJhNDJmMmY5ODMxNDVmJmRwaWQ9OGY3NjAxMzczY2YyYjk5NTRkNjNhM2Y4MDAzZjBkMWU1ZGMwMDU5YmIxMTA1NTAxYjQyYTQyZjJmOTgzMTQ1ZiZvcz0zJnJlZj1odHRwcyUzQSUyRiUyRmJicy5uZ2EuY24lMkYmYWR2ZXJ1c2VyaWQ9OTAzJm9yZGVyaWQ9MjczNDUmYWlkPTE2MDQ3JnByb3ZpbmNlSWQ9MTQmcGF5bWVudD1jcHQmYWRfZnJvbT0wJm1pZD0xNjA0NzEmZ3JvdXBfaWQ9MTYwNDcxJnBvc2l0aW9uPTE3MDMmdz05NzAmaD05MCZjb3N0PTAmY29lZmZpY2llbnQ9MSZzbG90QmluZGluZz1zaW5nbGUmY29tcGFyZV9idWNrZXRfaWQ9YSZ0cmFmZmljX2J1Y2tldF9pZD1wMzUyODAmaXNVbmlvbj0x&v_y=39fa4fb78b516297d2b3f186c59f6861bdf36b9dd4297eb360ca069132b1d6d5"]}];

  function request(urlList) {
    for (var i = 0; i < urlList.length; i++) {
      var url = urlList[i];
      var x = document.createElement("script")
      x.src = url;
      document.getElementsByTagName("head")[0].appendChild(x);
    }
  }

  if (bg_data.length > 0) {
    var ref = bg_data[0].box.substring(bg_data[0].box.lastIndexOf('/'), bg_data[0].box.lastIndexOf('.'));
    ngaAds.push({
      "id": "bbs_ads49",
      "isUnion": "" + bg_data[0].IsUnion + "",
      "file": "" + bg_data[0].box + "",
      "url": "" + bg_data[0].hiturl + "",
      "title": "",
      "width": "" + bg_data[0].width + "",
      "height": "" + bg_data[0].height + "",
      "date": "all",
      "rate": "100",
      "nolog": "1",
      "type": "" + bg_data[0].type + "",
      "sgid": bg_data[0].pid,
      "refreshid": "" + ref + "",
      "onload": function () {
        request(bg_data[0].impTrackerList)
      },
      "onclick": function () {
        request(bg_data[0].clkTrackerList)
      }
    });
  }
})();