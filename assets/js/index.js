$(document).ready(function () {
    const inputElement = $('#input');
    inputElement.filepond();
    const outputElement = $('#output');
    const finalElement = $('#final');
    const btnDoneElement = $('#done');
    const btnRetryElement = $('#retry');
    const btnDownloadElement = $('#download')
    
    $.fn.filepond.registerPlugin(
        FilePondPluginFileValidateSize,
        FilePondPluginFileValidateType,
        FilePondPluginImageTransform
    );

    $.fn.filepond.setDefaults({
        maxFileSize: '5MB',
        acceptedFileTypes: ['image/*'],
        onpreparefile: onPrepareFile,
        onremovefile: onRemoveFile,
    });

    function onPrepareFile(file, output) {
        outputElement
            .attr('src', URL.createObjectURL(output))
            .show()
            .cropper({
                aspectRatio: 1 / 1.41,

            });
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
        btnDoneElement.hide();
        btnDownloadElement.show();
    });

    btnDownloadElement.click(() => {

        
    });
});