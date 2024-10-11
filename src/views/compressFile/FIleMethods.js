function checkImageType(type) {
  return ['image/png', 'image/jpeg', 'image/gif'].some((i) => i === type);
}

/**
 * 将File（Blob）对象转变为一个dataURL字符串
 *
 * @param {Blob} file
 * @returns {Promise(string)} Promise含有一个dataURL字符串参数
 */
const filetoDataURL = function (file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
};

/**
 * 将一个dataURL字符串转变为一个File（Blob）对象
 * 转变时可以确定File对象的类型
 *
 * @param {string} dataURL
 * @param {string=} type - 确定转换后的图片类型，选项有 "image/png", "image/jpeg", "image/gif"
 * @returns {Promise(Blob)}
 */
const dataURLtoFile = async function (dataURL, type) {
  const arr = dataURL.split(',');
  let mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  if (checkImageType(type)) {
    mime = type;
  }
  return new Blob([u8arr], {
    type: mime,
  });
};

/**
 * 将dataURL字符串转变为image对象
 *
 * @param {srting} dataURL - dataURL字符串
 * @returns {Promise(Image)}
 */
const dataURLtoImage = function (dataURL) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('dataURLtoImage(): dataURL is illegal'));
    img.src = dataURL;
  });
};

/**
 * 将一个image对象转变为一个canvas对象
 *
 * @param {image} image
 *
 * @typedef {Object=} config - 转变为canvas时的一些参数配置
 *        @param {number} width - canvas图像的宽度，默认为image的宽度
 *        @param {number} height - canvas图像的高度，默认为image的高度
 *        @param {number} scale - 相对于image的缩放比例，范围0-10，默认不缩放；
 *            设置config.scale后会覆盖config.width和config.height的设置；
 *        @param {number} orientation - 图片旋转参数，默认不旋转，参考如下：
 *            参数   旋转方向
 *            1       0°
 *            2       水平翻转
 *            3       180°
 *            4       垂直翻转
 *            5       顺时针90°+水平翻转
 *            6       顺时针90°
 *            7       顺时针90°+垂直翻转
 *            8       逆时针90°
 * @type {config}
 *
 * @returns {Promise(canvas)}
 */
