"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var playwright_1 = require("playwright");
var solveCaptcha = function (siteKey, url, apiKey) { return __awaiter(void 0, void 0, void 0, function () {
    var response, requestId, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1.default.post('https://2captcha.com/in.php', null, {
                    params: {
                        key: apiKey,
                        method: 'userrecaptcha',
                        googlekey: siteKey,
                        pageurl: url,
                        json: 1,
                    },
                })];
            case 1:
                response = _a.sent();
                requestId = response.data.request;
                _a.label = 2;
            case 2:
                if (!true) return [3 /*break*/, 5];
                return [4 /*yield*/, axios_1.default.get('https://2captcha.com/res.php', {
                        params: {
                            key: apiKey,
                            action: 'get',
                            id: requestId,
                            json: 1,
                        },
                    })];
            case 3:
                result = _a.sent();
                if (result.data.status === 1) {
                    return [2 /*return*/, result.data.request];
                }
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 5000); })];
            case 4:
                _a.sent(); // Wait 5 seconds before retrying
                return [3 /*break*/, 2];
            case 5: return [2 /*return*/];
        }
    });
}); };
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var apiKey, siteKey, pageUrl, captchaSolution, browser, context, page;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                apiKey = '57f6e5ba1444ac766353eb0ca8644c90';
                siteKey = '6Le-wvkSAAAAAPBMRTvw0Q4Muexq9bi0DJwx_mJ-';
                pageUrl = 'https://google.com/recaptcha/api2/demo';
                return [4 /*yield*/, solveCaptcha(siteKey, pageUrl, apiKey)];
            case 1:
                captchaSolution = _a.sent();
                console.log('CAPTCHA solution:', captchaSolution);
                return [4 /*yield*/, playwright_1.chromium.launch({ headless: false })];
            case 2:
                browser = _a.sent();
                return [4 /*yield*/, browser.newContext()];
            case 3:
                context = _a.sent();
                return [4 /*yield*/, context.newPage()];
            case 4:
                page = _a.sent();
                return [4 /*yield*/, page.goto(pageUrl)];
            case 5:
                _a.sent();
                // Inject the CAPTCHA response
                return [4 /*yield*/, page.evaluate(function (response) {
                        document.getElementById('g-recaptcha-response').value = response;
                    }, captchaSolution)];
            case 6:
                // Inject the CAPTCHA response
                _a.sent();
                // Submit the form
                return [4 /*yield*/, page.click('#recaptcha-demo-submit')];
            case 7:
                // Submit the form
                _a.sent();
                console.log('CAPTCHA bypassed successfully');
                return [4 /*yield*/, browser.close()];
            case 8:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
