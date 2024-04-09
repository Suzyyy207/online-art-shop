const fileInput = document.getElementById('fileInput');
const previewImage = document.getElementById('previewImage');

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      previewImage.src = reader.result;
    });
    reader.readAsDataURL(file);
    console.log("upload");
  }
  else{
    previewImage.src = '';
  }
  detectFormat(0);
});
