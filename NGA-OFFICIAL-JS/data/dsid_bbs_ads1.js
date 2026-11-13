(function () {
  var bg_data = [{"pid":"714","hiturl":"https://new.wan.360.cn/wan/zone/yeyoujpzq/?src=lmcps100160101-cps","wnUrl":"","box":"https://ad-static-xg.tagtic.cn/ad-material/images/heuNlwRLQ9RPj8ihlr3gukcd0tHXs7ZGW0bXhvLl.gif","txt":"","tid":1,"width":970,"height":90,"weight":-2003.919677734375,"time":10,"IsUnion":1,"type":0,"impTrackerList":["https://g1.tagtic.cn/don/wn?encode_nyg=cmVxaWQ9eDlxRkVvYWNEVUVuTHAwWW9DNVlKJmNvbz04Zjc2MDEzNzNjZjJiOTk1NGQ2M2EzZjgwMDNmMGQxZTVkYzAwNTliYjExMDU1MDFiNDJhNDJmMmY5ODMxNDVmJmRwaWQ9OGY3NjAxMzczY2YyYjk5NTRkNjNhM2Y4MDAzZjBkMWU1ZGMwMDU5YmIxMTA1NTAxYjQyYTQyZjJmOTgzMTQ1ZiZvcz0zJnJlZj1odHRwcyUzQSUyRiUyRmJicy5uZ2EuY24lMkYmYWR2ZXJ1c2VyaWQ9OTAzJm9yZGVyaWQ9MjczMzMmYWlkPTE2MDM1JnByb3ZpbmNlSWQ9MTQmcGF5bWVudD1jcHQmYWRfZnJvbT0wJm1pZD0xNjAzNTEmZ3JvdXBfaWQ9MTYwMzUxJnBvc2l0aW9uPTY2MyZ3PTk3MCZoPTkwJmNvc3Q9MCZjb2VmZmljaWVudD0xJnNsb3RCaW5kaW5nPXNpbmdsZSZjb21wYXJlX2J1Y2tldF9pZD1hJnRyYWZmaWNfYnVja2V0X2lkPXAzMzIxMCZpc1VuaW9uPTE&v_y=c4b05263e365e801d099093bd1806b69898768b210d1068550a307b3cc9a1392&"],"clkTrackerList":["https://g1.tagtic.cn/don/cl?encode_nyg=cmVxaWQ9eDlxRkVvYWNEVUVuTHAwWW9DNVlKJmNvbz04Zjc2MDEzNzNjZjJiOTk1NGQ2M2EzZjgwMDNmMGQxZTVkYzAwNTliYjExMDU1MDFiNDJhNDJmMmY5ODMxNDVmJmRwaWQ9OGY3NjAxMzczY2YyYjk5NTRkNjNhM2Y4MDAzZjBkMWU1ZGMwMDU5YmIxMTA1NTAxYjQyYTQyZjJmOTgzMTQ1ZiZvcz0zJnJlZj1odHRwcyUzQSUyRiUyRmJicy5uZ2EuY24lMkYmYWR2ZXJ1c2VyaWQ9OTAzJm9yZGVyaWQ9MjczMzMmYWlkPTE2MDM1JnByb3ZpbmNlSWQ9MTQmcGF5bWVudD1jcHQmYWRfZnJvbT0wJm1pZD0xNjAzNTEmZ3JvdXBfaWQ9MTYwMzUxJnBvc2l0aW9uPTY2MyZ3PTk3MCZoPTkwJmNvc3Q9MCZjb2VmZmljaWVudD0xJnNsb3RCaW5kaW5nPXNpbmdsZSZjb21wYXJlX2J1Y2tldF9pZD1hJnRyYWZmaWNfYnVja2V0X2lkPXAzMzIxMCZpc1VuaW9uPTE&v_y=c4b05263e365e801d099093bd1806b69898768b210d1068550a307b3cc9a1392"]}];

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
      "id": "bbs_ads1",
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