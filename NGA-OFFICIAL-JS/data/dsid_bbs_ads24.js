(function () {
  var bg_data = [{"pid":"715","hiturl":"https://new.wan.360.cn/wan/zone/yeyoujpzq/?src=lmcps100160101-cps","wnUrl":"","box":"https://ad-static-xg.tagtic.cn/ad-material/images/03pLLrv9wvULXQykTiL4fkvY1v8ogdxdIdro2tj5.jpg","txt":"","tid":1,"width":120,"height":240,"weight":-2006.4376220703125,"time":10,"IsUnion":1,"type":0,"impTrackerList":["https://g1.tagtic.cn/don/wn?encode_nyg=cmVxaWQ9TFlyNXFLX1UySVpWU0hzVEhKR2x1JmNvbz01NWIwYzg2NWY2YjRjNTc2MTQxZWE1ODQ0MzY3M2M0MzlkOTM2Njc4Mzg5YTBjN2Q5YmU2MGY4ZmEyOTc4YzliJmRwaWQ9NTViMGM4NjVmNmI0YzU3NjE0MWVhNTg0NDM2NzNjNDM5ZDkzNjY3ODM4OWEwYzdkOWJlNjBmOGZhMjk3OGM5YiZvcz0zJnJlZj1odHRwcyUzQSUyRiUyRmJicy5uZ2EuY24lMkYmYWR2ZXJ1c2VyaWQ9OTAzJm9yZGVyaWQ9MjczMzUmYWlkPTE2MDM3JnByb3ZpbmNlSWQ9MTQmcGF5bWVudD1jcHQmYWRfZnJvbT0wJm1pZD0xNjAzNzEmZ3JvdXBfaWQ9MTYwMzcxJnBvc2l0aW9uPTY2NCZ3PTEyMCZoPTI0MCZjb3N0PTAmY29lZmZpY2llbnQ9MSZzbG90QmluZGluZz1zaW5nbGUmY29tcGFyZV9idWNrZXRfaWQ9YSZ0cmFmZmljX2J1Y2tldF9pZD1wMzMyMTImaXNVbmlvbj0x&v_y=de57485ae3a936f51a687795da22f079a97006d6d7c0e7a79371e6b94ee3042a&"],"clkTrackerList":["https://g1.tagtic.cn/don/cl?encode_nyg=cmVxaWQ9TFlyNXFLX1UySVpWU0hzVEhKR2x1JmNvbz01NWIwYzg2NWY2YjRjNTc2MTQxZWE1ODQ0MzY3M2M0MzlkOTM2Njc4Mzg5YTBjN2Q5YmU2MGY4ZmEyOTc4YzliJmRwaWQ9NTViMGM4NjVmNmI0YzU3NjE0MWVhNTg0NDM2NzNjNDM5ZDkzNjY3ODM4OWEwYzdkOWJlNjBmOGZhMjk3OGM5YiZvcz0zJnJlZj1odHRwcyUzQSUyRiUyRmJicy5uZ2EuY24lMkYmYWR2ZXJ1c2VyaWQ9OTAzJm9yZGVyaWQ9MjczMzUmYWlkPTE2MDM3JnByb3ZpbmNlSWQ9MTQmcGF5bWVudD1jcHQmYWRfZnJvbT0wJm1pZD0xNjAzNzEmZ3JvdXBfaWQ9MTYwMzcxJnBvc2l0aW9uPTY2NCZ3PTEyMCZoPTI0MCZjb3N0PTAmY29lZmZpY2llbnQ9MSZzbG90QmluZGluZz1zaW5nbGUmY29tcGFyZV9idWNrZXRfaWQ9YSZ0cmFmZmljX2J1Y2tldF9pZD1wMzMyMTImaXNVbmlvbj0x&v_y=de57485ae3a936f51a687795da22f079a97006d6d7c0e7a79371e6b94ee3042a"]}];

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
      "id": "bbs_ads24",
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