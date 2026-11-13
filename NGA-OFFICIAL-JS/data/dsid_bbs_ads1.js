(function () {
  var bg_data = [{"pid":"714","hiturl":"https://new.wan.360.cn/wan/zone/yeyoujpzq/?src=lmcps100160101-cps","wnUrl":"","box":"https://ad-static-xg.tagtic.cn/ad-material/images/heuNlwRLQ9RPj8ihlr3gukcd0tHXs7ZGW0bXhvLl.gif","txt":"","tid":1,"width":970,"height":90,"weight":-2006.08935546875,"time":10,"IsUnion":1,"type":0,"impTrackerList":["https://g1.tagtic.cn/don/wn?encode_nyg=cmVxaWQ9bnRDSUtjM0dOdmUyRGtsVzQyRF9qJmNvbz1mZWRhOGQ5OGE1YzE2MDYzZGJhMjJhNjBmMDQ0ZTljNDg5ZDVkNWYyM2YwYjNjNTc5YTBmNDVhNWFjMDNlMGM4JmRwaWQ9ZmVkYThkOThhNWMxNjA2M2RiYTIyYTYwZjA0NGU5YzQ4OWQ1ZDVmMjNmMGIzYzU3OWEwZjQ1YTVhYzAzZTBjOCZvcz0zJnJlZj1odHRwcyUzQSUyRiUyRmJicy5uZ2EuY24lMkYmYWR2ZXJ1c2VyaWQ9OTAzJm9yZGVyaWQ9MjczMzMmYWlkPTE2MDM1JnByb3ZpbmNlSWQ9OCZwYXltZW50PWNwdCZhZF9mcm9tPTAmbWlkPTE2MDM1MSZncm91cF9pZD0xNjAzNTEmcG9zaXRpb249NjYzJnc9OTcwJmg9OTAmY29zdD0wJmNvZWZmaWNpZW50PTEmc2xvdEJpbmRpbmc9c2luZ2xlJmNvbXBhcmVfYnVja2V0X2lkPWEmdHJhZmZpY19idWNrZXRfaWQ9cDMzMjEwJmlzVW5pb249MQ&v_y=09124b9f60718d65def897d18a29e961aee8e94a9142ef9bc856341b2aa375ed&"],"clkTrackerList":["https://g1.tagtic.cn/don/cl?encode_nyg=cmVxaWQ9bnRDSUtjM0dOdmUyRGtsVzQyRF9qJmNvbz1mZWRhOGQ5OGE1YzE2MDYzZGJhMjJhNjBmMDQ0ZTljNDg5ZDVkNWYyM2YwYjNjNTc5YTBmNDVhNWFjMDNlMGM4JmRwaWQ9ZmVkYThkOThhNWMxNjA2M2RiYTIyYTYwZjA0NGU5YzQ4OWQ1ZDVmMjNmMGIzYzU3OWEwZjQ1YTVhYzAzZTBjOCZvcz0zJnJlZj1odHRwcyUzQSUyRiUyRmJicy5uZ2EuY24lMkYmYWR2ZXJ1c2VyaWQ9OTAzJm9yZGVyaWQ9MjczMzMmYWlkPTE2MDM1JnByb3ZpbmNlSWQ9OCZwYXltZW50PWNwdCZhZF9mcm9tPTAmbWlkPTE2MDM1MSZncm91cF9pZD0xNjAzNTEmcG9zaXRpb249NjYzJnc9OTcwJmg9OTAmY29zdD0wJmNvZWZmaWNpZW50PTEmc2xvdEJpbmRpbmc9c2luZ2xlJmNvbXBhcmVfYnVja2V0X2lkPWEmdHJhZmZpY19idWNrZXRfaWQ9cDMzMjEwJmlzVW5pb249MQ&v_y=09124b9f60718d65def897d18a29e961aee8e94a9142ef9bc856341b2aa375ed"]}];

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