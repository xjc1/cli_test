<template>
  <div>
    <input @input="inputNum" />
    <input
      ref="fileinput"
      type="file"
      id="upload"
      @change="changeFile"
      accept="image/*"
    /><button @click="clean">clean</button>
    <p>配置大小: {{ configNum * 1024 }}</p>
    <p>实际大小: {{ compressNum }}</p>
    <p></p>
    <h3>结果图片：</h3>
    <img id="preview" />
    <h3>原始图像：</h3>
    <img id="originPreview" />
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { compressAccurately } from './FIleMethods';

const configNum = ref(0);
const compressNum = ref(0);
const fileinput = ref(null)

function clean() {
  fileinput.value.value = '';
}

function inputNum({ target }) {
  configNum.value = Number(target.value);
  console.info(configNum.value);
}

async function changeFile({ target }) {
  var file = target.files[0];
  setOriginImg(file)
  console.log('file', file.size);
  if (file) {
    const compressFile = await compressAccurately(file, {
      size: configNum.value,
    });
    compressNum.value = compressFile.size;
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById('preview').setAttribute('src', e.target.result);
    };
    reader.readAsDataURL(compressFile);
  }
}

function setOriginImg(file){
  var reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById('originPreview').setAttribute('src', e.target.result);
  };
  reader.readAsDataURL(file)
}
</script>
<script>
export default {
  name:'CompressFile'
}
</script>

<style scoped lang="scss"></style>
