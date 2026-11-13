(function () {
  var bg_data = [{"pid":"200808","hiturl":"https://new.wan.360.cn/wan/zone/yeyoujpzq/?src=lmcps100160101-cps","wnUrl":"","box":"https://ad-static-xg.tagtic.cn/ad-material/images/M1YoF3SAobh759u83K53DyfG5TuGiF75pvShbhH8.gif","txt":"","tid":1,"width":970,"height":90,"weight":-2007.8082275390625,"time":5,"IsUnion":1,"type":0,"impTrackerList":["https://g1.tagtic.cn/don/wn?encode_nyg=cmVxaWQ9aWFheWkzQnhJckJPd0tZcnlhaXVhJmNvbz01NWIwYzg2NWY2YjRjNTc2MTQxZWE1ODQ0MzY3M2M0MzlkOTM2Njc4Mzg5YTBjN2Q5YmU2MGY4ZmEyOTc4YzliJmRwaWQ9NTViMGM4NjVmNmI0YzU3NjE0MWVhNTg0NDM2NzNjNDM5ZDkzNjY3ODM4OWEwYzdkOWJlNjBmOGZhMjk3OGM5YiZvcz0zJnJlZj1odHRwcyUzQSUyRiUyRmJicy5uZ2EuY24lMkYmYWR2ZXJ1c2VyaWQ9OTAzJm9yZGVyaWQ9MjczNDMmYWlkPTE2MDQ1JnByb3ZpbmNlSWQ9MTQmcGF5bWVudD1jcHQmYWRfZnJvbT0wJm1pZD0xNjA0NTImZ3JvdXBfaWQ9MTYwNDUyJnBvc2l0aW9uPTE3MDImdz05NzAmaD05MCZjb3N0PTAmY29lZmZpY2llbnQ9MSZzbG90QmluZGluZz1zaW5nbGUmY29tcGFyZV9idWNrZXRfaWQ9YSZ0cmFmZmljX2J1Y2tldF9pZD1wMzUyNzgmaXNVbmlvbj0x&v_y=fb15170798c66b37772cee8a2a2dc747a3bb5e81638f2bc28d198bcb0317cf3a&"],"clkTrackerList":["https://g1.tagtic.cn/don/cl?encode_nyg=cmVxaWQ9aWFheWkzQnhJckJPd0tZcnlhaXVhJmNvbz01NWIwYzg2NWY2YjRjNTc2MTQxZWE1ODQ0MzY3M2M0MzlkOTM2Njc4Mzg5YTBjN2Q5YmU2MGY4ZmEyOTc4YzliJmRwaWQ9NTViMGM4NjVmNmI0YzU3NjE0MWVhNTg0NDM2NzNjNDM5ZDkzNjY3ODM4OWEwYzdkOWJlNjBmOGZhMjk3OGM5YiZvcz0zJnJlZj1odHRwcyUzQSUyRiUyRmJicy5uZ2EuY24lMkYmYWR2ZXJ1c2VyaWQ9OTAzJm9yZGVyaWQ9MjczNDMmYWlkPTE2MDQ1JnByb3ZpbmNlSWQ9MTQmcGF5bWVudD1jcHQmYWRfZnJvbT0wJm1pZD0xNjA0NTImZ3JvdXBfaWQ9MTYwNDUyJnBvc2l0aW9uPTE3MDImdz05NzAmaD05MCZjb3N0PTAmY29lZmZpY2llbnQ9MSZzbG90QmluZGluZz1zaW5nbGUmY29tcGFyZV9idWNrZXRfaWQ9YSZ0cmFmZmljX2J1Y2tldF9pZD1wMzUyNzgmaXNVbmlvbj0x&v_y=fb15170798c66b37772cee8a2a2dc747a3bb5e81638f2bc28d198bcb0317cf3a"]}];

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
      "id": "bbs_ads50",
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