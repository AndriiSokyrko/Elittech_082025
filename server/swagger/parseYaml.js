const yaml = require("js-yaml");
const fs = require("fs");

try {
    const file = fs.readFileSync("swaggerCompany.yaml", "utf8");
    const data = yaml.load(file);
    console.log("Парсинг успешен:", data);
} catch (error) {
    console.error("Ошибка YAML:", error.message);
}