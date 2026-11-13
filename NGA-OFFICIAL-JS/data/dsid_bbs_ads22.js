(function () {
  var bg_data = [{"pid":"718","hiturl":"https://new.wan.360.cn/wan/zone/yeyoujpzq/?src=lmcps100160101-cps","wnUrl":"","box":"https://ad-static-xg.tagtic.cn/ad-material/images/CxYAQPEY6Esl41ozmzf7zADGGiBoR1DjRTLzHvOP.jpg","txt":"","tid":1,"width":120,"height":240,"weight":-2006.7236328125,"time":10,"IsUnion":1,"type":0,"impTrackerList":["https://g1.tagtic.cn/don/wn?encode_nyg=cmVxaWQ9Q2FFTGVlWTdzWExCY0REVkJERlpwJmNvbz1mOGYyY2I3MGZhNzA0MDE1MGE2NDhjY2FhMmI2OGFiZDMzYTBkOGQyN2IwYWI1NWEwYTBlZGExMGQxZjgzOGEzJmRwaWQ9ZjhmMmNiNzBmYTcwNDAxNTBhNjQ4Y2NhYTJiNjhhYmQzM2EwZDhkMjdiMGFiNTVhMGEwZWRhMTBkMWY4MzhhMyZvcz0zJnJlZj1odHRwcyUzQSUyRiUyRmJicy5uZ2EuY24lMkYmYWR2ZXJ1c2VyaWQ9OTAzJm9yZGVyaWQ9Mjc1MjEmYWlkPTE2MjQ5JnByb3ZpbmNlSWQ9OCZwYXltZW50PWNwdCZhZF9mcm9tPTAmbWlkPTE2MjQ5MSZncm91cF9pZD0xNjI0OTEmcG9zaXRpb249NjY1Jnc9MTIwJmg9MjQwJmNvc3Q9MCZjb2VmZmljaWVudD0xJnNsb3RCaW5kaW5nPXNpbmdsZSZjb21wYXJlX2J1Y2tldF9pZD1hJnRyYWZmaWNfYnVja2V0X2lkPXAzMzIxNCZpc1VuaW9uPTE&v_y=8ffa01126bd0507873ed9936e85118ef073eb28cad9aaa342de77bed0b860f75&"],"clkTrackerList":["https://g1.tagtic.cn/don/cl?encode_nyg=cmVxaWQ9Q2FFTGVlWTdzWExCY0REVkJERlpwJmNvbz1mOGYyY2I3MGZhNzA0MDE1MGE2NDhjY2FhMmI2OGFiZDMzYTBkOGQyN2IwYWI1NWEwYTBlZGExMGQxZjgzOGEzJmRwaWQ9ZjhmMmNiNzBmYTcwNDAxNTBhNjQ4Y2NhYTJiNjhhYmQzM2EwZDhkMjdiMGFiNTVhMGEwZWRhMTBkMWY4MzhhMyZvcz0zJnJlZj1odHRwcyUzQSUyRiUyRmJicy5uZ2EuY24lMkYmYWR2ZXJ1c2VyaWQ9OTAzJm9yZGVyaWQ9Mjc1MjEmYWlkPTE2MjQ5JnByb3ZpbmNlSWQ9OCZwYXltZW50PWNwdCZhZF9mcm9tPTAmbWlkPTE2MjQ5MSZncm91cF9pZD0xNjI0OTEmcG9zaXRpb249NjY1Jnc9MTIwJmg9MjQwJmNvc3Q9MCZjb2VmZmljaWVudD0xJnNsb3RCaW5kaW5nPXNpbmdsZSZjb21wYXJlX2J1Y2tldF9pZD1hJnRyYWZmaWNfYnVja2V0X2lkPXAzMzIxNCZpc1VuaW9uPTE&v_y=8ffa01126bd0507873ed9936e85118ef073eb28cad9aaa342de77bed0b860f75"]}];

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
      "id": "bbs_ads22",
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