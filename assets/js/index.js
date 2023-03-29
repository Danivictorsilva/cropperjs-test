$(document).ready(function () {
    const inputElement = $("#input");
    const outputElement = $("#output");
    const finalElement = $("#final");
    const btnDoneElement = $("#done");
    const btnRetryElement = $("#retry");

    function onPrepareFile(file, output) {
      outputElement
        .attr("src", URL.createObjectURL(output))
        .show()
        .cropper();
      btnDoneElement.show();
      btnRetryElement.show();
    }
    function onRemoveFile() {
      btnDoneElement.hide();
      btnRetryElement.hide();
      finalElement.hide();
      outputElement.hide().cropper("destroy");
    }

    $.fn.filepond.registerPlugin(
      // FilePondPluginImagePreview,
      FilePondPluginFileValidateSize,
      FilePondPluginFileValidateType,
      // FilePondPluginImageExifOrientation,
      FilePondPluginImageTransform
      // FilePondPluginImageCrop,
      // FilePondPluginImageResize,
      // FilePondPluginFileMetadata,
    );

    $.fn.filepond.setDefaults({
      maxFileSize: "5MB",
      acceptedFileTypes: ["image/*"],
      onpreparefile: onPrepareFile,
      onremovefile: onRemoveFile,
      // imagePreviewHeight: "423", // 2480 x 3508
      // imageResizeTargetWidth: 2480,
      // imageResizeTargetHeight: 3508,

      // imageCropAspectRatio: '1:1',
      // imageResizeTargetWidth: 384,

      // imageResizeMode: 'cover',
      // imageResizeTargetHeight: 2480,
      // imageResizeTargetWidth: 3508,
      // imageResizeUpscale: false,
    });

    inputElement.filepond();

    btnRetryElement.click(() => inputElement.filepond("removeFile"));
    btnDoneElement.click(() => {
      outputElement.cropper("getCroppedCanvas").toBlob((blob) => {
        outputElement.hide().cropper("destroy");
        finalElement.attr("src", URL.createObjectURL(blob)).show();
      })
    });
  });