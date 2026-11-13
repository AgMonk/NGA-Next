(function () {
  var bg_data = [{"pid":"200810","hiturl":"https://new.wan.360.cn/wan/zone/yeyoujpzq/?src=lmcps100160101-cps","wnUrl":"","box":"https://ad-static-xg.tagtic.cn/ad-material/images/JxDQVbslmwMgiJy6r4tWKe2XVML4Y8Wlq5bjg5ER.jpg","txt":"","tid":1,"width":523,"height":150,"weight":-2003.46044921875,"time":5,"IsUnion":1,"type":0,"impTrackerList":["https://g1.tagtic.cn/don/wn?encode_nyg=cmVxaWQ9NEtmVmhCcFdPYmpRWGxwSzlMWUg0JmNvbz02NWVkODA3OTY4OWNlMDg4Mzk1NTNmYmJjYTAzNzRjNzg4NmYzZWJjNzhkZTBlYTY3NDA2MzA0NjRjNGE0YWMyJmRwaWQ9NjVlZDgwNzk2ODljZTA4ODM5NTUzZmJiY2EwMzc0Yzc4ODZmM2ViYzc4ZGUwZWE2NzQwNjMwNDY0YzRhNGFjMiZvcz0zJnJlZj1odHRwcyUzQSUyRiUyRmJicy5uZ2EuY24lMkYmYWR2ZXJ1c2VyaWQ9OTAzJm9yZGVyaWQ9MjczNDcmYWlkPTE2MDQ5JnByb3ZpbmNlSWQ9MTQmcGF5bWVudD1jcHQmYWRfZnJvbT0wJm1pZD0xNjA0OTImZ3JvdXBfaWQ9MTYwNDkyJnBvc2l0aW9uPTE3MDQmdz01MjMmaD0xNTAmY29zdD0wJmNvZWZmaWNpZW50PTEmc2xvdEJpbmRpbmc9c2luZ2xlJmNvbXBhcmVfYnVja2V0X2lkPWEmdHJhZmZpY19idWNrZXRfaWQ9cDM1MjgyJmlzVW5pb249MQ&v_y=5c0c54fdc8cbfb4af1e15e9f0bad6a078f9da2a8301876beced3e78f9dffef08&"],"clkTrackerList":["https://g1.tagtic.cn/don/cl?encode_nyg=cmVxaWQ9NEtmVmhCcFdPYmpRWGxwSzlMWUg0JmNvbz02NWVkODA3OTY4OWNlMDg4Mzk1NTNmYmJjYTAzNzRjNzg4NmYzZWJjNzhkZTBlYTY3NDA2MzA0NjRjNGE0YWMyJmRwaWQ9NjVlZDgwNzk2ODljZTA4ODM5NTUzZmJiY2EwMzc0Yzc4ODZmM2ViYzc4ZGUwZWE2NzQwNjMwNDY0YzRhNGFjMiZvcz0zJnJlZj1odHRwcyUzQSUyRiUyRmJicy5uZ2EuY24lMkYmYWR2ZXJ1c2VyaWQ9OTAzJm9yZGVyaWQ9MjczNDcmYWlkPTE2MDQ5JnByb3ZpbmNlSWQ9MTQmcGF5bWVudD1jcHQmYWRfZnJvbT0wJm1pZD0xNjA0OTImZ3JvdXBfaWQ9MTYwNDkyJnBvc2l0aW9uPTE3MDQmdz01MjMmaD0xNTAmY29zdD0wJmNvZWZmaWNpZW50PTEmc2xvdEJpbmRpbmc9c2luZ2xlJmNvbXBhcmVfYnVja2V0X2lkPWEmdHJhZmZpY19idWNrZXRfaWQ9cDM1MjgyJmlzVW5pb249MQ&v_y=5c0c54fdc8cbfb4af1e15e9f0bad6a078f9da2a8301876beced3e78f9dffef08"]}];

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
      "id": "bbs_ads46",
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