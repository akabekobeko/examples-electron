/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/common/Constants.ts":
/*!*********************************!*
  !*** ./src/common/Constants.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IPCKey = void 0;
/**
 * The key name that is the channel of the IPC message..
 */
var IPCKey;
(function (IPCKey) {
    IPCKey["SelectFolder"] = "SelectFolder";
    IPCKey["EnumItems"] = "EnumItems";
    IPCKey["OpenItem"] = "OpenItem";
})(IPCKey = exports.IPCKey || (exports.IPCKey = {}));


/***/ }),

/***/ "./src/common/Preload.ts":
/*!*******************************!*
  !*** ./src/common/Preload.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const electron_1 = __webpack_require__(/*! electron */ "electron");
const Constants_1 = __webpack_require__(/*! ./Constants */ "./src/common/Constants.ts");
electron_1.contextBridge.exposeInMainWorld('myAPI', {
    selectFolder: async () => await electron_1.ipcRenderer.invoke(Constants_1.IPCKey.SelectFolder),
    enumItems: async (folderPath) => await electron_1.ipcRenderer.invoke(Constants_1.IPCKey.EnumItems, folderPath),
    openItem: async (itemPath) => await electron_1.ipcRenderer.invoke(Constants_1.IPCKey.OpenItem, itemPath)
});


/***/ }),

/***/ "electron":
/*!***************************!*
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/common/Preload.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lbGVjdHJvbi1zaW1wbGUtZmlsZXIvLi9zcmMvY29tbW9uL0NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9lbGVjdHJvbi1zaW1wbGUtZmlsZXIvLi9zcmMvY29tbW9uL1ByZWxvYWQudHMiLCJ3ZWJwYWNrOi8vZWxlY3Ryb24tc2ltcGxlLWZpbGVyL2V4dGVybmFsIFwiZWxlY3Ryb25cIiIsIndlYnBhY2s6Ly9lbGVjdHJvbi1zaW1wbGUtZmlsZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZWxlY3Ryb24tc2ltcGxlLWZpbGVyL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDhCQUE4QixjQUFjLEtBQUs7Ozs7Ozs7Ozs7O0FDWHJDO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELG1CQUFtQixtQkFBTyxDQUFDLDBCQUFVO0FBQ3JDLG9CQUFvQixtQkFBTyxDQUFDLDhDQUFhO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7QUNSRCxzQzs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7OztVQ3JCQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJwcmVsb2FkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLklQQ0tleSA9IHZvaWQgMDtcbi8qKlxuICogVGhlIGtleSBuYW1lIHRoYXQgaXMgdGhlIGNoYW5uZWwgb2YgdGhlIElQQyBtZXNzYWdlLi5cbiAqL1xudmFyIElQQ0tleTtcbihmdW5jdGlvbiAoSVBDS2V5KSB7XG4gICAgSVBDS2V5W1wiU2VsZWN0Rm9sZGVyXCJdID0gXCJTZWxlY3RGb2xkZXJcIjtcbiAgICBJUENLZXlbXCJFbnVtSXRlbXNcIl0gPSBcIkVudW1JdGVtc1wiO1xuICAgIElQQ0tleVtcIk9wZW5JdGVtXCJdID0gXCJPcGVuSXRlbVwiO1xufSkoSVBDS2V5ID0gZXhwb3J0cy5JUENLZXkgfHwgKGV4cG9ydHMuSVBDS2V5ID0ge30pKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZWxlY3Ryb25fMSA9IHJlcXVpcmUoXCJlbGVjdHJvblwiKTtcbmNvbnN0IENvbnN0YW50c18xID0gcmVxdWlyZShcIi4vQ29uc3RhbnRzXCIpO1xuZWxlY3Ryb25fMS5jb250ZXh0QnJpZGdlLmV4cG9zZUluTWFpbldvcmxkKCdteUFQSScsIHtcbiAgICBzZWxlY3RGb2xkZXI6IGFzeW5jICgpID0+IGF3YWl0IGVsZWN0cm9uXzEuaXBjUmVuZGVyZXIuaW52b2tlKENvbnN0YW50c18xLklQQ0tleS5TZWxlY3RGb2xkZXIpLFxuICAgIGVudW1JdGVtczogYXN5bmMgKGZvbGRlclBhdGgpID0+IGF3YWl0IGVsZWN0cm9uXzEuaXBjUmVuZGVyZXIuaW52b2tlKENvbnN0YW50c18xLklQQ0tleS5FbnVtSXRlbXMsIGZvbGRlclBhdGgpLFxuICAgIG9wZW5JdGVtOiBhc3luYyAoaXRlbVBhdGgpID0+IGF3YWl0IGVsZWN0cm9uXzEuaXBjUmVuZGVyZXIuaW52b2tlKENvbnN0YW50c18xLklQQ0tleS5PcGVuSXRlbSwgaXRlbVBhdGgpXG59KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsZWN0cm9uXCIpOzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvY29tbW9uL1ByZWxvYWQudHNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9