const imagetoCanvas = async function (image, config = {}) {
  const cvs = document.createElement('canvas');
  const ctx = cvs.getContext('2d');
  let height;
  let width;
  // 设置宽高
  for (const i in config) {
    if (Object.prototype.hasOwnProperty.call(config, i)) {
      config[i] = Number(config[i]);
    }
  }
  if (!config.scale) {
    width = config.width
      || (config.height * image.width) / image.height
      || image.width;
    height = config.height
      || (config.width * image.height) / image.width
      || image.height;
  } else {
    // 缩放比例0-10，不在此范围则保持原来图像大小
    const scale = config.scale > 0 && config.scale < 10 ? config.scale : 1;
    width = image.width * scale;
    height = image.height * scale;
  }
  // 当顺时针或者逆时针旋转90时，需要交换canvas的宽高
  if ([5, 6, 7, 8].some((i) => i === config.orientation)) {
    cvs.height = width;
    cvs.width = height;
  } else {
    cvs.height = height;
    cvs.width = width;
  }
  // 设置方向
  switch (config.orientation) {
    case 3:
      ctx.rotate((180 * Math.PI) / 180);
      ctx.drawImage(image, -cvs.width, -cvs.height, cvs.width, cvs.height);
      break;
    case 6:
      ctx.rotate((90 * Math.PI) / 180);
      ctx.drawImage(image, 0, -cvs.width, cvs.height, cvs.width);
      break;
    case 8:
      ctx.rotate((270 * Math.PI) / 180);
      ctx.drawImage(image, -cvs.height, 0, cvs.height, cvs.width);
      break;

    case 2:
      ctx.translate(cvs.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(image, 0, 0, cvs.width, cvs.height);
      break;
    case 4:
      ctx.translate(cvs.width, 0);
      ctx.scale(-1, 1);
      ctx.rotate((180 * Math.PI) / 180);
      ctx.drawImage(image, -cvs.width, -cvs.height, cvs.width, cvs.height);
      break;
    case 5:
      ctx.translate(cvs.width, 0);
      ctx.scale(-1, 1);
      ctx.rotate((90 * Math.PI) / 180);
      ctx.drawImage(image, 0, -cvs.width, cvs.height, cvs.width);
      break;
    case 7:
      ctx.translate(cvs.width, 0);
      ctx.scale(-1, 1);
      ctx.rotate((270 * Math.PI) / 180);
      ctx.drawImage(image, -cvs.height, 0, cvs.height, cvs.width);
      break;
    default:
      ctx.drawImage(image, 0, 0, cvs.width, cvs.height);
  }
  return cvs;
};

/**
 * 将一个Canvas对象转变为一个dataURL字符串
 * 该方法可以做压缩处理
 *
 * @param {canvas} canvas
 * @param {number=} quality - 传入范围 0-1，表示图片压缩质量，默认0.92
 * @param {string=} type - 确定转换后的图片类型，选项有 "image/png", "image/jpeg", "image/gif",默认"image/jpeg"
 * @returns {Promise(string)} Promise含有一个dataURL字符串参数
 */
const canvastoDataURL = async function (canvas, quality, type) {
  if (!checkImageType(type)) {
    type = 'image/jpeg';
  }
  return canvas.toDataURL(type, quality);
};

// 计算压缩率
function calculateCompressionRate(originalSize, compressedSize) {
  if (originalSize === 0) {
    return 0;
  }
  return ((originalSize - compressedSize) / originalSize).toFixed(2);
}

const compressAccurately = async function (file, config = {}) {
  if (!(file instanceof Blob)) {
    throw new Error(
      'compressAccurately(): First arg must be a Blob object or a File object.',
    );
  }
  if (typeof config !== 'object') {
    config = { size: config };
  }
  // 如果指定体积不是数字或者数字字符串，则不做处理
  config.size = Number(config.size);
  if (Number.isNaN(config.size)) {
    return file;
  }
  // 如果指定体积大于原文件体积，则不做处理；
  if (config.size * 1024 > file.size) {
    return file;
  }
  config.accuracy = Number(config.accuracy);
  if (!config.accuracy || config.accuracy < 0.8 || config.accuracy > 0.99) {
    config.accuracy = 0.95; // 默认精度0.95
  }
  const resultSize = {
    max: config.size * (2 - config.accuracy) * 1024,
    accurate: config.size * 1024,
    min: config.size * config.accuracy * 1024,
  };
  const dataURL = await filetoDataURL(file);
  let originalMime = dataURL.split(',')[0].match(/:(.*?);/)[1]; // 原始图像图片类型
  let mime = 'image/jpeg';
  if (checkImageType(config.type)) {
    mime = config.type;
    originalMime = config.type;
  }
  const originalSize = file.size;
  console.log('原始图像尺寸：', originalSize); // 原始图像尺寸
  console.log('目标尺寸：', config.size * 1024);
  console.log('目标尺寸max：', resultSize.max);
  console.log('目标尺寸min：', resultSize.min);
  const image = await dataURLtoImage(dataURL);
  const canvas = await imagetoCanvas(image, { ...config });
  /**
   * 经过测试发现，blob.size与dataURL.length的比值约等于0.75
   * 这个比值可以同过dataURLtoFile这个方法来测试验证
   * 这里为了提高性能，直接通过这个比值来计算出blob.size
   */
  const proportion = 0.75;
  let compressDataURL;
  const tempDataURLs = [null, null];
  /** *
   *    根据压缩率获取压缩质量参数的初始值，压缩率大于70% 则质量参数为0.3，小于30% 则质量参数为0.7 否则为0.5
   *    然后通过迭代逼近算法来获取最精确的压缩质量参数
   *    迭代逼近算法思想：
   *    通过递减调整幅度逐步优化图片压缩质量。初期通过适当幅度调整，
   *    快速降低图片体积；随着调整的深入，逐步减少调整幅度，防止过度压缩造成的质量损失。
   *    通过逐步微调，逐步逼近最优解，但避免剧烈变化，防止错过最优解
   *    这种渐进式调整策略既能保持图片的清晰度，又能有效压缩文件大小，提高压缩效率
   *    算法流程：
   *    quality表示压缩质量值，lastQuality表示上一次压缩质量值，x表示迭代次数，
   *    0.5 ** (x + 1) 是调整幅度
   *    ±表示根据压缩情况上下调整quality值
   *    quality = lastQuality±0.5 ** (x + 1)
   */
  const imageQualityBlocks = [0.3, 0.5, 0.7];
  const compressionRate = calculateCompressionRate(originalSize, config.size * 1024);
  let imageQuality = (function () {
    if (compressionRate >= imageQualityBlocks[2]) {
      return imageQualityBlocks[0];
    }
    if (compressionRate <= imageQualityBlocks[0]) {
      return imageQualityBlocks[2];
    }
    return imageQualityBlocks[1];
  }());
  /**
   * HTMLCanvasElement.toBlob()以及HTMLCanvasElement.toDataURL()压缩参数
   * 的最小细粒度为0.01，而2的7次方为128，即只要循环7次，则会覆盖所有可能性
   */
  for (let x = 2; x <= 7; x++) {
    console.group();
    console.log('循环次数：', x - 1);
    console.log('当前图片质量', imageQuality);
    compressDataURL = await canvastoDataURL(canvas, imageQuality, mime);
    const CalculationSize = compressDataURL.length * proportion;
    console.log('当前图片尺寸', CalculationSize);
    // eslint-disable-next-line no-mixed-operators
    console.log('当前压缩率', ((originalSize - CalculationSize) / originalSize * 100).toFixed(2));
    console.log('与目标体积偏差', CalculationSize / (config.size * 1024) - 1);
    console.groupEnd();
    // 如果到循环第七次还没有达到精确度的值，那说明该图片不能达到到此精确度要求
    // 这时候最后一次循环出来的dataURL可能不是最精确的，需要取其周边两个dataURL三者比较来选出最精确的；
    if (x === 7) {
      if (
        resultSize.max < CalculationSize
        || resultSize.min > CalculationSize
      ) {
        compressDataURL = [compressDataURL, ...tempDataURLs]
          .filter((i) => i) // 去除null
          .sort(
            (a, b) => Math.abs(a.length * proportion - resultSize.accurate)
              - Math.abs(b.length * proportion - resultSize.accurate),
          )[0];
      }
      break;
    }
    if (resultSize.max < CalculationSize) {
      tempDataURLs[1] = compressDataURL;
      imageQuality -= 0.5 ** (x + 1);
    } else if (resultSize.min > CalculationSize) {
      tempDataURLs[0] = compressDataURL;
      imageQuality += 0.5 ** (x + 1);
    } else {
      break;
    }
  }
  const compressFile = await dataURLtoFile(compressDataURL, originalMime);
  console.log('最终图片大小：', compressFile.size, imageQuality);
  // 如果压缩后体积大于原文件体积，则返回源文件；
  if (compressFile.size > file.size) {
    return file;
  }
  return compressFile;
};

export { compressAccurately };
