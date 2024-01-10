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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var _this = this;
var get_img = function () { return __awaiter(_this, void 0, void 0, function () {
    var API_KEY, apiUrl, options, response, result, image_url, resultList, image_1, image_2, image_3, card, div, image1Container, card_2, div_2, image2Container, card_3, div_3, image3Container, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log("inside omdb3");
                API_KEY = '8b701ace30227088c2f1ef89b747c764';
                apiUrl = "https://api.themoviedb.org/3/movie/popular?api_key=".concat(API_KEY);
                options = {
                    method: 'GET',
                    headers: {
                        'Authorization': API_KEY,
                        'accept': 'application/json',
                    },
                };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch(apiUrl, options)];
            case 2:
                response = _b.sent();
                return [4 /*yield*/, response.json()];
            case 3:
                result = _b.sent();
                image_url = "https://image.tmdb.org/t/p/original";
                resultList = result.results;
                console.log(resultList);
                image_1 = image_url + resultList[1].poster_path;
                image_2 = image_url + resultList[10].poster_path;
                image_3 = image_url + resultList[7].poster_path;
                card = "<img src=\"".concat(image_1, "\" alt=\"\">");
                div = document.createElement('div');
                div.setAttribute("class", "card");
                div.innerHTML = card;
                image1Container = document.getElementById("image_1");
                if (image1Container)
                    image1Container.append(div);
                card_2 = "<img src=\"".concat(image_2, "\" alt=\"\">");
                div_2 = document.createElement('div');
                div_2.setAttribute("class", "card_2");
                div_2.innerHTML = card_2;
                image2Container = (_a = document.getElementById("image_2")) !== null && _a !== void 0 ? _a : document.createElement('div');
                image2Container.append(div_2);
                card_3 = "<img src=\"".concat(image_3, "\" alt=\"\">");
                div_3 = document.createElement('div');
                div_3.setAttribute("class", "card_3");
                div_3.innerHTML = card_3;
                image3Container = document.getElementById("image_3");
                if (image3Container)
                    image3Container.append(div_3);
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                console.error("Error fetching data:", error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
get_img();
