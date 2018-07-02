class Map {
  constructor(map) {
    this.map = map;
    this.point = {};
    this.geoc = "";
    this.address = "";
    // this.init();
  }
  init(address, fn, fn2) {
    this._initMap(fn, fn2);
  }
  onlyGetAddress(fn) {
    var geolocation = new BMap.Geolocation();
    var self = this;
    geolocation.getCurrentPosition(
      function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          self.point = r.point;
          self.getAddress(fn);
        } else {
          fn2 && fn2(this.getStatus());
        }
      },
      { enableHighAccuracy: true }
    );
  }
  _initMap(fn, fn2) {
    // 百度地图API功能
    // 创建Map实例
    var map = this.map;
    var self = this;
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 16); // 初始化地图,设置中心点坐标和地图级别

    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(
      function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          var mk = new BMap.Marker(r.point);
          map.addOverlay(mk);
          map.panTo(r.point);
          self.point = r.point;
          self.getAddress(fn);
        } else {
          fn2 && fn2(this.getStatus());
        }
      },
      { enableHighAccuracy: true }
    );
    // this.map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
    this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
  }
  getPoint() {
    return this.point;
  }
  initEvent(fn, fn2) {
    //单击获取点击的经纬度
    var map = this.map;
    map.addEventListener("click", e => {
      map.clearOverlays();
      map.addOverlay(new BMap.Marker(e.point));
      //   this.map.centerAndZoom(new BMap.Point(e.point.lng, e.point.lat), 16);
      this.point = e.point;
      this.getAddress(fn, fn2);
    });
  }
  getDistance(conf) {
    console.log(conf.point);
    if (!conf.start) {
      conf.start = this.point;
    }
    if (!this.geoc) {
      this.geoc = new BMap.Geocoder();
    } // 将地址解析结果显示在地图上,并调整地图视野
    let myGeo = this.geoc;
    let map = this.map;
    // point = new BMap.Point(point.lng, point.lat);
    return map.getDistance(conf.start, conf.point);
  }
  getPosition() {}
  getAddress(fn, fn2) {
    if (!this.geoc) {
      this.geoc = new BMap.Geocoder();
    }
    var geoc = this.geoc;
    var pt = this.point;
    var self = this;
    geoc.getLocation(pt, function(rs) {
      if (rs) {
        var addComp = rs.addressComponents;
        self.address = addComp;
        fn && fn(self.address);
        return (
          addComp.province +
          addComp.city +
          addComp.district +
          addComp.street +
          addComp.streetNumber
        );
      } else {
        fn2 && fn2("解析不成功");
      }
    });
  }
  addPoint(point) {
    let map = this.map;
    point = new BMap.Point(point.lng, point.lat);
    map.addOverlay(new BMap.Marker(point));
    map.panTo(point);
  }
  search(address, fn, fn2) {
    if (!this.geoc) {
      this.geoc = new BMap.Geocoder();
    }
    var myGeo = this.geoc;
    var map = this.map;
    var city = this.address.city;
    var self = this;
    // 将地址解析结果显示在地图上,并调整地图视野
    myGeo.getPoint(
      address,
      function(point) {
        if (point) {
          self.point = point;
          map.centerAndZoom(point, 16);
          map.addOverlay(new BMap.Marker(point));
          self.getAddress(fn);
        } else {
          fn2 && fn2("解析失败");
        }
      },
      city
    );
  }
  autoComplete(id, fn) {
    var myValue;
    var map = this.map;
    var ac = new BMap.Autocomplete({
      //建立一个自动完成的对象
      input: id,
      location: map
    });
    if (!this.geoc) {
    }
    var geoc = this.geoc;
    var self = this;
    function setPlace() {
      map.clearOverlays(); //清除地图上所有覆盖物
      function myFun() {
        var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
        self.point = pp;
        map.centerAndZoom(pp, 18);
        map.addOverlay(new BMap.Marker(pp)); //添加标注
        self.getAddress(fn);
      }
      var local = new BMap.LocalSearch(map, {
        //智能搜索
        onSearchComplete: myFun
      });
      local.search(myValue);
    }
    ac.addEventListener("onhighlight", function(e) {
      //鼠标放在下拉列表上的事件
      var str = "";
      var _value = e.fromitem.value;
      var value = "";
      if (e.fromitem.index > -1) {
        value =
          _value.province +
          _value.city +
          _value.district +
          _value.street +
          _value.business;
      }
      str =
        "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

      value = "";
      if (e.toitem.index > -1) {
        _value = e.toitem.value;
        value =
          _value.province +
          _value.city +
          _value.district +
          _value.street +
          _value.business;
      }
      str +=
        "<br />ToItem<br />index = " +
        e.toitem.index +
        "<br />value = " +
        value;
      G("searchResultPanel").innerHTML = str;
    });

    var myValue;
    ac.addEventListener("onconfirm", function(e) {
      //鼠标点击下拉列表后的事件
      var _value = e.item.value;
      myValue =
        _value.province +
        _value.city +
        _value.district +
        _value.street +
        _value.business;
      G("searchResultPanel").innerHTML =
        "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
      setPlace();
    });
  }
}
function G(id) {
  return document.getElementById(id);
}
export { Map };
