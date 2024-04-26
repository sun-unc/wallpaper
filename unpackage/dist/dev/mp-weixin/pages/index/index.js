"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  return {
    a: common_vendor.f(3, (item, index, i0) => {
      return {
        a: index
      };
    }),
    b: common_assets._imports_0,
    c: common_assets._imports_1,
    d: common_assets._imports_2
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"], ["__file", "/Users/sun/Code/Uniapp/wallpaper/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
