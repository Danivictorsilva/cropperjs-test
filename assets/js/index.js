$(document).ready(function () {
    const inputElement = $('#input');
    const outputElement = $('#output');
    const croppedElement = $('#final');
    const btnDoneElement = $('#done');
    const btnRetryElement = $('#retry');
    const btnDownloadElement = $('#download')
    const imgLink = $('a')
    const a4AspectRatio = 1.41

    inputElement.filepond();

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
                aspectRatio: 1 / a4AspectRatio,
            });
        btnDoneElement.show();
        btnRetryElement.show();
    }

    function onRemoveFile() {
        btnDoneElement.hide();
        btnRetryElement.hide();
        btnDownloadElement.hide();
        croppedElement.hide();
        outputElement.hide().cropper('destroy');
    }


    btnRetryElement.click(() => inputElement.filepond('removeFile'));

    btnDoneElement.click(() => {
        let url
        outputElement.cropper('getCroppedCanvas').toBlob((blob) => {
            outputElement.hide().cropper('destroy');
            url = URL.createObjectURL(blob)
            croppedElement.attr('src', url).show();
            imgLink.attr('href', url);
        })
        btnDoneElement.hide();
        btnDownloadElement.show();
    });
});