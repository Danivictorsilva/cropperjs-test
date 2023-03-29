$(document).ready(function () {
    const inputElement = $('#input');
    const outputElement = $('#output');
    const finalElement = $('#final');
    const btnDoneElement = $('#done');
    const btnRetryElement = $('#retry');
    
    inputElement.filepond();

    $.fn.filepond.setDefaults({
      acceptedFileTypes: ['image/*'],
      onpreparefile: onPrepareFile,
      onremovefile: onRemoveFile,

    });

    function onPrepareFile(file, output) {
      outputElement
        .attr('src', URL.createObjectURL(output))
        .show()
        .cropper();
      btnDoneElement.show();
      btnRetryElement.show();
    }
    function onRemoveFile() {
      btnDoneElement.hide();
      btnRetryElement.hide();
      finalElement.hide();
      outputElement.hide().cropper('destroy');
    }

    btnRetryElement.click(() => inputElement.filepond('removeFile'));
    
    btnDoneElement.click(() => {
      outputElement.cropper('getCroppedCanvas').toBlob((blob) => {
        outputElement.hide().cropper('destroy');
        finalElement.attr('src', URL.createObjectURL(blob)).show();
      })
    });
  });