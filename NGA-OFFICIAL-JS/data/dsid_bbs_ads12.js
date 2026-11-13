(function () {
  var bg_data = [{"pid":"778","hiturl":"","wnUrl":"","box":"","tid":0,"width":760,"height":500,"weight":-1475.020751953125,"time":5,"IsUnion":2,"type":33,"impTrackerList":["https://g1.tagtic.cn/don/wn?encode_nyg=cmVxaWQ9V3hoV3JZQ0ozek51N1h6a3A1TTZDJmNvbz01NWIwYzg2NWY2YjRjNTc2MTQxZWE1ODQ0MzY3M2M0MzlkOTM2Njc4Mzg5YTBjN2Q5YmU2MGY4ZmEyOTc4YzliJmRwaWQ9NTViMGM4NjVmNmI0YzU3NjE0MWVhNTg0NDM2NzNjNDM5ZDkzNjY3ODM4OWEwYzdkOWJlNjBmOGZhMjk3OGM5YiZvcz0zJnJlZj1odHRwcyUzQSUyRiUyRmJicy5uZ2EuY24lMkYmYWR2ZXJ1c2VyaWQ9MTA5Jm9yZGVyaWQ9NzQ4JmFpZD1wOTg0OTYmcHJvdmluY2VJZD0xNCZwYXltZW50PWNwdCZhZF9mcm9tPTMzJnBvc2l0aW9uPTY2MiZ3PTAmaD0wJmNvc3Q9MCZjb2VmZmljaWVudD0wJnNsb3RCaW5kaW5nPXNpbmdsZSZjb21wYXJlX2J1Y2tldF9pZD1hJnRyYWZmaWNfYnVja2V0X2lkPXAzMzIwOCZpc1VuaW9uPTI&v_y=bedab4cf3e5981b27b7f48d87bd7f8c2e84673932c024cfffe9ae21261e219e9&"],"clkTrackerList":["https://g1.tagtic.cn/don/cl?encode_nyg=cmVxaWQ9V3hoV3JZQ0ozek51N1h6a3A1TTZDJmNvbz01NWIwYzg2NWY2YjRjNTc2MTQxZWE1ODQ0MzY3M2M0MzlkOTM2Njc4Mzg5YTBjN2Q5YmU2MGY4ZmEyOTc4YzliJmRwaWQ9NTViMGM4NjVmNmI0YzU3NjE0MWVhNTg0NDM2NzNjNDM5ZDkzNjY3ODM4OWEwYzdkOWJlNjBmOGZhMjk3OGM5YiZvcz0zJnJlZj1odHRwcyUzQSUyRiUyRmJicy5uZ2EuY24lMkYmYWR2ZXJ1c2VyaWQ9MTA5Jm9yZGVyaWQ9NzQ4JmFpZD1wOTg0OTYmcHJvdmluY2VJZD0xNCZwYXltZW50PWNwdCZhZF9mcm9tPTMzJnBvc2l0aW9uPTY2MiZ3PTAmaD0wJmNvc3Q9MCZjb2VmZmljaWVudD0wJnNsb3RCaW5kaW5nPXNpbmdsZSZjb21wYXJlX2J1Y2tldF9pZD1hJnRyYWZmaWNfYnVja2V0X2lkPXAzMzIwOCZpc1VuaW9uPTI&v_y=bedab4cf3e5981b27b7f48d87bd7f8c2e84673932c024cfffe9ae21261e219e9"]}];

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
      "id": "bbs_ads12",
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