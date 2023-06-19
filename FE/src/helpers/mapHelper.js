function camelToSnake(str) {
  return str.replace(/[A-Z]/g, (letter) => {
    return `_${letter.toLowerCase()}`;
  });
}

function snakeToCamel(str) {
  return str.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
}

export const convertObjectToSnakeCase = (obj) => {
  if (typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(convertObjectToSnakeCase);
  }

  return Object.keys(obj).reduce((acc, key) => {
    return {
      ...acc,
      [camelToSnake(key)]: convertObjectToSnakeCase(obj[key]),
    };
  }, {});
};

export const convertObjectToCamelCase = (obj) => {
  if (typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(convertObjectToCamelCase);
  }

  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  return Object.keys(obj).reduce((acc, key) => {
    return {
      ...acc,
      [snakeToCamel(key)]: convertObjectToCamelCase(obj[key]),
    };
  }, {});
};

// FOR TEST!

// const objectFirst = {
//   category_id: "a743d6a2-4a9b-45f7-a716-1c9b7f05693a",
//   ctime: null,
//   description:
//     "Футболка - универсальная одежда для повседневной носки. Изготовлена из высококачественного материала, обеспечивающего комфорт и свободу движений.",
//   discount: 10,
// };

// // const snake = convertObjectToSnakeCase(camelObj);
// const camelObject = convertObjectToCamelCase(objectFirst);
