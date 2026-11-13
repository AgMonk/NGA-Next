(function () {
  var bg_data = [{"pid":"200810","hiturl":"https://new.wan.360.cn/wan/zone/yeyoujpzq/?src=lmcps100160101-cps","wnUrl":"","box":"https://ad-static-xg.tagtic.cn/ad-material/images/tmKG3TQ2luMUmJLbbBRHJyh2Px6kYT9cpvPPPlxS.jpg","txt":"","tid":1,"width":523,"height":150,"weight":-2004.2867431640625,"time":5,"IsUnion":1,"type":0,"impTrackerList":["https://g1.tagtic.cn/don/wn?encode_nyg=cmVxaWQ9djhFX0RvZ2JlaWh5UkVXREo3TzFzJmNvbz1mOGYyY2I3MGZhNzA0MDE1MGE2NDhjY2FhMmI2OGFiZDMzYTBkOGQyN2IwYWI1NWEwYTBlZGExMGQxZjgzOGEzJmRwaWQ9ZjhmMmNiNzBmYTcwNDAxNTBhNjQ4Y2NhYTJiNjhhYmQzM2EwZDhkMjdiMGFiNTVhMGEwZWRhMTBkMWY4MzhhMyZvcz0zJnJlZj1odHRwcyUzQSUyRiUyRmJicy5uZ2EuY24lMkYmYWR2ZXJ1c2VyaWQ9OTAzJm9yZGVyaWQ9MjczNDcmYWlkPTE2MDQ5JnByb3ZpbmNlSWQ9OCZwYXltZW50PWNwdCZhZF9mcm9tPTAmbWlkPTE2MDQ5MSZncm91cF9pZD0xNjA0OTEmcG9zaXRpb249MTcwNCZ3PTUyMyZoPTE1MCZjb3N0PTAmY29lZmZpY2llbnQ9MSZzbG90QmluZGluZz1zaW5nbGUmY29tcGFyZV9idWNrZXRfaWQ9YSZ0cmFmZmljX2J1Y2tldF9pZD1wMzUyODImaXNVbmlvbj0x&v_y=4d531c56730e72b08131e370fd605c8d6fe67916010e377a04a397f1417bb2a5&"],"clkTrackerList":["https://g1.tagtic.cn/don/cl?encode_nyg=cmVxaWQ9djhFX0RvZ2JlaWh5UkVXREo3TzFzJmNvbz1mOGYyY2I3MGZhNzA0MDE1MGE2NDhjY2FhMmI2OGFiZDMzYTBkOGQyN2IwYWI1NWEwYTBlZGExMGQxZjgzOGEzJmRwaWQ9ZjhmMmNiNzBmYTcwNDAxNTBhNjQ4Y2NhYTJiNjhhYmQzM2EwZDhkMjdiMGFiNTVhMGEwZWRhMTBkMWY4MzhhMyZvcz0zJnJlZj1odHRwcyUzQSUyRiUyRmJicy5uZ2EuY24lMkYmYWR2ZXJ1c2VyaWQ9OTAzJm9yZGVyaWQ9MjczNDcmYWlkPTE2MDQ5JnByb3ZpbmNlSWQ9OCZwYXltZW50PWNwdCZhZF9mcm9tPTAmbWlkPTE2MDQ5MSZncm91cF9pZD0xNjA0OTEmcG9zaXRpb249MTcwNCZ3PTUyMyZoPTE1MCZjb3N0PTAmY29lZmZpY2llbnQ9MSZzbG90QmluZGluZz1zaW5nbGUmY29tcGFyZV9idWNrZXRfaWQ9YSZ0cmFmZmljX2J1Y2tldF9pZD1wMzUyODImaXNVbmlvbj0x&v_y=4d531c56730e72b08131e370fd605c8d6fe67916010e377a04a397f1417bb2a5"]}];

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