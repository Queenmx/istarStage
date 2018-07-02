var strategys = {
  isNotEmpty: function(val, errorMes) {
    if (!val && val !== 0) {
      return errorMes;
    }
  },
  minLength: function(val, length, errorMes) {
    if (val.length < length) {
      return errorMes;
    }
  },
  phone: function(val, errorMes) {
    if (!/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(val)) {
      return errorMes;
    }
  },
  number: function(val, errorMes) {
    if (val === "" || val == null) {
      return errorMes;
    }
    if (!isNaN(val)) {
    } else {
      return errorMes;
    }
  }
};
export class Validate {
  constructor(list) {
    this.list = list;
    this.cache = [];
  }
  add(val, rules) {
    let self = this;
    for (let i = 0, len = rules.length; i < len; i++) {
      (function(rule) {
        let strategyArr = rule.strategy.split(":");
        let errorMes = rule.errorMes;
        self.cache.push(function() {
          let strategy = strategyArr.shift();
          strategyArr.unshift(val);
          strategyArr.push(errorMes);
          return strategys[strategy].apply(null, strategyArr);
        });
      })(rules[i]);
    }
  }
  start() {
    for (let i = 0, len = this.cache.length; i < len; i++) {
      let errorMsg = this.cache[i]();
      if (errorMsg) {
        return errorMsg;
      }
    }
  }
}
