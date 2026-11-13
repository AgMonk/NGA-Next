(function () {
  var bg_data = [{"pid":"200811","hiturl":"https://new.wan.360.cn/wan/zone/yeyoujpzq/?src=lmcps100160101-cps","wnUrl":"","box":"https://ad-static-xg.tagtic.cn/ad-material/images/znYAZyr1XYPDopago9dcYDghDIDSO2rp964HyhW5.jpg","txt":"","tid":1,"width":523,"height":150,"weight":-2005.392333984375,"time":5,"IsUnion":1,"type":0,"impTrackerList":["https://g1.tagtic.cn/don/wn?encode_nyg=cmVxaWQ9Z1ZhTTBGNXNrT3FhaGRocl8zYnRuJmNvbz04Zjc2MDEzNzNjZjJiOTk1NGQ2M2EzZjgwMDNmMGQxZTVkYzAwNTliYjExMDU1MDFiNDJhNDJmMmY5ODMxNDVmJmRwaWQ9OGY3NjAxMzczY2YyYjk5NTRkNjNhM2Y4MDAzZjBkMWU1ZGMwMDU5YmIxMTA1NTAxYjQyYTQyZjJmOTgzMTQ1ZiZvcz0zJnJlZj1odHRwcyUzQSUyRiUyRmJicy5uZ2EuY24lMkYmYWR2ZXJ1c2VyaWQ9OTAzJm9yZGVyaWQ9MjczNDkmYWlkPTE2MDUxJnByb3ZpbmNlSWQ9MTQmcGF5bWVudD1jcHQmYWRfZnJvbT0wJm1pZD0xNjA1MTImZ3JvdXBfaWQ9MTYwNTEyJnBvc2l0aW9uPTE3MDUmdz01MjMmaD0xNTAmY29zdD0wJmNvZWZmaWNpZW50PTEmc2xvdEJpbmRpbmc9c2luZ2xlJmNvbXBhcmVfYnVja2V0X2lkPWEmdHJhZmZpY19idWNrZXRfaWQ9cDM1Mjg0JmlzVW5pb249MQ&v_y=0635b662eba542a97d9b9499145d6a8bae0b5d43f9617a09c14012ce76050f10&"],"clkTrackerList":["https://g1.tagtic.cn/don/cl?encode_nyg=cmVxaWQ9Z1ZhTTBGNXNrT3FhaGRocl8zYnRuJmNvbz04Zjc2MDEzNzNjZjJiOTk1NGQ2M2EzZjgwMDNmMGQxZTVkYzAwNTliYjExMDU1MDFiNDJhNDJmMmY5ODMxNDVmJmRwaWQ9OGY3NjAxMzczY2YyYjk5NTRkNjNhM2Y4MDAzZjBkMWU1ZGMwMDU5YmIxMTA1NTAxYjQyYTQyZjJmOTgzMTQ1ZiZvcz0zJnJlZj1odHRwcyUzQSUyRiUyRmJicy5uZ2EuY24lMkYmYWR2ZXJ1c2VyaWQ9OTAzJm9yZGVyaWQ9MjczNDkmYWlkPTE2MDUxJnByb3ZpbmNlSWQ9MTQmcGF5bWVudD1jcHQmYWRfZnJvbT0wJm1pZD0xNjA1MTImZ3JvdXBfaWQ9MTYwNTEyJnBvc2l0aW9uPTE3MDUmdz01MjMmaD0xNTAmY29zdD0wJmNvZWZmaWNpZW50PTEmc2xvdEJpbmRpbmc9c2luZ2xlJmNvbXBhcmVfYnVja2V0X2lkPWEmdHJhZmZpY19idWNrZXRfaWQ9cDM1Mjg0JmlzVW5pb249MQ&v_y=0635b662eba542a97d9b9499145d6a8bae0b5d43f9617a09c14012ce76050f10"]}];

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
      "id": "bbs_ads47",
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