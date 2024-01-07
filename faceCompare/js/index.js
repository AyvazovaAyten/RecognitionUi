$(document).ready(function () {

    const dropArea = document.getElementsByClassName('image-drop-area');
    const checkBtn = document.getElementById('checkButton');
    const result = document.querySelector('.result');

    function resetData() {
        $('#resultBox').css('display', 'none');
        $('#error').html("");
        $('#similarity').empty();
        $('#glasses').empty();
        $('#liveness').empty();
        $('#direction').empty();
        $('#eyes').empty();
    }

    function readURL(input) {
        resetData();

        if (input.files && input.files[0]) {

            if (result.classList.contains('show')) {
                result.classList.remove('show');
                result.classList.add('hide');
            }

            let el = input.parentNode;

            let fileInfo = el.querySelector('.fileInfo');

            $(fileInfo).html(input.files[0].name);

            var reader = new FileReader();
            reader.onload = function (e) {
                let preview = el.parentNode.querySelector('.imagePreview');
                let humanIcon = el.parentNode.querySelector('.human-icon');

                $(preview).css('background-image', 'url(' + e.target.result + ')');
                $(preview).hide();
                $(preview).fadeIn(650);

                if (!humanIcon.classList.contains('hide')) {
                    humanIcon.classList.add('hide');
                }
                let filestr = reader.result.split('base64,');
                el.parentNode.querySelector('.hidden').value = filestr[1];

            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    $(".imageUpload").change(function () {
        readURL(this);
    });


    function updateDOM(res) {
        if (res.success) {

            $('#main-result').html('Oxşarlıq nəticəsi : ' + res.similarity.toFixed(2));

            let hasGlasses = res.glasses ? 'Var' : 'Yoxdur';

            $('#similarity').text(res.similarity.toFixed(2));
            $('#glasses').text(hasGlasses);
            $('#liveness').text(res.liveness.toFixed(2));
            $('#direction').text("x: " + res.direction.x.toFixed(2) + "  y: " + res.direction.y.toFixed(2));
            $('#eyes').text(res.eyes);

            $('.result').css('display', 'block');
        } else {
            $('#error').html(res.message);
        }

        $('#resultBox').css('display', 'block');
    }



    checkBtn.addEventListener('click', () => {
        resetData();

        const firstImage = document.getElementById('firstImage');
        const secondImage = document.getElementById('secondImage');

        result.classList.add('show');
        result.classList.remove('hide');

        if (!firstImage.files.length || !secondImage.files.length) {
            resultText.innerText = "Zəhmət olmasa, şəkilləri yükləyin";
            return false;
        }
        $('#loader-overlay').css('display', 'flex');

        let file1 = document.getElementById('file1').value;
        let file2 = document.getElementById('file2').value;

        let formData = new FormData();
        formData.append('source_image', firstImage.files[0]);
        formData.append('target_image', secondImage.files[0]);


        $.ajax({
            url: `http://194.5.237.77:3003/compare`,
            type: "POST",
            crossDomain: true,
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "msgId": "jquery",
                'img1_base64': file1,
                'img2_base64': file2
            }),
            cache: false,
            success: (res) => {
                console.log(res);
                updateDOM(res);
            },
            error: (err) => {
                console.error('AJAX error:', err);
                $('#error').html('An error occurred during the request.');
            },
            complete: () => {
                setTimeout(function () {
                    $('#loader-overlay').css('display', 'none');
                }, 100);
                $('html, body').animate({ scrollTop: $(document).height() }, 'slow');
            }
        });


        // $.ajax({
        //     url: `http://194.5.237.80:8081/verify`,
        //     //url:'https://cors-anywhere.herokuapp.com/http://194.5.237.80:8081/verify',
        //     type: "POST",
        //     dataType: 'json',
        //     contentType: false,
        //     headers: {
        //         'api-key': 'cff43990-8b4b-4b26-bd95-bf0dacc3b1f7'
        //     },
        //     xhrFields: {
        //         withCredentials: true
        //     },
        //     processData: false,
        //     async:false,
        //     data: formData,
        //     cache: false,
        //     success: (res) => {

        //         console.log('success')
        //         console.log(res);

        //         if (res.includes('True')) {
        //             if (resultText.classList.contains('red')) {
        //                 resultText.classList.remove('red');
        //             }
        //             resultText.classList.add('green');
        //             resultText.innerText = "EYNİ ADAMDIR";
        //         } else {
        //             if (resultText.classList.contains('green')) {
        //                 resultText.classList.remove('green');
        //             }
        //             resultText.classList.add('red');
        //             resultText.innerText = "FƏRQLİ ADAMDIR";
        //         }

        //     },
        //     error: (err) => {
        //         console.log(err);
        //         resultText.innerText = "ERROR";
        //         if (resultText.classList.contains('green')) {
        //             resultText.classList.remove('green');
        //         }
        //         resultText.classList.add('red');
        //     }
        // });

        // let iconContainer = document.getElementById('centered');
        // let leftHuman = document.getElementById('leftHuman');
        // let rightHuman = document.getElementById('rightHuman');

        // if (iconContainer.classList.contains('hide')) {
        //     iconContainer.classList.add('show');
        //     iconContainer.classList.remove('hide');
        //     leftHuman.classList.remove('left_collapsed');
        //     rightHuman.classList.remove('right_collapsed');
        //     leftHuman.classList.add('left_appart');
        //     rightHuman.classList.add('right_appart');
        // } else {
        //     iconContainer.classList.remove('show');
        //     iconContainer.classList.add('hide');
        //     leftHuman.classList.add('left_collapsed');
        //     rightHuman.classList.add('right_collapsed');
        //     leftHuman.classList.remove('left_appart');
        //     rightHuman.classList.remove('right_appart');
        // }

    });

});



