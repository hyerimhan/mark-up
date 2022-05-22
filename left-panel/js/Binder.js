(function ($) {
  $.fn.BindAreaDataToJson = function (mapData, prefix, cmpKey) {
    var obj;  
    var key;
    var result = {};
    var thisId = $(this).attr('id');
    $.each(mapData, function (k, v) {
      obj = $("#" + thisId + " #" + prefix + v[cmpKey]);
      key = v[cmpKey];
      if (obj.length) {
        if (obj.get(0).tagName === 'INPUT') {

          if (obj.val().length) {
            if (obj.val() == "on")
              fvalue = true;
            else if (obj.val() == "off")
              fvalue = false;
            else
              fvalue = obj.val();

            result[key] = fvalue;
          }
        }
      }
    });
    return result;
  }
})(jQuery);

(function ($) {
  $.fn.BindJsonToAreaData = function (fieldData, prefix) {
    var obj;
    var thisId = $(this).attr('id');
    for (key in fieldData) {
      obj = $("#" + thisId + " #" + prefix + key);
      if (obj.length) {
        if (obj.get(0).tagName === 'INPUT') {
          obj.val(fieldData[key]);
        } else {
          if (fieldData[key] === null)
            obj.text('');
          else
            obj.text(fieldData[key]);
        };
      };
    };
  }
})(jQuery);

(function ($) {
  $.fn.ClearAreaDataByMap = function (mapData, prefix, cmpKey) {
    var obj;
    var thisId = $(this).attr('id');
    $.each(mapData, function (k, v) {
      obj = $("#" + thisId + " #" + prefix + v[cmpKey]);
      if (obj.length) {
        if (obj.get(0).tagName === 'INPUT') {
          obj.val('');
        } else {
          obj.text('');
        };
      };
    });

  }
})(jQuery);

(function ($) {
  $.fn.ValidateAreaDataByMap = function (mapData, prefix, cmpKey) {
    var obj;
    var val;
    var cmpval01;
    var cmpval02;
    var cmpval03;
    var cmpval04;
    var cmpval05;
    var result = {};
    result['success'] = true;
    var thisId = $(this).attr('id');
    var result = true;

    $.each(mapData, function (k, v) {
      if (result) {
        obj = $("#" + thisId + " #" + prefix + v[cmpKey]);

        if (obj.length) {
          if (obj.get(0).tagName === 'INPUT') {
            val = obj.val();
          } else {
            val = obj.text();
          };
          cmpval01 = v['required'];
          if (cmpval01) {
            if (val === null || val.length === 0) {
              alert("[" + v['colname'] + "]을 선택(입력)해주세요.");
              obj.focus();
              result = false;
            }
            cmpval02 = v['minlen'];
            if (cmpval02) {
              if (val.length < cmpval02) {
                alert("[" + v['colname'] + "]은 " + cmpval02 + "자리 이상이어야 합니다");
                obj.focus();
                result = false;
              }
            }
          }

          cmpval02 = v['minlen'];
          if (cmpval02) {
            if (val.length > 0) {
              if (val.length < cmpval02) {
                alert("[" + v['colname'] + "]은 " + cmpval02 + "자리 이상이어야 합니다");
                obj.focus();
                result = false;
              }
            }
          }

          cmpval03 = v['strlen'];
          if (cmpval03) {
            if (val.length > 0) {
              if (val.length > cmpval03) {
                alert("[" + v['colname'] + "]은 " + cmpval03 + "자리 이하이어야 합니다");
                obj.focus();
                result = false;
              }

            }
          }

        }
      };
    });

    return result;
  }
})(jQuery);

(function ($) {
  $.fn.serializeJson = function (prefix) {
    var arr = this.serializeArray();
    var result = {};
    var fvalue;
    if (arr) {
      jQuery.each(arr, function () {
        if (this.name.substring(0, prefix.length) === prefix) {
          if (this.value == "on")
            fvalue = true;
          else if (this.value == "off")
            fvalue = false;
          else
            fvalue = this.value;
          result[this.name.replace(prefix, "")] = fvalue;
        }
      });
    }
    return result;
  };
})(jQuery);
