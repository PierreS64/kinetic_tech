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
var fs_1 = require("fs");
var path_1 = require("path");
var crypto_1 = require("crypto");
var client_1 = require("@prisma/client");
var pg_1 = require("pg");
var adapter_pg_1 = require("@prisma/adapter-pg");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
var adapter = new adapter_pg_1.PrismaPg(pool);
var prisma = new client_1.PrismaClient({ adapter: adapter });
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var mockDataPath, mockDataContent, idRegex, match, productsToSeed, idMapping, categoryNames, categories, _i, categoryNames_1, name_1, cat, modifiedContent, replacedIds, oldId, newId, replaceRegex, appJsxPath, appJsxContent, appJsxModified, _a, _b, _c, oldId, newId, mockDataUrl, products, _d, products_1, product, catId, createdProduct, existingImage;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    mockDataPath = path_1.default.resolve(__dirname, '../../frontend/src/utils/mockData.js');
                    mockDataContent = fs_1.default.readFileSync(mockDataPath, 'utf-8');
                    idRegex = /id:\s*'([a-zA-Z0-9-]+)'/g;
                    productsToSeed = [];
                    idMapping = {};
                    categoryNames = ['laptop', 'điện thoại', 'gaming gear', 'linh kiện'];
                    categories = {};
                    _i = 0, categoryNames_1 = categoryNames;
                    _e.label = 1;
                case 1:
                    if (!(_i < categoryNames_1.length)) return [3 /*break*/, 6];
                    name_1 = categoryNames_1[_i];
                    return [4 /*yield*/, prisma.category.findFirst({ where: { name: name_1 } })];
                case 2:
                    cat = _e.sent();
                    if (!!cat) return [3 /*break*/, 4];
                    return [4 /*yield*/, prisma.category.create({ data: { name: name_1 } })];
                case 3:
                    cat = _e.sent();
                    _e.label = 4;
                case 4:
                    categories[name_1] = cat.id;
                    _e.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6:
                    console.log("Categories ready:", categories);
                    modifiedContent = mockDataContent;
                    replacedIds = new Set();
                    while ((match = idRegex.exec(mockDataContent)) !== null) {
                        oldId = match[1];
                        if (oldId.length < 30 && !replacedIds.has(oldId)) {
                            newId = crypto_1.default.randomUUID();
                            idMapping[oldId] = newId;
                            replaceRegex = new RegExp("id:\\s*'".concat(oldId, "'"), 'g');
                            modifiedContent = modifiedContent.replace(replaceRegex, "id: '".concat(newId, "'"));
                            replacedIds.add(oldId);
                        }
                    }
                    fs_1.default.writeFileSync(mockDataPath, modifiedContent, 'utf-8');
                    console.log('Updated mockData.js with UUIDs.');
                    appJsxPath = path_1.default.resolve(__dirname, '../../frontend/src/App.jsx');
                    appJsxContent = fs_1.default.readFileSync(appJsxPath, 'utf-8');
                    appJsxModified = false;
                    for (_a = 0, _b = Object.entries(idMapping); _a < _b.length; _a++) {
                        _c = _b[_a], oldId = _c[0], newId = _c[1];
                        if (appJsxContent.includes("'".concat(oldId, "'"))) {
                            appJsxContent = appJsxContent.replaceAll("'".concat(oldId, "'"), "'".concat(newId, "'"));
                            appJsxModified = true;
                        }
                    }
                    if (appJsxModified) {
                        fs_1.default.writeFileSync(appJsxPath, appJsxContent, 'utf-8');
                        console.log('Updated App.jsx with UUIDs.');
                    }
                    mockDataUrl = 'file://' + mockDataPath.replace(/\\/g, '/');
                    return [4 /*yield*/, Promise.resolve("".concat(mockDataUrl)).then(function (s) { return require(s); })];
                case 7:
                    products = (_e.sent()).products;
                    _d = 0, products_1 = products;
                    _e.label = 8;
                case 8:
                    if (!(_d < products_1.length)) return [3 /*break*/, 14];
                    product = products_1[_d];
                    catId = categories[product.category];
                    if (!catId) {
                        catId = Object.values(categories)[0];
                    }
                    console.log("Seeding Product: ".concat(product.name, " (").concat(product.id, ")"));
                    return [4 /*yield*/, prisma.product.upsert({
                            where: { id: product.id },
                            update: {
                                name: product.name,
                                categoryId: catId,
                                brand: product.brand || 'Unknown',
                                description: product.description || product.name,
                            },
                            create: {
                                id: product.id,
                                name: product.name,
                                categoryId: catId,
                                brand: product.brand || 'Unknown',
                                description: product.description || product.name,
                            }
                        })];
                case 9:
                    createdProduct = _e.sent();
                    return [4 /*yield*/, prisma.productVariant.upsert({
                            where: { id: product.id },
                            update: {
                                price: product.price,
                                stockQuantity: 100,
                            },
                            create: {
                                id: product.id,
                                productId: createdProduct.id,
                                price: product.price,
                                stockQuantity: 100,
                            }
                        })];
                case 10:
                    _e.sent();
                    return [4 /*yield*/, prisma.productImage.findFirst({
                            where: { productId: createdProduct.id, isThumbnail: true }
                        })];
                case 11:
                    existingImage = _e.sent();
                    if (!!existingImage) return [3 /*break*/, 13];
                    return [4 /*yield*/, prisma.productImage.create({
                            data: {
                                productId: createdProduct.id,
                                imageUrl: product.image,
                                isThumbnail: true
                            }
                        })];
                case 12:
                    _e.sent();
                    _e.label = 13;
                case 13:
                    _d++;
                    return [3 /*break*/, 8];
                case 14:
                    console.log('Database seeded successfully with ' + products.length + ' products.');
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(function (e) {
    console.error(e);
    process.exit(1);
}).finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
